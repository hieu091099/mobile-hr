import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { ListItem } from "react-native-elements"
import Accordion from "react-native-collapsible/Accordion"
import Anticons from "react-native-vector-icons/AntDesign"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { getToken } from "../../config"
import { getOnLeave } from "../../redux/actions/UserAction"
import moment from 'moment';
import DatePicker from "react-native-modern-datepicker"
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
export default function OnLeave() {
    const [activeSections, setActiveSections] = useState([])
    const { listOnLeave } = useSelector((state) => state.UserReducer)
    const [modalVisible, setModalVisible] = useState(false)
    const [focusMonth, setFocusMonth] = useState(0);
    
    const [selectDate, setSelectDate] = useState(
        new Date().getFullYear() + " " + new Date().getMonth(),
    )
    const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
    const dispatch = useDispatch()
    
    // console.log(listOnLeave);
    useEffect(() => {
        // getToken("user").then((res) => {
        //     if (res != "" || res != undefined) {
        //         res = JSON.parse(res);
        //         let personId = res.userId
        //         getToken("accessToken").then((res) => {
        //           console.log(res);
        //             dispatch(getOnLeave(res, personId));
        //         })
        //     }
        // })
    }, [])
    // console.log(listOnLeave);
    // const setSections = (sections) => {
    //     //setting up a active section state
    //     setActiveSections(sections.includes(undefined) ? [] : sections)
    // }
    // const renderHeader = (section, _, isActive) => {
    //     //Accordion Header view
    //     return (
    //         <View
    //             style={{
    //                 backgroundColor: "red",
    //                 height: 55,
    //                 alignItems: "center",
    //                 backgroundColor: isActive ? "#0D4A85" : "white",
    //                 flexDirection: "row",
    //                 justifyContent: "space-between",
    //             }}>
    //             <Text
    //                 style={[
    //                     styles.font,
    //                     {
    //                         color: isActive ? "white" : "#0D4A85",
    //                         fontWeight: "bold",
    //                         fontSize: 18,
    //                         paddingLeft: 20,
    //                     },
    //                 ]}>
    //                 {moment(section?.Vacation_From_Date_C).format("DD/MM/YYYY")} -  {section?.Vacation_ID}
    //             </Text>
    //             <Text
    //                 style={[
    //                     styles.font,
    //                     {
    //                         color: isActive ? "white" : "#0D4A85",
    //                         fontWeight: "bold",
    //                         fontSize: 18,
    //                         paddingRight: 20,
    //                     },
    //                 ]}>
    //                 <Anticons name={isActive ? "up" : "down"} size={20} />
    //             </Text>
    //             {/* down */}
    //         </View>
    //     )
    // }

    // const renderContent = (section, _, isActive) => {
    //     //Accordion Content view
    //     return (
    //         <>
    //             <ListItem bottomDivider>
    //                 <ListItem.Content>
    //                     <ListItem.Title style={styles.font}>
    //                         Thời gian nghỉ{" "}
    //                     </ListItem.Title>
    //                 </ListItem.Content>
    //                 <ListItem.Title style={styles.font}>
    //                     {section?.Vacation_Hour == 0 ?section?.Vacation_Day+ ' ngày':Math.round(section?.Vacation_Hour) + ' tiếng'} 
    //                 </ListItem.Title>
    //             </ListItem>
    //             <ListItem bottomDivider>
    //                 <ListItem.Content>
    //                     <ListItem.Title style={styles.font}>
    //                         Ghi chú{" "}
    //                     </ListItem.Title>
    //                 </ListItem.Content>
    //                 <ListItem.Title style={styles.font}>
    //                     {section?.Vacation_Detail_Note}
    //                 </ListItem.Title>
    //             </ListItem>
    //         </>
    //     )
    // }
    const render = (item) =>{
        console.log(focusMonth);
        return <>{(focusMonth+1) == item ? <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'red',heigh:'100%',width: '100%',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
             <Text style={{fontSize:18,color:'#0D4A85'}}>Tháng {item}</Text>  
            </View>: <View style={{alignItems:'center',justifyContent:'center',heigh:'100%',width: '100%',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
             <Text style={{fontSize:18,color:'#0D4A85'}}>Tháng {item}</Text>  
            </View>}</>
    }
    return (
        <>
        <Carousel
    width={130}
    height={70}
    loop={false}
    onSnapToItem={(index)=>{setFocusMonth(index)}}
    style={{
        width: windowWidth,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }}
    data={['1','2','3','4', '5','6','7','8', '9','10','11', '12']}
    renderItem={({ item }) => render(item)}
    panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
        />
        </>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: "Monda",
    },
    titleSalaryDetail: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: "900",
        fontSize: 20,
        letterSpacing: 0.5,
    },
})
// {listOnLeave?.map((value, index, array) => {
//   setMuti('drop'+index,false);
//   return <ListItem.Accordion key={index}
//   style={{ backgroundColor: "blue", color: "bue" }}
//   content={
//       <ListItem.Content>
//         <ListItem.Title
//           style={[styles.font, { color: "#0D4A85", fontWeight: "bold" }]}
//         >
//           {value}
//         </ListItem.Title>

//       </ListItem.Content>
//   }
//   isExpanded={mutiDrop['drop'+index]}
//   onPress={() => {
//     // setMutiDrop(!mutiDrop['drop'+index]);
//     console.log(mutiDrop['drop'+index] == true);
//     setMuti('drop'+index,!mutiDrop['drop'+index]);
//     // setReload(true);
//   }}
// >
// <ListItem bottomDivider>
//       <ListItem.Content>
//         <ListItem.Title style={styles.font}>Loại nghỉ </ListItem.Title>
//       </ListItem.Content>
//       <ListItem.Title style={styles.font}>
//     Phép năm
//       </ListItem.Title>
//     </ListItem>
//     <ListItem bottomDivider>
//       <ListItem.Content>
//         <ListItem.Title style={styles.font}>Thời gian nghỉ </ListItem.Title>
//       </ListItem.Content>
//       <ListItem.Title style={styles.font}>
//         1 ngày
//       </ListItem.Title>
//     </ListItem>

// </ListItem.Accordion>
// })}
// --------------------------------
{/* <View>
            <Text style={styles.titleSalaryDetail}>Ngày Phép Năm <TouchableOpacity onPress={()=>{setModalVisible(false)}}><Text>2022</Text></TouchableOpacity></Text>
            <ScrollView style={{ height: "92%" }}>
                <Accordion
                    activeSections={activeSections}
                    sections={listOnLeave}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={true}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                />
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.")
                    setModalVisible(!modalVisible)
                }}>
                <Pressable
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: "#00000078",
                    }}
                    onPress={() => {
                        setModalVisible(false)
                    }}>
                    <DatePicker
                        options={{
                            selectedTextColor: "white",
                            mainColor: "#0D4A85",
                        }}
                        selected={selectDate}
                        mode="monthYear"
                        onMonthYearChange={(selectedDate) => {
                            setSelectDate(selectedDate)
                            setModalVisible(false)
                        }}
                        current={selectDate}
                        style={{ borderRadius: 10 }}
                    />
                </Pressable>
            </Modal>
        </View> */}