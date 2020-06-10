import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets'

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("GetStarted")
    }, 3000);
  }, [])

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Get Doctor</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    color: "#112340",
    fontFamily: "Nunito-SemiBold",
  }
})