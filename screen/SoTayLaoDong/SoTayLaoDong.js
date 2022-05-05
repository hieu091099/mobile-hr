import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'

export default function SoTayLaoDong() {
    const [visible, setvisible] = useState(true);
  return (
    <View style={{flex:1,position:'relative'}}>
    <WebView
           onLoadEnd={() => setvisible(false)}
    source={{ uri: 'https://docs.google.com/gview?embedded=true&url=http://b2b.lacty.com.vn/webview/lhg/lhg.pdf' }}
    style={{  width:'100%',height:200}}
  />
 {visible &&  <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'#00000021'}}>
  <ActivityIndicator size="large" color="#0D4A85" />
  </View>}
    </View>
  )
}