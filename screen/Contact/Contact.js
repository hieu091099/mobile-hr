import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import Anticons from "react-native-vector-icons/AntDesign";


export default function Contact() {
    const [activeSections, setActiveSections] = useState([]);
    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };
    const renderHeader = (section, _, isActive) => {
        //Accordion Header view
        return (
            <View
                style={{
                    backgroundColor: "red",
                    height: 55,
                    alignItems: "center",
                    backgroundColor: isActive ? "#0D4A85" : "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                <Text
                    style={[
                        {
                            color: isActive ? "white" : "#0D4A85",
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingLeft: 20,
                        },
                    ]}>
                 {section}
                </Text>
                <Text
                    style={[
                        {
                            color: isActive ? "white" : "#0D4A85",
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingRight: 20,
                        },
                    ]}>
                    <Anticons name={isActive ? "up" : "down"} size={20} />
                </Text>
                {/* down */}
            </View>
        );
    };
  return (
    <View style={{flex:1}} >
        {/* <Text style={{textAlign:'center',marginTop:100}}>Tính năng đang hoàn thiện</Text> */}
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
       {/* <Accordion
                            activeSections={activeSections}
                            sections={[1,2,3,4,5,6]}
                            touchableComponent={TouchableOpacity}
                            expandMultiple={false}
                            renderHeader={renderHeader}
                            renderContent={()=>{}}
                            duration={400}
                            onChange={setSections}
                        /> */}
    </View>
  )
}