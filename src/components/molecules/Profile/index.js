import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { DummyUser, IconRemovePhoto, ILNullPhoto } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function Profile({ name, desc, isRemove, photo, onPress }) {

  return (
    <View style={styles.container}>
      {isRemove ?
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          <IconRemovePhoto style={styles.removePhoto} />
        </TouchableOpacity>
        :
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
        </View>
      }
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{desc}</Text>
        </View>
      )}
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
  removePhoto: {
    position: "absolute",
    right: 8,
    bottom: 8
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: "center",
    textTransform: "capitalize"
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: "center",
    textTransform: "capitalize"

  }
})
