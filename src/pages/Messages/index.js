import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from '../../components'
import { colors, fonts, getData } from '../../utils'
import { DummyDoctor4, DummyDoctor5, DummyDoctor6 } from '../../assets'
import { Firebase } from '../../config'

export default function Messages({ navigation }) {
  const [user, setUser] = useState({})
  const [historyChat, setHistoryChat] = useState([])

  useEffect(() => {
    getDataUserFromLocal()
    const rootDB = Firebase.database().ref()
    const urlHistory = `messages/${user.uid}`
    const messagesDB = rootDB.child(urlHistory)

    messagesDB
      .on("value", async snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val()
          const data = []
          const promises = await Object.keys(oldData).map(async key => {
            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`
            const detailDoctor = await rootDB.child(urlUidDoctor)
              .once("value")

            data.push({
              id: key,
              ...oldData[key],
              detailDoctor: detailDoctor.val()
            })
          })

          await Promise.all(promises)

          setHistoryChat(data)
        }
      })

  }, [user.uid])

  const getDataUserFromLocal = () => {
    getData("user")
      .then(res => {
        setUser(res)
      })
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => (
          <List
            key={chat.id}
            profile={{ uri: chat.detailDoctor.photo }}
            name={chat.detailDoctor.fullName}
            desc={chat.lastChatContent}
            onPress={() => navigation.navigate("Chatting", chat.detailDoctor)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  },
})
