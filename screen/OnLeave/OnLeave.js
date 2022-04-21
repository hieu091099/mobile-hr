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
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
export default function OnLeave() {
    const [activeSections, setActiveSections] = useState([])
    const { listOnLeave } = useSelector((state) => state.UserReducer)
    const [modalVisible, setModalVisible] = useState(false)
    const [focusMonth, setFocusMonth] = useState(0);
    
    const [selectDate, setSelectDate] = useState(
        new Date().getFullYear() + " " + new Date().getMonth(),
    )
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        // 0D4A85
    
    }, [])
   
    const render = (item) =>{

        return <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#0D4A85',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
             <Text style={{fontSize:18,color:'white'}}>{item.item == 0 ? 'Tất cả' : `Tháng ${item.item}`}</Text>  
            </View>
    }
    return (
        <View style={styles.container}>
        {/* <Carousel
    width={130}
    height={50}
    loop={true}
    onSnapToItem={(index)=>{setFocusMonth(index)}}
    style={{
        width: windowWidth,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }}
    data={['0','1','2','3','4', '5','6','7','8', '9','10','11', '12']}
    renderItem={({ item }) => render(item)}
    panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
        /> */}
         <Carousel
                  layout={"default"}
                  data={['0','1','2','3','4', '5','6','7','8', '9','10','11', '12']}
                  sliderWidth={windowWidth}
                  loop={true}
                  itemWidth={120}
                  renderItem={render}
                  onSnapToItem = { index => setFocusMonth(index) } 
           
            />
         <DataTable>
      <DataTable.Header>
        <DataTable.Title  style={{flex:1.5}}>Ngày</DataTable.Title>
        <DataTable.Title  style={{flex:4}}>Loại nghỉ</DataTable.Title>
        <DataTable.Title  style={{flex:2}}>Giờ nghỉ</DataTable.Title>
        <DataTable.Title  style={{flex:3}}>Ghi chú</DataTable.Title>
      </DataTable.Header>
      <ScrollView style={{height:'85%'}}>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>04</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>05</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép năm (P)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30 </DataTable.Cell>
      </DataTable.Row>
      
      <DataTable.Row>
        <DataTable.Cell style={{flex:1.5}}>cuối</DataTable.Cell>
        <DataTable.Cell style={{flex:4}}>Phép việc riêng (RO)</DataTable.Cell>
        <DataTable.Cell style={{flex:2}}>4</DataTable.Cell>
        <DataTable.Cell style={{flex:3}}>Ra 11h30</DataTable.Cell>
      </DataTable.Row>
      </ScrollView>
    </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop:20
    },
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