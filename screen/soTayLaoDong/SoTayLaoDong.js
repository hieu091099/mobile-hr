import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

export default function SoTayLaoDong() {
  return (
    <View>
      <Text >SoTayLaoDong</Text>
      <Text style={styles.fontPlayBold}>SoTayLaoDong</Text>
      <Text style={styles.fontTahoma}>SoTayLaoDong</Text>

    </View>
  )
}
const styles = StyleSheet.create({
    fontPlayBold:{
        // fontFamily:'PlayBold'
    },
    fontTahoma:{
        // fontFamily:'tahoma'
    }
});