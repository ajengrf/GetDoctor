import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Header, Button, Gap, Link } from '../../components'
import { ILNullPhoto, IconAddPhoto, IconRemovePhoto } from '../../assets'
import { colors, fonts } from '../../utils'
import ImagePicker from 'react-native-image-picker'

export default function UploadPhoto({ navigation }) {
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photo, setPhoto] = useState(ILNullPhoto)

  const getImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      const source = { uri: response.uri }
      setPhoto(source)
      setHasPhoto(true)
      console.log({ response })
    });
  }
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto ?
              <IconRemovePhoto style={styles.addPhoto} />
              :
              <IconAddPhoto style={styles.addPhoto} />
            }
          </TouchableOpacity>
          <Text style={styles.name}>Shayna Melinda</Text>
          <Text style={styles.profession}>Product Designer</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
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
    height: 110,
    borderRadius: 110 / 2
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
