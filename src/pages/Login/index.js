import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { ILLogo } from '../../assets'
import { Input, Link, Button, Gap } from '../../components'
import { colors, fonts, useForm, storeData, showError } from '../../utils'
import { Firebase } from '../../config'
import { useDispatch } from 'react-redux'

export default function Login({ navigation }) {
  const dispatch = useDispatch()

  const [form, setForm] = useForm({
    email: "",
    password: ""
  })

  const loading = (value) => {
    dispatch({
      type: "SET_LOADING",
      value
    })
  }

  const login = () => {
    loading(true)

    Firebase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        loading(false)

        Firebase.database()
          .ref(`users/${res.user.uid}/`)
          .once("value")
          .then(user => {
            if (user.val()) {
              storeData("user", user.val())
              navigation.replace("MainApp")
            }
          })
      })
      .catch(err => {
        loading(false)
        showError(err.message)
      })
  }



  return (
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
