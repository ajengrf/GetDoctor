import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap, Loading } from '../../components'
import { colors, useForm, storeData, getData } from '../../utils'
import { Firebase } from '../../config'
import { showMessage, hideMessage } from "react-native-flash-message";

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
    // const userData = {
    //   fullName: form.fullName,
    //   profession: form.profession,
    //   email: form.email
    // }
    // navigation.navigate("UploadPhoto", userData)

    setLoading(true)
    Firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        setLoading(false)
        setForm("reset")

        const userData = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid
        }

        Firebase
          .database()
          .ref("users/" + success.user.uid + "/")
          .set(userData)

        storeData("user", userData)
        navigation.navigate("UploadPhoto", userData)

        console.log({ success })
        console.log({ data: success.user })
      })
      .catch((error) => {
        setLoading(false)
        // Handle Errors here.
        const errorMessage = error.message;
        // ...
        showMessage({
          message: errorMessage,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white
        })
      });

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
