import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets'
import { colors, fonts } from '../../utils';
import { Firebase } from '../../config'

export default function Splash({ navigation }) {
  useEffect(() => {
    const unsubscribe = Firebase.auth()
      .onAuthStateChanged(user => {
        setTimeout(() => {
          if (user) {
            navigation.replace("MainApp")
          } else {
            navigation.replace("GetStarted")
          }
        }, 3000);
      })

    return () => unsubscribe()
  }, [navigation])

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
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  }
})