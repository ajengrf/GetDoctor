import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, Profile, Input, Button, Gap } from '../../components'
import { colors, getData, storeData } from '../../utils'
import { Firebase } from '../../config'
import { showMessage } from "react-native-flash-message"
import ImagePicker from 'react-native-image-picker'
import { ILNullPhoto } from '../../assets'

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    profession: "",
    email: "",
  })

  const [password, setPassword] = useState("")
  const [photo, setPhoto] = useState(ILNullPhoto)
  const [photoforDB, setPhotoForDB] = useState("")

  useEffect(() => {
    getData("user")
      .then(user => {
        setPhoto({ uri: user.photo })
        setProfile(user)
      })
  }, [])

  const updateProfileData = () => {
    const data = profile
    if (photoforDB.length > 0) {
      data.photo = photoforDB
    }

    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData("user", data)
        navigation.goBack()
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white
        })
      })
  }

  const updatePassword = () => {
    Firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          user.updatePassword(password)
            .catch(err => {
              console.log(err.message)
              showMessage({
                message: err.message,
                type: "default",
                backgroundColor: colors.error,
                color: colors.white
              })
            })
        }
      })
  }

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: "Password kurang dari 6 karakter",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white
        })
      } else {
        updatePassword()
        updateProfileData()
      }
    } else {
      updateProfileData()
    }
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    })
  }

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { quality: 0.5, maxWidth: 200, maxHeight: 200 },
      (response) => {
        if (response.didCancel || response.error) {
          showMessage({
            message: "tidak ada photo yang dipilih",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white
          })
        } else {
          setPhotoForDB(`data:${response.type};base64, ${response.data}`)

          const source = { uri: response.uri }
          setPhoto(source)
        }
      }
    )
  }

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            onChangeText={value => changeText("fullName", value)}
            value={profile.fullName}
            label="Full Name" />
          <Gap height={24} />
          <Input
            onChangeText={value => changeText("profession", value)}
            value={profile.profession}
            label="Pekerjaan" />
          <Gap height={24} />
          <Input
            value={profile.email}
            label="Email Address"
            disable
          />
          <Gap height={24} />
          <Input
            value={password}
            label="Password"
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  content: {
    padding: 40,
    paddingTop: 0
  }
})
