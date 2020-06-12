import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, List, Gap } from '../../components'
import { colors, getData } from '../../utils'
import { ILNullPhoto } from '../../assets'
import { Firebase } from '../../config'
import { showMessage } from 'react-native-flash-message'

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    profession: "",
    photo: ILNullPhoto
  })

  useEffect(() => {
    getData("user")
      .then(user => {
        user.photo = { uri: user.photo }
        setProfile(user)
      })

  }, [])

  const signOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate("GetStarted")
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: "default",
          color: colors.white,
          backgroundColor: colors.error
        })
      })
  }

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Updated Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate("UpdateProfile")}
      />
      <List
        name="Language"
        desc="Last Updated Yesterday"
        type="next"
        icon="language" />
      <List
        name="Rate"
        desc="Last Updated Yesterday"
        type="next"
        icon="rate" />
      <List
        name="Sign Out"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  }
})
