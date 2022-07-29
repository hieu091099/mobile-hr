import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { ListItem } from "react-native-elements";
import Anticons from "react-native-vector-icons/AntDesign";
import { multilang } from "../../language/multilang";
import { useSelector } from "react-redux";

export default function SalaryDetail({ salary }) {
    const { lang } = useSelector((state) => state.UserReducer);

    const [expandedPlus, setExpandedPlus] = useState(true);
    const [expandedMinus, setExpandedMinus] = useState(true);
    const [activeSections, setActiveSections] = useState([]);
    const setSections = (sections) => {
        //setting up a active section state
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };
    const formatNum = (num) => {
        if (typeof num == "number") {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else {
            return num;
        }
    };
    return (
        <ScrollView>
            <Accordion
                activeSections={activeSections}
                sections={[0, 1]}
                touchableComponent={TouchableOpacity}
                expandMultiple={true}
                renderHeader={(section, _, isActive) => {
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
                                    styles.font,
                                    {
                                        color: isActive ? "white" : "#0D4A85",
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        paddingLeft: 20,
                                    },
                                ]}>
                                {section == 0
                                    ? multilang[lang].khoanCong
                                    : multilang[lang].khoanTru}
                            </Text>
                            <Text
                                style={[
                                    styles.font,
                                    {
                                        color: isActive ? "white" : "#0D4A85",
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        paddingRight: 20,
                                    },
                                ]}>
                                <Anticons
                                    name={isActive ? "up" : "down"}
                                    size={20}
                                />
                            </Text>
                            {/* down */}
                        </View>
                    );
                }}
                renderContent={(section, _, isActive) => {
                    if (section == 0) {
                        return (
                            <>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].luongChinh}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Main_Salary)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].phuCapCongViec}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Job_Allowance +
                                                salary?.Responsibility_Allowance +
                                                salary?.Language_Allowance +
                                                salary?.Other_Allowance,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].phuCapDocHai}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        0 VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {
                                                multilang[lang]
                                                    .phuCapVeSinhMoiTruong
                                            }
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Environmental_Sanitation,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].phuCapAnToanVien}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.ATVSV_Allowance)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].pcQip}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.QIP_Allowance)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].pcPccc}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.PCCC_Allowance)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].luongPc}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Salary_And_Allowance,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].luongThang}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Salary_Of_Month)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienLamThem}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Overtime_Pay)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].pcCaDem}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Night_Working_Money)}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienNgungViec}{" "}
                                            (NV1){" "}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.NV1_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienNgungViec}{" "}
                                            (NV2){" "}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.NV2_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienNgungViec}{" "}
                                            (NV3){" "}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.NV3_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienChuyenCan}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Hard_Working)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].phiSinhHoat}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Living_Costs)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienBinhBau}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Rating_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienNghiPhep}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.P_R_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienNghiLe}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Holiday_Money)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].thuongBinhBauNam}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Yearly_Rating)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienSld1}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Serving_Pay_1)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienSld2}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Serving_Pay_2)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienKhac}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Other_Pay +
                                                salary?.Woman_Allowance +
                                                salary?.Allowance_For_Baby +
                                                salary?.Meal_Allowance +
                                                salary?.Good_News_Allowance +
                                                salary?.Manager_Allowance,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {
                                                multilang[lang]
                                                    .tienHoTroPhiSinhHoat
                                            }
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Cost_Of_Living_Support,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tamUng}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Advance_Payment)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienBhxh}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Social_Insurance)}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienBhyt}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Health_Insurance)}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].tienBhtn}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Unemployment_Insurance,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].doanPhi}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(salary?.Union_Pay)} VNĐ
                                    </ListItem.Title>
                                </ListItem>
                                <ListItem bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.font}>
                                            {multilang[lang].thueTncn}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Title style={styles.font}>
                                        {formatNum(
                                            salary?.Person_Income_Tax_Money,
                                        )}{" "}
                                        VNĐ
                                    </ListItem.Title>
                                </ListItem>
                            </>
                        );
                    }
                }}
                duration={400}
                onChange={setSections}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    font: {},
});
