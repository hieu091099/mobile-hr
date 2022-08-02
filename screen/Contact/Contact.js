import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Linking,
    ScrollView,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Enticons from "react-native-vector-icons/Entypo";
import Aweicon from "react-native-vector-icons/FontAwesome5";
import { axiosInstanceToken, getToken, stringToHslColor } from "../../config";

export default function Contact() {
    const [dataContact, setDataContact] = useState();
    const [rf, setRf] = useState(true);

    
    useEffect(() => {
        getToken("accessToken").then(async (res) => {
            if (res != "" || res != undefined) {
                let result = await axiosInstanceToken(
                    "GET",
                    `user/getContactInfo/`,
                    res,
                );
                setDataContact(result.data);
            }
        });
    }, [rf]);

    const getFirstChar = (str) => {
        let stringOut = "";
        let strsplit = str.split(" ");
        if (strsplit.length == 1) {
            return strsplit[0].slice(0, 2);
        } else {
            strsplit.map((v) => {
                stringOut += v[0];
            });
        }
        return stringOut.slice(0, 2);
    };
    return (
        <View style={{ flex: 1 }}>
            {dataContact?.length != 0 ? (
                <ScrollView contentContainerStyle={{paddingHorizontal:10,paddingTop:20}} 
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            setRf(!rf);
                        }}
                    />
                }
                >
                    {dataContact?.map((vout, iout) => {
                        return (
                            <View key={iout}>
                                <Text style={styles.td}>{vout.name}</Text>
                                {vout.value?.map((v, i) => {
                                    return (
                                        <View style={styles.CCbox} key={i}>
                                            <View style={{justifyContent:'space-around',width:'100%',flexDirection: "row"}}>
                                            <View
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    backgroundColor: "red",
                                                    marginHorizontal: "3%",
                                                    borderRadius: 100,
                                                    backgroundColor:
                                                        stringToHslColor(
                                                            vout.name,
                                                            60,
                                                            50,
                                                        ),
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        textTransform:
                                                            "uppercase",
                                                    }}>
                                                    {getFirstChar(vout.name)}
                                                </Text>
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
                                                    {v.Remark}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: "600",
                                                        color: "#7C7C7C",
                                                        letterSpacing: 1,
                                                    }}>
                                                    {v.Phone_Number}
                                                </Text>
                                            </View>
                                            </View>
                                            <View style={styles.CCcall}>
                                                <View
                                                    style={[
                                                        styles.iconCall,
                                                        {
                                                            backgroundColor:
                                                                "#2DC15F",
                                                        },
                                                    ]}
                                                    onStartShouldSetResponder={() => {
                                                        Linking.openURL(
                                                            `sms:${v.Phone_Number}`,
                                                        );
                                                    }}>
                                                    <Aweicon
                                                        name="sms"
                                                        size={25}
                                                        color={"white"}
                                                    />
                                                </View>
                                                <View style={styles.iconCall}   onStartShouldSetResponder={() => {
                                                        Linking.openURL(
                                                            `tel:${v.Phone_Number}`,
                                                        );
                                                    }}>
                                                    <Enticons
                                                        name="phone"
                                                        size={25}
                                                        color={"white"}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
            ) : (
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
            )}
        </View>
    );
}

const styles = new StyleSheet.create({
    CCbox: {
        flex:1,
        backgroundColor: "white",
        marginBottom: 10,
        paddingTop:15,
        paddingBottom:15

    },
    CCtt: {
        width: "75%",
        height: "100%",
        backgroundColor: "white",
    },
    CCcall: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop:10,
        overflow:'hidden'
    },
    iconCall: {
        backgroundColor: "#017BFF",
        width: '40%',
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
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
        backgroundColor:'#0D4A85',
        color:'white',
        marginBottom:10
    },
});
