import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { HomeProfile, DoctorCategory, RatedDoctor, NewsItem, Gap } from '../../components'
import { fonts, colors, getData } from '../../utils'
import { JSONCategoryDoctor, DummyDoctor2, DummyDoctor1, DummyDoctor3 } from '../../assets'

export default function Doctor({ navigation }) {

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate("UserProfile")} />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {JSONCategoryDoctor.data.map(item => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate("ChooseDoctor")}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              name="Alexa Rachel"
              desc="Pediatrician"
              avatar={DummyDoctor1}
              onPress={() => navigation.navigate("DoctorProfile")} />
            <RatedDoctor
              name="Sunny Frank"
              desc="Dentist"
              avatar={DummyDoctor2}
              onPress={() => navigation.navigate("DoctorProfile")} />
            <RatedDoctor
              name="Poe Minn"
              desc="Podiatrist"
              avatar={DummyDoctor3}
              onPress={() => navigation.navigate("DoctorProfile")} />
            <Text style={styles.sectionLabel}>Good News</Text>
            <NewsItem />
            <NewsItem />
            <NewsItem />
            <Gap height={30} />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209
  },
  category: {
    flexDirection: "row"
  },
  wrapperScroll: {
    marginHorizontal: -16
  },
  wrapperSection: {
    paddingHorizontal: 16
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16
  }
})
