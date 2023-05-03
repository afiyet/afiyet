import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import CategoryListItem from '../components/order/CategoryListItem';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getRestaurantMenu, getRestaurant } from '../endpoints';
import { OrderActions } from '../actions';
import FoodCard from '../components/order/FoodCard';
import OrderBottomSheet from '../components/order/OrderBottomSheet';
import getDistanceFromLatLonInKm from '../components/home/DistanceCalculations';
import { useTranslation } from 'react-i18next';
import useInterval from '../customHooks/UseInterval';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ListHeader = () => (
    <View
        style={{
            flexDirection: 'row',
            flex: 1,
            width: 40,
            justifyContent: 'flex-end',
        }}>
        <View
            style={{
                backgroundColor: '#D82227',
                width: 20,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
            }}
        />
    </View>
);

const ListFooter = () => (
    <View
        style={{
            flexDirection: 'row',
            flex: 1,
            width: 40,
        }}>
        <View
            style={{
                backgroundColor: '#D82227',
                width: 20,
                borderTopRightRadius: 64,
                borderBottomRightRadius: 64,
            }}
        />
    </View>
);

const TestOrder = (props) => {
    const {
        setBottomNavLabel,
    } = props;

    const [restaurant, setRestaurant] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sections, setSections] = useState([]);
    const [menu, setMenu] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const userLocation = useSelector(state => state.locationState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState({});
    const [waiting, setWaiting] = useState(true);
    const { t, i18n } = useTranslation();
    const [initialFetchComplete, setInitialFetchComplete] = useState(false);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchMenu();
    }, [route]);


    useInterval(fetchNewMenu, (isFocused && !modalVisible) ? 30000 : null);

    function detectChangeInMenu(newMenu) {

        //if exist before but deleted after
        if (newMenu.length < menu.length) {
            return menu.filter(dish => {
                return !newMenu.some(newDish => (newDish.ID === dish.ID));
            })
        }

        return newMenu.filter(newDish => {

            let found = null;
            found = menu.find((dish) => (dish.ID === newDish.ID));

            //if dish did not exist before
            if (found === null || found === undefined) {
                return true;
            } 

            //if dish exists but updated
            if (newDish.ID === found.ID) {
                if (new Date(newDish.updatedAt) > new Date(found.updatedAt)) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

    function fetchNewMenu() {
        console.log(initialFetchComplete);
        if (initialFetchComplete) {
            let newMenu = [];
            getRestaurantMenu(route.params.rID)
                .then((res) => {
                    newMenu = res.data;

                    let changedDishes = detectChangeInMenu(newMenu);
                    if (changedDishes.length > 0) {
                        setModalVisible(true);
                    }
                    console.log(changedDishes);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function fetchMenu() {
        console.log(route);
        setIsBottomSheetOpen(false);
        setWaiting(true);

        dispatch(OrderActions.setBarcodeParams({
            restaurantId: route.params.rID,
            tableId: route.params.tableId
        }));

        setBottomNavLabel("Order");
        getRestaurantMenu(route.params.rID)
            .then((res) => {
                console.log(res.data);
                let tempSections = [];
                res.data.map((item, index) => {
                    if (!tempSections.find((sItem) => { return sItem === item.category })) {
                        tempSections.push(item.category);
                    }
                });
                setSelectedCategory(tempSections[0]);
                setSections(tempSections);
                setMenu(res.data);

                getRestaurant(route.params.rID)
                    .then((res) => {
                        setRestaurant(res.data);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                setInitialFetchComplete(true);
                setTimeout(() => { setWaiting(false); }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setMenu([]);
                setInitialFetchComplete(false);
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" translucent backgroundColor="transparent" />
            {(!waiting) ?
                <View style={{ height: "100%" }}>
                    <View style={{ height: "100%", backgroundColor: Colors.SECONDARY_WHITE, }}>
                        {
                            (restaurant.Picture != "") ?
                                <Image
                                    source={{
                                        uri: restaurant.Picture,
                                    }}
                                    resizeMode={"cover"}
                                    style={styles.backgroundImage}
                                />
                                :
                                null
                        }
                        <ScrollView>
                            <View style={styles.mainContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{restaurant.Name}</Text>
                                </View>
                                <Text style={styles.tagText}>{restaurant.Category}</Text>
                                <Text style={styles.addressText}>{restaurant.Address}</Text>
                                <View style={styles.reviewAndLocation}>
                                    <TouchableOpacity
                                        style={styles.ratingReviewsContainer}
                                        activeOpacity={0.1}
                                        onPress={() => { navigation.push("Comments") }}
                                    >
                                        <FontAwesome
                                            name="star"
                                            size={18}
                                            color={"#D82227"}
                                        />
                                        <Text style={styles.ratingText}>{restaurant.AvgPoint.toString().substr(0, 3)}</Text>
                                        <Text style={styles.reviewsText}>({restaurant.CommentCount} {t("ORDER_SCREEN.REVIEWS")})</Text>
                                    </TouchableOpacity>
                                    <View style={styles.deliveryDetailsContainer}>
                                        <View style={styles.rowAndCenter}>
                                            <Text style={styles.deliveryDetailText}>
                                                {Math.round(getDistanceFromLatLonInKm(Number(userLocation.latitude), Number(userLocation.longitude), Number(restaurant.Latitude), Number(restaurant.Longitude)))} km
                                            </Text>
                                            <Ionicons name="location-sharp" size={18} color={"#D82227"} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.categoriesContainer}>
                                    <FlatList
                                        data={sections}
                                        keyExtractor={item => item}
                                        horizontal
                                        ListHeaderComponent={() => <ListHeader />}
                                        ListFooterComponent={() => <ListFooter />}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <CategoryListItem
                                                name={item}
                                                isActive={item === selectedCategory}
                                                selectCategory={category => setSelectedCategory(category)}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.foodList}>
                                    {menu
                                        ?.filter(food => food.category === selectedCategory)
                                        ?.map(item => {
                                            return (
                                                <FoodCard
                                                    key={item.ID}
                                                    item={item}
                                                    setSelectedMenuItem={setSelectedMenuItem}
                                                    setIsBottomSheetOpen={setIsBottomSheetOpen}
                                                />
                                            );

                                        })}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <OrderBottomSheet
                        isBottomSheetOpen={isBottomSheetOpen}
                        setIsBottomSheetOpen={setIsBottomSheetOpen}
                        selectedMenuItem={selectedMenuItem}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Restoran Menüde Değişiklik Yaptı</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        fetchMenu();
                                    }}>
                                    <Text style={styles.textStyle}>Yeni Menüyü Gör</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
                :
                <ActivityIndicator animating={waiting} size={"large"} color={"#d82227"} />
            }
        </View>
    );
};

const Colors = {
    DEFAULT_BLACK: '#0E122B',
    DEFAULT_GREEN: '#0A8791',
    DEFAULT_YELLOW: '#FBA83C',
    DEFAULT_GREY: '#C2C2CB',
    DEFAULT_WHITE: '#FFFFFF',
    DEFAULT_RED: '#F53920',
    SECONDARY_RED: '#FF6F59',
    SECONDARY_WHITE: '#F8F8F8',
    SECONDARY_GREEN: '#24C869',
    SECONDARY_BLACK: '#191d35',
    LIGHT_GREEN: '#CEE8E7',
    LIGHT_GREY: '#F8F7F7',
    LIGHT_GREY2: '#EAEAEA',
    LIGHT_YELLOW: '#FCE6CD',
    LIGHT_RED: '#FFC8BF',
    FABEBOOK_BLUE: '#4A61A8',
    GOOGLE_BLUE: '#53A0F4',
    INACTIVE_GREY: '#A3A3A3',
    DARK_ONE: '#121212',
    DARK_TWO: '#181818',
    DARK_THREE: '#404040',
    DARK_FOUR: '#282828',
    DARK_FIVE: '#B3B3B3',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        height: 200,
        width: "100%",
    },
    mainContainer: {
        backgroundColor: Colors.SECONDARY_WHITE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: 180
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginTop: 15,
    },
    title: {
        fontSize: 23,
        lineHeight: 23 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontWeight: "bold"
    },
    tagText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_GREY,
    },
    ratingReviewsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontWeight: "bold",
    },
    reviewsText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontWeight: "bold",
    },
    deliveryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    deliveryDetailText: {
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontWeight: "bold",
    },
    deliveryDetailIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    restaurantType: {
        backgroundColor: Colors.LIGHT_YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
    },
    restaurantTypeText: {
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_YELLOW,
    },
    categoriesContainer: {
        marginVertical: 20,
    },
    foodList: {
        marginHorizontal: 15,
    },
    reviewAndLocation: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    addressText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.DEFAULT_GREY,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: screenDimensions.width * 0.8,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#D82227',
        width: "100%"
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default TestOrder;