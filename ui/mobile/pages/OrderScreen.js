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

function OrderScreen(props) {
    const {
        setBottomNavLabel,
    } = props;
    const [sections, setSections] = useState([]);
    const [sectionLength, setSectionLength] = useState(0);
    
    const [menu, setMenu] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.orderState);

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
                let sikData = [];
                let charCount = 0;
                let tempSections = [];


                res.data.map((item, index) => {
                    if (!sikData.find((sItem) => { return sItem.title === item.category })) {
                        charCount += item.category.length;
                        tempSections.push(item.category);
                        sikData.push({
                            title: item.category,
                            data: []
                        });

                    }
                });
                
                setSections(tempSections);
                setSectionLength(charCount * 15 / res.data.length);

                res.data.map((item, index) => {
                    sikData.map((sItem) => {
                        if (sItem.title === item.category) {
                            sItem.data.push({
                                ID: item.ID,
                                ingredients: item.ingredients,
                                picture: item.picture,
                                price: item.price,
                                name: item.name,
                                restaurantId: item.restaurantId
                            });
                        }
                    });
                });
                setMenu(sikData);
            })
            .catch((err) => {
                console.log(err);
                setMenu([]);
            })
    }, [route]);

    const flatListRef = useRef(null);
    const sectionListRef = useRef(null);

    const SectionItem = ({ value }) => {
        return (
            <View style={{ backgroundColor: "white" }}>
                <TouchableOpacity onPress={() => {
                    //flatListRef.current.scrollToIndex({ index: value.index });
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
                        paddingBottom: 10,
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
                onPress={() => {
                    navigation.navigate("Food Details")
                }}
            >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: Dimensions.get("screen").width,
                    padding: 18,
                    backgroundColor: "white"
                }}>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexGrow: 2,
                        maxWidth: "70%",
                        paddingRight: 15
                    }}>
                        <Text style={{ fontSize: 20, paddingBottom: 5 }}>{value.name}</Text>
                        <Text style={{ fontSize: 12, paddingBottom: 5, color: "gray" }}>{value.ingredients}</Text>
                        <Text style={{ fontSize: 14 }}>{value.price} TL</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 10,
                            }}
                            source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" }}
                            resizeMode="center"
                        />
                    </View>
                </View>
            </Pressable>
        );
    }


    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {

        let element;

        viewableItems.forEach(el => {
            if (el.index === null) {
                element = el;
                return;
            }
        });

        if (element?.index === null) {
            //flatListRef.current.scrollToIndex({index: value.index});
            if (changed.length !== 0) {
                //console.log(sect.indexOf(element.item.title))
                //console.log(sect)
                /* flatListRef.current.scrollToIndex({ index: sections.indexOf(element.item.title) }); */
            }

        }

        /*viewableItems.forEach(element => {
            if(element.index === null) {
                //flatListRef.current.scrollToIndex({index: value.index});
                if(changed.length !== 0) {
                    console.log(sect.indexOf(element.item.title))
                    console.log(sect)
                    flatListRef.current.scrollToIndex({index: sect.indexOf(element.item.title)});
                }

            }
        });*/
        //console.log(changed)
    })

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
    };

    return (

        (menu.length) > 0 ?
            <View
                style={{ display: "flex", flexGrow: 1, paddingBottom: 100 }}
            >
                <FlatList
                    initialNumToRender={60}
                    ref={flatListRef}
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
                    onScrollToIndexFailed={info => {
                        console.log(info)
                        const wait = new Promise(resolve => setTimeout(resolve, 1000));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                />
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
                    //onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig}
                    ItemSeparatorComponent={() => (<View
                        style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8' }}
                    />)}
                />

            </View>
            :
            null

    );
}

const styles = StyleSheet.create({

});

export default OrderScreen;