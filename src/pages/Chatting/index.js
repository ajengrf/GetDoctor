import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors, getData, showError, getChatTime, setDateChat } from '../../utils'
import { Firebase } from '../../config'

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params
  const [chatContent, setChatContent] = useState("")
  const [user, setUser] = useState({})
  const [chatData, setChatData] = useState([])

  useEffect(() => {
    getDataUserFromLocal()
    getDataChatting()
  }, [dataDoctor.uid, user.uid])

  const getDataUserFromLocal = () => {
    getData("user")
      .then(res => {
        setUser(res)
      })
  }

  const getDataChatting = () => {
    const chatID = `${user.uid}_${dataDoctor.uid}`
    const urlFirebase = `chatting/${chatID}/allChat/`

    Firebase.database()
      .ref(urlFirebase)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val()
          const allDataChat = []

          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key]
            const newDataChat = []

            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat]
              })
            })
            allDataChat.push({
              id: key,
              data: newDataChat
            })
          })
          setChatData(allDataChat)
        }
      })

  }

  const chatSend = () => {
    const today = new Date()

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent
    }
    const chatID = `${user.uid}_${dataDoctor.uid}`
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`
    const urlMessageUser = `messages/${user.uid}/${chatID}`
    const urlMessageDoctor = `messages/${dataDoctor.uid}/${chatID}`
    const dataHistoryChatUser = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.uid,
    }
    const dataHistoryChatDoctor = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    }

    // send chat to firebase
    Firebase.database()
      .ref(urlFirebase)
      .push(data)
      .then(res => {
        setChatContent("")

        // set history for user
        Firebase.database()
          .ref(urlMessageUser)
          .set(dataHistoryChatUser)

        // set history for doctor
        Firebase.database()
          .ref(urlMessageDoctor)
          .set(dataHistoryChatDoctor)
      })
      .catch(err => {
        showError(err.message)
      })

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
          {chatData.map(chat => (
            <View key={chat.id}>
              <Text style={styles.chatDate}>{chat.id}</Text>
              {chat.data.map(item => {
                const isMe = item.data.sendBy === user.uid
                return (
                  <ChatItem
                    key={item.id}
                    isMe={isMe}
                    text={item.data.chatContent}
                    date={item.data.chatTime}
                    photo={isMe ? null : { uri: dataDoctor.photo }}
                  />
                )
              })}
            </View>
          ))}
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
