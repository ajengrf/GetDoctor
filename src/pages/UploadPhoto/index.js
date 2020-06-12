import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Header, Input, Button, Gap, Link } from '../../components'
import { ILNullPhoto, IconAddPhoto } from '../../assets'
import { colors, fonts } from '../../utils'

export default function UploadPhoto({ navigation }) {
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image source={ILNullPhoto} style={styles.avatar} />
            <IconAddPhoto style={styles.addPhoto} />
          </View>
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button
            onPress={() => navigation.replace("MainApp")}
            title="Upload and Continue"
          />
          <Gap height={30} />
          <Link
            onPress={() => navigation.replace("MainApp")}
            title="Skip for this"
            align="center"
            size={16} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 64
  },
  profile: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: "center",
    justifyContent: "center"

  },
  avatar: {
    width: 110,
    height: 110
  },
  addPhoto: {
    position: "absolute",
    bottom: 8,
    right: 6
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  },
  profession: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 4
  }
})
