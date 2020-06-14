import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors } from '../../utils'

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params

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
        value={""}
        onChangeText={() => alert("change tesxt")}
        onButtonPress={() => alert("button pressed")}
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
