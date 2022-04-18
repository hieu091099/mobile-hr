import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from 'react-native-elements';

export default function OnLeave() {
    const [expandedPlus, setExpandedPlus] = useState(true);
    const [expandedMinus, setExpandedMinus] = useState(true);
  return (
    <View>

            <Text style={styles.titleSalaryDetail}>
                        Ngày Phép tháng 04
                    </Text>
      <ListItem.Accordion
        style={{ backgroundColor: "blue", color: "bue" }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title
                style={[styles.font, { color: "#0D4A85", fontWeight: "bold" }]}
              >
                01/04/2022
              </ListItem.Title>
              
            </ListItem.Content>
          </>
        }
        isExpanded={expandedPlus}
        onPress={() => {
          setExpandedPlus(!expandedPlus);
        }}
      >
      <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Loại nghỉ </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
          Phép năm
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Thời gian nghỉ </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              1 ngày
            </ListItem.Title>
          </ListItem>


      </ListItem.Accordion>
      <ListItem.Accordion
        style={{ backgroundColor: "blue", color: "bue" }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title
                style={[styles.font, { color: "#0D4A85", fontWeight: "bold" }]}
              >
                01/04/2022
              </ListItem.Title>
              
            </ListItem.Content>
          </>
        }
        isExpanded={expandedPlus}
        onPress={() => {
          setExpandedPlus(!expandedPlus);
        }}
      >
      <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Loại nghỉ </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
          Ro (việc riêng)
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Thời gian nghỉ </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              4 tiếng
            </ListItem.Title>
          </ListItem>


      </ListItem.Accordion>
    </View>
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
        letterSpacing: 0.5
    },
  });