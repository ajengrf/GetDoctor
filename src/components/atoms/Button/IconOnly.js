import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { IconBackDark, IconBackLight } from '../../../assets'

export default function IconOnly({ onPress, icon }) {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBackDark />
    } else if (icon === 'back-light') {
      return <IconBackLight />
    }
    return <IconBackDark />
  }

  return (
    <TouchableOpacity onPress={onPress} >
      <Icon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
