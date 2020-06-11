import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DummyHospital1 } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function ListHospitals({ pic, type, name, address }) {
  return (
    <View style={styles.container}>
      <Image source={pic} style={styles.picture} />
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center"
  },
  picture: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 16
  },
  title: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.primary
  },
  address: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6
  }
})
