import { useCallback, useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    SectionList,
    ScrollView,
    Pressable,
    FlatList,
    Dimensions
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRestaurantMenu } from "../endpoints/order/orderEndpoints";
import { useDispatch, useSelector } from 'react-redux';
import { OrderActions } from "../actions";
import OrderBottomSheet from "../components/order/OrderBottomSheet";

function OrderScreen(props) {
    const {
        setBottomNavLabel,
    } = props;

    const [sections, setSections] = useState([]);
    const [sectionLength, setSectionLength] = useState(0);
    const sectionListRef = useRef(null);
    const [menu, setMenu] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.orderState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState({});

    useEffect(() => {
        setBottomNavLabel("Order");
    }, []);

    useEffect(() => {
        console.log(orderState);
    }, [orderState]);

    useEffect(() => {
        console.log(route);

        dispatch(OrderActions.setBarcodeParams({
            restaurantId: route.params.rID,
            tableId: route.params.tableId
        }));

        setBottomNavLabel("Order");
        getRestaurantMenu(route.params.rID)
            .then((res) => {
                let tempData = [];
                let charCount = 0;
                let tempSections = [];

                res.data.map((item, index) => {
                    if (!tempData.find((sItem) => { return sItem.title === item.category })) {
                        charCount += item.category.length;
                        tempSections.push(item.category);
                        tempData.push({
                            title: item.category,
                            data: []
                        });

                    }
                });

                setSections(tempSections);
                setSectionLength(charCount * 15 / res.data.length);

                res.data.map((item, index) => {
                    tempData.map((sItem) => {
                        if (sItem.title === item.category) {
                            sItem.data.push({
                                ID: item.ID,
                                ingredients: item.ingredients,
                                picture: item.picture,
                                price: item.price,
                                name: item.name,
                                restaurantId: item.restaurantId,
                                category: item.category
                            });
                        }
                    });
                });
                setMenu(tempData);
            })
            .catch((err) => {
                console.log(err);
                setMenu([]);
            })
    }, [route]);



    const SectionItem = ({ value }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    sectionListRef.current.scrollToLocation({
                        itemIndex: 0,
                        sectionIndex: value.index,
                        animated: true
                    });
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 18,
                        margin: 10,
                        backgroundColor: "#FD2400",
                        minWidth: 30,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        lineHeight: 40,
                        textAlign: "center"
                    }}>{value.item}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const MenuItem = ({ value, index }) => {
        return (
            <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "#cfcfcf" : "#fff",
                },
                styles.container,
            ]}
                disabled={(orderState.tableId === undefined || orderState.tableId === "") ? true : false}
                onPress={() => {
                    setIsBottomSheetOpen(true);
                    setSelectedMenuItem(value);
                }}
            >
                <View>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }}
                        resizeMode="contain"
                        style={styles.posterStyle}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <View style={styles.nameAndPrice}>
                        <Text ellipsizeMode={"tail"} numberOfLines={3} style={styles.titleText}>{value.name}</Text>
                        <Text style={styles.priceText}>{value.price} TL</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.tagsText}>{value.ingredients}DHSAKJDHAS ASJDHASDH ASJHDASJKDH DASHDJKLA</Text>
                    </View>
                </View>

            </Pressable>
        );
    }


    return (
        (menu.length) > 0 ?
            <View
                style={{ display: "flex", flexGrow: 1, paddingBottom: 100 }}
            >
                <View>
                    <View style={{ flexGrow: 1, backgroundColor: "white" }}>
                        <FlatList
                            initialNumToRender={60}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={sections}
                            //initialScrollIndex={4}
                            getItemLayout={(data, index) => {
                                return (
                                    { length: sectionLength, offset: sectionLength * index, index }
                                );
                            }}
                            renderItem={(item) => {
                                return <SectionItem value={item} />
                            }}
                        />
                    </View>
                    <SectionList
                        ref={sectionListRef}
                        sections={menu}
                        renderItem={({ item, index }) => <MenuItem value={item} index={index} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={{
                                fontSize: 32,
                                backgroundColor: "#fff",
                                marginTop: 20,
                                paddingLeft: 18,
                                paddingTop: 18,
                                paddingBottom: 1
                            }}>{title}</Text>
                        )}
                        ItemSeparatorComponent={() => (<View
                            style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8' }}
                        />)}
                    />
                </View>
                <OrderBottomSheet
                    isBottomSheetOpen={isBottomSheetOpen}
                    setIsBottomSheetOpen={setIsBottomSheetOpen}
                    selectedMenuItem={selectedMenuItem}
                />
            </View>
            :
            null
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        //backgroundColor: 'yellow',
    },
    posterStyle: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
        //backgroundColor: "blue",
        paddingVertical: 10
    },
    titleText: {
        //backgroundColor: "red",
        fontSize: 18,
        fontWeight: "bold",
        color: '#0E122B',
        marginBottom: 5,
        maxWidth: 210
    },
    tagsText: {
        fontSize: 12,
        color: '#C2C2CB',
        marginBottom: 7,
    },

    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        marginLeft: 5,
        fontSize: 18,
        color: '#0E122B',
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,

        color: '#0E122B',
    },
    addressText: {
        fontSize: 10,
        color: '#C2C2CB',
        marginBottom: 5,
    },
    nameAndPrice: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingRight: 5,
        //marginLeft: 8,
        //backgroundColor: "green"
    }
});

export default OrderScreen;