import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { ILLogo } from '../../assets'
import { Input, Link, Button, Gap, Loading } from '../../components'
import { colors, fonts, useForm, storeData } from '../../utils'
import { Firebase } from '../../config'
import { showMessage } from "react-native-flash-message"

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useForm({
    email: "",
    password: ""
  })

  const login = () => {
    console.log({ form })
    setLoading(true)
    Firebase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        setLoading(false)
        console.log({ res })

        Firebase.database()
          .ref(`users/${res.user.uid}/`)
          .once("value")
          .then(user => {
            console.log({ user: user.val() })
            if(user.val()) {
              storeData("user", user.val())
              navigation.replace("MainApp")
            }
          })
      })
      .catch(err => {
        setLoading(false)
        console.log({ err })
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white
        })
      })
  }

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            onPress={() => navigation.navigate("Register")}
            title="Create New Account"
            size={16}
            align="center" />
        </ScrollView>
      </View>
      {
        loading &&
        <Loading />
      }
    </>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153
  }
})
