import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, Input, Button, Gap } from '../../components'
import { colors } from '../../utils'

export default function Register({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Register" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={40} />
        <Button title="Continue" onPress={() => navigation.navigate("UploadPhoto")} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    padding: 40,
    paddingTop: 0
  }
})
