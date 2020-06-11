import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Profile, ProfileItem, Button, Gap } from '../../components'
import { colors } from '../../utils'

const DoctorProfile = () => {
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" />
      <Profile name="Nairobi Putri Hayza" desc="Dokter Anak" />
      <Gap height={10} />
      <ProfileItem
        label="Alumnus"
        value="Universitas Indonesia, 2020" />
      <ProfileItem
        label="Tempat Praktik"
        value="Rumah Sakit Umum, Bandung" />
      <ProfileItem
        label="No. STR"
        value="0000122131247899" />
      <View style={styles.action}>
        <Button title="Start Consultation" />
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