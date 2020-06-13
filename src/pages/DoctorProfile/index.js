import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, ProfileItem, Button, Gap } from '../../components'
import { colors } from '../../utils'

const DoctorProfile = ({ navigation, route }) => {
  const dataDoctor = route.params

  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={dataDoctor.fullName}
        desc={dataDoctor.profession}
        photo={{ uri: dataDoctor.photo }}
      />
      <Gap height={10} />
      <ProfileItem
        label="Alumnus"
        value={dataDoctor.university}
      />
      <ProfileItem
        label="Tempat Praktik"
        value={dataDoctor.hospital_address}
      />
      <ProfileItem
        label="No. STR"
        value={dataDoctor.str_number}
      />
      <View style={styles.action}>
        <Button title="Start Consultation" onPress={() => navigation.navigate("Chatting")} />
      </View>
    </View>
  )
}

export default DoctorProfile

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23
  }
})
