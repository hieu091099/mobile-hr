import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { ListItem } from "react-native-elements";

export default function SalaryDetail({ salary }) {
  const [expandedPlus, setExpandedPlus] = useState(true);
  const [expandedMinus, setExpandedMinus] = useState(true);
  const formatNum = (num) => {
    if (typeof num == "number") {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    } else {
      return num;
    }
  };
  return (
    <View>
      <ListItem.Accordion
        style={{ backgroundColor: "blue", color: "bue" }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title
                style={[styles.font, { color: "#0D4A85", fontWeight: "bold" }]}
              >
                KHOẢN CỘNG
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedPlus}
        onPress={() => {
          setExpandedPlus(!expandedPlus);
        }}
      >
        <ScrollView style={{ height: "50%" }}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Lương chính </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Main_Salary)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>PC công việc </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(
                salary?.Responsibility_Allowance +
                  salary?.Language_Allowance +
                  salary?.Other_Allowance
              )}{" "}
              VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>PC độc hại </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>PC VSMT </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                PC An toàn viên{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>PC PCCC </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Lương + PC </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Salary_And_Allowance)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Lương tháng </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Salary_Of_Month)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền làm thêm{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Overtime_Pay)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>PC ca đêm </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Night_Working_Money)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền ngừng việc(NV1){" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền ngừng việc(NV2){" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền ngừng việc(NV3){" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>VNĐ</ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền chuyên cần{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Hard_Working)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Phí sinh hoạt{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Living_Costs)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền bình bầu{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Rating_Money)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền nghỉ phép{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.P_R_Money)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền nghỉ lễ </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Holiday_Money)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Thưởng bình bầu năm{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Yearly_Rating)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền SLĐ1 </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Serving_Pay_1)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền SLĐ2 </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Serving_Pay_2)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền khác </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Other_Pay)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>
                Tiền hổ trợ phí SH{" "}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Cost_Of_Living_Support)} VNĐ
            </ListItem.Title>
          </ListItem>
        </ScrollView>
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            {/* <Icon name="place" size={30} /> */}
            <ListItem.Content>
              <ListItem.Title
                style={[styles.font, { color: "#0D4A85", fontWeight: "bold" }]}
              >
                KHOẢN TRỪ
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedMinus}
        onPress={() => {
          setExpandedMinus(!expandedMinus);
        }}
      >
        <ScrollView>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tạm ứng </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Advance_Payment)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền BHXH </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Social_Insurance)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền BHYT </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Health_Insurance)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Tiền BHTN </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Unemployment_Insurance)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Đoàn phí </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Union_Pay)} VNĐ
            </ListItem.Title>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.font}>Thuế TNCN </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title style={styles.font}>
              {formatNum(salary?.Person_Income_Tax_Money)} VNĐ
            </ListItem.Title>
          </ListItem>
        </ScrollView>
      </ListItem.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "Monda",
  },
});
