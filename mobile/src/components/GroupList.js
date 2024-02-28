import { StyleSheet, Text, View, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import theme from '../util/theme'

const GroupList = () => {
    const scheme = useColorScheme();
    const color = theme(scheme)

  return (
    <View style = {styles.container}>
      <Text style = {{color: "gray", }}>Your Groups</Text>
    </View>
  )
}

export default GroupList

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})