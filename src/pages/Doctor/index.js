import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { HomeProfile, DoctorCategory, RatedDoctor, NewsItem, Gap } from '../../components'
import { fonts, colors, showError } from '../../utils'
import { DummyDoctor2, DummyDoctor1, DummyDoctor3 } from '../../assets'
import { Firebase } from '../../config'

export default function Doctor({ navigation }) {
  const [news, setNews] = useState([])
  const [categoryDoctor, setCategoryDoctor] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getNews()
    getCategoryDoctor()
    getDoctors()
  }, [])

  const getNews = () => {
    Firebase.database()
      .ref("news/")
      .once("value")
      .then(res => {
        if (res.val()) {
          const data = res.val()
          const filterData = data.filter(el => el !== null)
          setNews(filterData)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const getCategoryDoctor = () => {
    Firebase.database()
      .ref("category_doctor/")
      .once("value")
      .then(res => {
        if (res.val()) {
          const data = res.val()
          const filterData = data.filter(el => el !== null)
          setCategoryDoctor(filterData)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const getDoctors = () => {
    Firebase.database()
      .ref("doctors/")
      .orderByChild("rate")
      .limitToLast(3)
      .once("value")
      .then(res => {
        if (res.val()) {
          const oldData = res.val()
          const data = []
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key]
            })
          })
          setDoctors(data)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

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
                {categoryDoctor.map(item => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate("ChooseDoctor", item)}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor => (
              <RatedDoctor
                key={doctor.id}
                name={doctor.data.fullName}
                desc={doctor.data.profession}
                avatar={{ uri: doctor.data.photo }}
                onPress={() => navigation.navigate("DoctorProfile", doctor.data)} />
            ))}
            <Text style={styles.sectionLabel}>Good News</Text>
            {news.map(item => (
              < NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            ))}
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
