import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ILHospitalBG } from '../../assets'
import { fonts, colors } from '../../utils'
import { ListHospitals } from '../../components'

export default function Hospitals() {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background} >
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospitals />
        <ListHospitals />
        <ListHospitals />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  background: {
    height: 240,
    paddingTop: 30
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white
  },
  desc: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14
  },
})
