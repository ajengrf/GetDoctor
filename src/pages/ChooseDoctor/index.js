import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, List } from '../../components'
import { DummyDoctor1 } from '../../assets'
import { colors } from '../../utils'

const ChooseDoctor = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Wanita"
        type="next"
        onPress={() => navigation.navigate("Chatting")}
      />
    </View>
  )
}

export default ChooseDoctor

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  }
})
