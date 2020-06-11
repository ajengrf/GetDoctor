import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors } from '../../utils'

const Chatting = () => {
  return (
    <View style={styles.page}>
      <Header title="Nairobi Putri Hayza" type="dark-profile" />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 21 Maret 2020</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>
      <InputChat />
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
