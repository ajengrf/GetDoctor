import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ILHospitalBG, DummyHospital1, DummyHospital2, DummyHospital3 } from '../../assets'
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
        <ListHospitals
          type="Rumah Sakit"
          name="Citra Bunga Merdeka"
          address="Jl. Surya Sejahtera 20"
          pic={DummyHospital1} />
        <ListHospitals
          type="Rumah Sakit Anak"
          name="Happy Family Kids"
          address="Jl. Surya Sejahtera 20"
          pic={DummyHospital2} />
        <ListHospitals
          type="Rumah Sakit Jiwa"
          name="Tingkatan Paling Atas"
          address="Jl. Surya Sejahtera 20"
          pic={DummyHospital3} />
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
