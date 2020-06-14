import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors, getData, showError } from '../../utils'
import { Firebase } from '../../config'

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params
  const [chatContent, setChatContent] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    getData("user")
      .then(res => {
        setUser(res)
      })
  }, [])

  const chatSend = () => {
    const today = new Date()
    const hour = today.getHours()
    const minutes = today.getMinutes()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: `${hour}:${minutes} ${hour > 12 ? "PM" : "AM"}`,
      chatContent: chatContent
    }

    Firebase.database()
      .ref(`chatting/${user.uid}_${dataDoctor.uid}/allChat/${year}-${month}-${date}`)
      .push(data)
      .then(res => {
        console.log({res})
      })
      .catch(err => {
        showError(err.message)
      })

    setChatContent("")
  }


  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.fullName}
        desc={dataDoctor.profession}
        photo={{ uri: dataDoctor.photo }}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Senin, 21 Maret 2020</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
          <ChatItem isMe />
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  )
}

export default Chatting

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,

  },
  content: {
    flex: 1
  },
  chatDate: {
    textAlign: "center",
    fontSize: 11,
    fontFamily: fonts.primary[400],
    marginVertical: 20,
    color: colors.text.secondary
  }
})
