import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, List, Gap } from '../../components'
import { colors } from '../../utils'

const UserProfile = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header title="Profile" />
      <Gap height={10} />
      <Profile name="Shayna Melinda" desc="Product Designer" />
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
        name="Help"
        desc="Last Updated Yesterday"
        type="next"
        icon="help" />
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
