import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";

export default function Notify() {
    return (
        <View style={{ flex: 1 }}>
            {/* <ScrollView contentContainerStyle={{alignItems:'center',paddingBottom:100}}>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022</Text>

                  </View>
                  <View style={[styles.readed,{backgroundColor:'#0D4A85'}]}></View>

                </View>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022</Text>

                  </View>
                  <View style={styles.readed}></View>

                </View>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung tập trung tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022 trung năm 2022 trung năm 2022 trung năm 2022 trung năm 2022</Text>

                  </View>
                  <View style={[styles.readed,{backgroundColor:'#0D4A85'}]}></View>
                </View>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022</Text>

                  </View>
                  <View style={[styles.readed,{backgroundColor:'#0D4A85'}]}></View>

                </View>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022</Text>

                  </View>
                  <View style={styles.readed}></View>

                </View>
                <View style={styles.boxNoti}>
                  <View style={styles.boxText}>
                    <Text style={styles.boxTextTD}>Thông báo lịch nghỉ phép tập trung</Text>
                    <Text style={styles.boxTextND}>Công ty thông báo về việc nghỉ phép tập trung năm 2022</Text>

                  </View>
                  <View style={styles.readed}></View>

                </View>
            </ScrollView> */}
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Image
                    style={{ width: "50%", height: "50%", marginTop: 50 }}
                    source={require("../../assets/images/notification.png")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxNoti: {
        // backgroundColor: "blue",
        width: "95%",
        // height: 100,
        marginVertical: 8,
        borderRadius:10,
        flexDirection:'row',
        overflow: 'hidden',
    },
    boxText:{
      width:'97%',
      backgroundColor:'white',
      height:'100%',
      padding:10
    },
    readed:{
      width:'3%',
      height:'100%',
      backgroundColor:'#C2C2C2'
    },
    boxTextTD:{
      fontSize:18,
      fontWeight:'700'
    },boxTextND:{
      fontSize:15,
      marginTop:5,
      fontStyle:"italic",
      color:'#65656B'
    }
});
