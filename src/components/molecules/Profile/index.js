import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DummyUser } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.borderProfile}>
        <Image source={DummyUser} style={styles.avatar} />
      </View>
      <Text style={styles.name}>Profile</Text>
      <Text style={styles.profession}>Product Designer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.border
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2
  }
})
