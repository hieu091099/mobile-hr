import {
    View,
    Text,
    Button,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useFonts } from "expo-font";
import { color } from "react-native-reanimated";
import { multilang } from "../../language/multilang";
import { getNotifications } from "../../redux/actions/NotificationAction";
// import Carousel from "react-native-snap-carousel";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { user, isLoggedIn, lang, isLoadingLogin } = useSelector(
        (state) => state.UserReducer,
    );
    const { height, width } = Dimensions.get("window");
    const [carouselItem, setCarouselItem] = useState([
        {
            title: "Item 1",
            text: "Text 1",
        },
        {
            title: "Item 2",
            text: "Text 2",
        },
        {
            title: "Item 3",
            text: "Text 3",
        },
        {
            title: "Item 4",
            text: "Text 4",
        },
        {
            title: "Item 5",
            text: "Text 5",
        },
    ]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [User, setUser] = useState();
    const navigation = useNavigation();
    let arrName = user?.fullName.split(" ");
    let firstName = `${arrName[arrName.length - 2]} ${
        arrName[arrName.length - 1]
    }`;

    useEffect(() => {
        getToken("user").then((res) => {
            if (res != "" || res != undefined) {
                setUser(JSON.parse(res));
            }
        });
    }, [isLoggedIn]);
    getToken("user").then((res) => {
        if (res != "" || res != undefined) {
            res = JSON.parse(res);
        }
    });
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.menuContainItem}>
                <View style={styles.menuContainItemLeft}>
                    <View style={styles.boxIcon}>
                        <Ionicons
                            name="logo-electron"
                            color="#0D4A85"
                            size={30}
                        />
                    </View>
                    <View>
                        <Text style={styles.contentItem}>Sale</Text>
                        <Text style={styles.titleDetail}>View details</Text>
                    </View>
                </View>
                <View style={{ marginRight: 5 }}>
                    <Ionicons
                        name="ios-chevron-forward"
                        color="#0D4A85"
                        size={30}
                    />
                </View>
            </View>
        );
    };
    return (
        <View style={styles.home}>
            <Animated.View style={[styles.titleHome, { opacity: fadeAnim }]}>
                <View>
                    <Text style={styles.titleName}>
                        {multilang[lang].chao} {firstName},
                    </Text>
                    <Text style={styles.titleBack}>
                        {multilang[lang].chaoMungQuayTroLai}
                    </Text>
                </View>
                <View>{/* <Ionicons name="options" size={26} /> */}</View>
            </Animated.View>
            <View style={styles.mainMenu}>
                <View>
                    <Text style={styles.titleMenu}>
                        {multilang[lang].tieuDe1}
                    </Text>
                </View>
                <View style={styles.menuWrapper}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("Salary")}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Fontisto
                                    name="mastercard"
                                    color="#0D4A85"
                                    size={40}
                                />
                            </View>
                            <Text style={styles.titleItem}>
                                {multilang[lang].luong}
                            </Text>
                            <Text style={styles.titleDetail}>
                                {multilang[lang].chiTiet}{" "}
                                {multilang[lang].luong}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("OnLeave")}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Fontisto
                                    name="holiday-village"
                                    color="#0D4A85"
                                    size={40}
                                />
                            </View>
                            <Text style={styles.titleItem}>
                                {multilang[lang].ngayNghi}
                            </Text>
                            <Text style={styles.titleDetail}>
                                {multilang[lang].chiTiet}{" "}
                                {multilang[lang].chiTietNgayNghi}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("Book")}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Ionicons
                                    name="book-outline"
                                    color="#0D4A85"
                                    size={40}
                                />
                            </View>
                            <Text style={styles.titleItem}>
                                {multilang[lang].soTay}
                            </Text>
                            <Text style={styles.titleDetail}>
                                {multilang[lang].soTay}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("OverTime")}>
                        <View style={styles.menuItemBox}>
                            <View style={styles.menuIcon}>
                                <Ionicons
                                    name="ios-timer"
                                    color="#0D4A85"
                                    size={40}
                                />
                            </View>
                            <Text style={styles.titleItem}>
                                {multilang[lang].tangCa}
                            </Text>
                            <Text style={styles.titleDetail}>
                                {multilang[lang].chiTiet}{" "}
                                {multilang[lang].tangCa}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.menuProg}>
                <View>
                    <Text style={[styles.titleMenu, { marginTop: 10 }]}>
                        {multilang[lang].tieuDe2}
                    </Text>
                </View>
                <View style={styles.menuWrapperProg}>
                    <ScrollView style={{ height: "62%" }}>
                        <Carousel
                            layout={"default"}
                            // ref={(ref) => (this.carousel = ref)}
                            data={carouselItem}
                            sliderWidth={width - 60}
                            itemWidth={width - 60}
                            renderItem={renderItem}
                            onSnapToItem={(index) => setActiveIndex(index)}
                        /> */}
            {/* <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons
                                        name="logo-electron"
                                        color="#0D4A85"
                                        size={30}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.contentItem}>Sale</Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons
                                    name="ios-chevron-forward"
                                    color="#0D4A85"
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons
                                        name="logo-electron"
                                        color="#0D4A85"
                                        size={30}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.contentItem}>Sale</Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons
                                    name="ios-chevron-forward"
                                    color="#0D4A85"
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={styles.menuContainItem}>
                            <View style={styles.menuContainItemLeft}>
                                <View style={styles.boxIcon}>
                                    <Ionicons
                                        name="logo-electron"
                                        color="#0D4A85"
                                        size={30}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.contentItem}>Sale</Text>
                                    <Text style={styles.titleDetail}>
                                        View details
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Ionicons
                                    name="ios-chevron-forward"
                                    color="#0D4A85"
                                    size={30}
                                />
                            </View>
                        </View> */}
            {/* </ScrollView>
                </View>
            </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    home: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    titleHome: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleName: {
        fontSize: 25,
        fontWeight: "600",
        // color: 'black'
        color: "#0D4A85",
    },
    titleBack: {
        fontSize: 13,
        letterSpacing: 1,
        color: "gray",
        fontWeight: "600",
    },
    mainMenu: {
        marginTop: 20,
    },
    titleMenu: {
        fontSize: 20,
        fontWeight: "600",
        color: "#5C5C5C",
    },
    menuWrapper: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    menuItem: {
        flexBasis: "50%",
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
    menuItemBox: {
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ebf7fa",
        borderRadius: 10,
        padding: 10,
    },
    containIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleItem: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "600",
        color: "#0D4A85",
    },
    titleDetail: {
        fontSize: 12,
        fontWeight: "600",
        color: "#69737a",
    },
    menuWrapperProg: {
        paddingHorizontal: 10,
    },
    menuContainItem: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        paddingVertical: 8,
        borderRadius: 20,
        borderColor: "#EEEEEE",
    },
    menuContainItemLeft: {
        flexDirection: "row",
    },
    boxIcon: {
        padding: 8,
        marginRight: 20,
        marginLeft: 15,
        backgroundColor: "#ebf7fa",
        borderRadius: 50,
    },
    contentItem: {
        fontWeight: "600",
        fontSize: 18,
    },
});
