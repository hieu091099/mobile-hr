import { View, Text, StyleSheet,ScrollView, Linking,TouchableOpacity } from 'react-native'
import React from 'react'
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export default function Setting() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

  return (
    <View style={{backgroundColor:'#F4F4F4',flex:1}}>
        <ScrollView style={styles.chuaBox}>
        <View style={styles.boxus}><Text></Text></View>
        <View style={styles.boxMenu}>
            <View style={styles.menuItem} onStartShouldSetResponder={()=>{Linking.openURL(`tel:123456`)}}>
                <Text style={styles.textMenu}>ĐƯỜNG DÂY NÓNG : <Text style={{color:"#0D4A85"}}>099999999</Text> </Text>
                <Text><AntIcon color={"black"} name="right" size={15}/></Text>
            </View>
            <View style={styles.menuItem} onStartShouldSetResponder={()=>{Linking.openURL(`mailto:trungnamdev@gmail.com`)}}>
                <Text style={styles.textMenu}>Email : <Text style={{color:"#0D4A85"}}>lacty.company.com.vn</Text> </Text>
                <Text><AntIcon color={"black"} name="right" size={15}/></Text>
            </View>
            <View style={styles.menuItem} onStartShouldSetResponder={()=>{navigation.navigate('ChangeLanguage')}}>
                <Text style={styles.textMenu}>Thay đổi ngôn ngữ </Text>
                <Text><AntIcon color={"black"} name="right" size={15}/></Text>
            </View>
            <View style={[styles.menuItem,{borderBottomWidth:0}]} onStartShouldSetResponder={()=>{navigation.navigate('ChangePassword')}}>
                <Text style={styles.textMenu}>Đổi mật khẩu </Text>
                <Text><AntIcon color={"black"} name="right" size={15}/></Text>
            </View>
        </View>
        <TouchableOpacity style={styles.btndx} onPress={()=>{
            dispatch({
                type: "LOGOUT",
            });
        }}><Text style={styles.textbtndx}>Đăng xuất</Text></TouchableOpacity>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    boxus:{
        backgroundColor:"white",
        width:'100%',
        height:100,
        marginTop:5,
        marginBottom:10
    },
    chuaBox:{
        flex:1
    },
    boxMenu:{
        width:'100%',
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingTop:10

    },
    menuItem:{
        width:'100%',
        height:50,
        marginBottom:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:"#EBEBEB",
    },
    textMenu:{
        fontWeight:'700'
    },btndx:{
        backgroundColor:'white',
        marginTop:10,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },textbtndx:{
        color:'#0D4A85',
        fontWeight:'700',
        fontSize:15

    }
});