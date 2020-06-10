import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconBackDark } from '../../../assets'
import { Gap } from '../../atoms'
import { colors } from '../../../utils'

export default function Header({ header }) {
  return (
    <View style={styles.container}>
      <IconBackDark />
      <Text style={styles.text}>{header}</Text>
      <Gap width={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    alignItems: "center"
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: "Nunito-SemiBold"
  }
})
