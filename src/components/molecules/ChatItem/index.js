import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IsMe from './IsMe'
import Other from './Other'

export default function ChatItem({ isMe, text, date, photo }) {

  if (isMe) {
    return <IsMe text={text} date={date} />
  }
  return (
    <Other text={text} date={date} photo={photo} />
  )
}

const styles = StyleSheet.create({})
