import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Linking,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import Anticons from "react-native-vector-icons/AntDesign";
import Enticons from "react-native-vector-icons/Entypo";
import Aweicon from "react-native-vector-icons/FontAwesome5";
import { stringToHslColor } from "../../config";

export default function Contact() {
    const getFirstChar=(str)=>{
        let stringOut = "";
      let  strsplit =str.split(" ");
        if(strsplit.length == 1){
            return strsplit[0].slice(0, 2);
        }else{
            strsplit.map(v=>{
                stringOut+=v[0];
            });
        }
       return stringOut.slice(0, 2);
    }
    return (
        <View style={{ flex: 1 }}>
            
            {/* <ScrollView>
 {["Bảo hiểm",'Phòng SEA','IT'].map((vout,iout)=>{
              return <View  key={iout}><Text style={styles.td}>{vout}</Text>
                {[1,2,3].map((v,i)=>{
                    return <View style={styles.CCbox} key={i}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "red",
                            marginHorizontal: "3%",
                            borderRadius: 100,
                            backgroundColor: stringToHslColor(
                                vout,
                                50,
                                50,
                            ),
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'white',textTransform: 'uppercase'}}>{getFirstChar(vout)}</Text>
                    </View>
                    <View style={styles.CCtt}>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                marginBottom: 5,
                                color: "black",
                                // color:stringToHslColor(section,50, 50)
                            }}>
                            A Nghĩa
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "600",
                                color: "#7C7C7C",
                                letterSpacing: 1,
                            }}>
                            0326520536
                        </Text>
                    </View>
                    <View style={styles.CCcall}>
                        <View
                            style={[
                                styles.iconCall,
                                { backgroundColor: "#2DC15F" },
                            ]}>
                            <Aweicon
                                name="sms"
                                size={25}
                                color={"white"}
                                onPress={() => {
                                    Linking.openURL(`sms:123456`);
                                }}
                            />
                        </View>
                        <View style={styles.iconCall}>
                            <Enticons
                                name="phone"
                                size={25}
                                color={"white"}
                                onPress={() => {
                                    Linking.openURL(`tel:123456`);
                                }}
                            />
                        </View>
                    </View>
                </View>
                })}
                </View>
            })}

                
               
            </ScrollView> */}
        </View>
    );
}

const styles = new StyleSheet.create({
    CCbox: {
        height: 70,
        backgroundColor: "white",
        marginBottom: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    CCtt: {
        width: "45%",
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
    },
    CCcall: {
        width: "30%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    iconCall: {
        backgroundColor: "#017BFF",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    boxText: {
        width: "100%",
        height: "50%",
        padding: 10,
    },
    td: {
        fontSize: 17,
        fontWeight: "bold",
        padding: 10,
    },
});