import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap, Loading } from '../../components'
import { colors, useForm } from '../../utils'
import { Firebase } from '../../config'

export default function Register({ navigation }) {
  const [form, setForm] = useForm({
    fullName: "",
    profession: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const onContinue = () => {
    console.log(form)
    setLoading(true)
    Firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        setLoading(false)
        setForm("reset")
        console.log({ success })
        console.log({ data: success.user })
      })
      .catch((error) => {
        setLoading(false)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log({ errorCode, errorMessage })
      });
    // navigation.navigate("UploadPhoto")
  }

  return (
    <>
      <View style={styles.page}>
        <Header title="Register" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              onChangeText={(value) => setForm("fullName", value)}
              value={form.fullName}
              label="Full Name" />
            <Gap height={24} />
            <Input
              onChangeText={(value) => setForm("profession", value)}
              value={form.profession}
              label="Pekerjaan" />
            <Gap height={24} />
            <Input
              onChangeText={(value) => setForm("email", value)}
              value={form.email}
              label="Email" />
            <Gap height={24} />
            <Input
              onChangeText={(value) => setForm("password", value)}
              value={form.password}
              secureTextEntry
              label="Password" />
            <Gap height={40} />
            <Button
              title="Continue"
              onPress={onContinue}
            />
          </ScrollView>
        </View>
      </View>
      {loading &&
        <Loading />
      }
    </>
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
