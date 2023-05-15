import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions, Modal, Pressable } from 'react-native';
import React from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import OrderItem from './OrderItem';
import BillingInfo from './BillingInfo';
import { WebView } from 'react-native-webview';
import { initializePayment, getWebViewUrlFromAWS, getPaymentResult, completePayment, getRestaurantMenu } from '../../endpoints';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderActions } from '../../actions';
import { useIsFocused } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import CashPayment from './CashPayment';
import { checkEmptyTableStatus, createCashOrder } from '../../endpoints/cart/cartEndpoints';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getDistanceFromLatLonInKm from '../home/DistanceCalculations';


export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function StepperMain() {

  const [webViewURL, setWebViewURL] = useState("");
  const [token, setToken] = useState("");
  const orderState = useSelector(state => state.orderState);
  const userState = useSelector(state => state.userState);
  const [totalPrice, setTotalPrice] = useState(0);
  const { t, i18n } = useTranslation();
  const [iyzicoVisible, setIyzicoVisible] = useState(true);
  const [cartItemsChangedError, setCartItemsChangedError] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [soldOutMessage, setSoldOutMessage] = useState([]);
  const [priceChangeMessage, setPriceChangeMessage] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [checkedRadio, setCheckedRadio] = useState("credit");
  const [cashOrderIdArray, setCashOrderIdArray] = useState([]);
  const [creditSuccess, setCreditSuccess] = useState(false);
  const userLocation = useSelector(state => state.locationState);
  const [noTableBool, setNoTableBool] = useState(false);
  const [notCloseEnoughBool, setNotCloseEnoughBool] = useState(false);

  useEffect(() => {
    setCartItemsChangedError(true);
  }, [isFocused]);

  useEffect(() => {

    let total = 0;

    orderState.orderedItems.map((item, index) => {
      total += item.price * item.counter;
    });

    setTotalPrice(total);
    console.log(orderState);
  }, [orderState]);


  function onPlaceOrderClicked() {
    console.log("place order!");
  }

  function onReturnToCartClicked() {
    setWebViewURL("");
    setToken("");
    setCartItemsChangedError(true);
  }



  function onConfirmOrderClicked() {
    setCreditSuccess(false);
    setIyzicoVisible(false);
    setNotCloseEnoughBool(false);
    setNoTableBool(false);
    /* let payload = {
      "buyerID": 4,
      "restaurantID": "5",
      "tableID": "1",
      "basketItems": [
        {
          "id": 17,
          "name": "Whopper Menü",
          "category": "Menüler",
          "price": 85
        },
        {
          "id": 18,
          "name": "Soğan Halkası (8'li)",
          "category": "Çıtır Lezzet",
          "price": 18.70
        }
      ]
    } */

    if (!orderState.tableId) {
      // remote order
      if (getDistanceFromLatLonInKm(Number(userLocation.latitude), Number(userLocation.longitude), Number(orderState.restaurantLatitude), Number(orderState.restaurantLongitude)) < 4) {
        checkEmptyTableStatus(orderState.restaurantId)
          .then((res) => {
            if (res.data === true) {
              // masa var
              checkCartAndCreateOrder();
            } else {
              // masa yok
              // modal çıkart
              setNoTableBool(true);
              setModalVisible(true);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        setNotCloseEnoughBool(true);
        setModalVisible(true);
      }
    } else {
      // qr ile order
      checkCartAndCreateOrder();
    }
  }

  function checkCartAndCreateOrder() {
    getRestaurantMenu(orderState.restaurantId)
      .then((res) => {
        let soldOut = [];
        let priceChanged = [];
        res.data.map((dish) => {
          let found = orderState.orderedItems.find(orderedDish => orderedDish.id === dish.ID);

          if (found !== null && found !== undefined) {
            if (dish.price !== found.price) {
              priceChanged.push(dish);
              setPriceChangeMessage(priceChanged);
              setCartItemsChangedError(true);
            } else if (dish.IsDisabled) {
              soldOut.push(dish);
              setSoldOutMessage(soldOut);
              setCartItemsChangedError(true);
            }
          }

        });

        let shouldProcess;
        if (soldOut.length > 0 || priceChanged.length > 0) {
          setModalVisible(true);
          shouldProcess = false;
          setCartItemsChangedError(true);

          soldOut.map((soldOutDish) => {
            dispatch(OrderActions.removeFromCart(soldOutDish.ID));
          });

          priceChanged.map((priceChangedDish) => {
            dispatch(OrderActions.updatePrice({
              id: priceChangedDish.ID,
              price: priceChangedDish.price
            }));
          });

        } else {
          shouldProcess = true;
          setCartItemsChangedError(false);
        }

        if (shouldProcess && !cartItemsChangedError) {
          let payload = {
            buyerID: userState.userId,
            restaurantID: "" + orderState.restaurantId,
            tableID: orderState.tableId,
            isRemote: (orderState.tableId) ? 0 : 1,
            basketItems: orderState.orderedItems
          }

          console.log("on confirm order clicked: ");
          console.log(payload);

          if (checkedRadio === "credit") {
            initializePayment(payload)
              .then((res) => {
                setIyzicoVisible(true);
                console.log("initialize payment: ");
                console.log(res);
                setWebViewURL(res.data);
                dispatch(OrderActions.clearBasketItems());
              })
              .catch((err) => {
                console.log(err);
              })
          } else {
            createCashOrder(payload)
              .then((res) => {
                let newArr = cashOrderIdArray;
                newArr.push(res.data);
                setCashOrderIdArray(newArr);
                dispatch(OrderActions.clearBasketItems());
              })
              .catch((err) => {
                console.log(err);
              })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleChange(params) {
    if (params.url.includes("/orderCallback")) {
      setIyzicoVisible(false);
      setCreditSuccess(true);
    }
  }

  const progressSteps = {
    borderWidth: 6,
    activeStepIconBorderColor: "transparent",
    completedProgressBarColor: themeColor,
    activeStepIconColor: themeColor,
    activeLabelColor: themeColor,
    completedStepNumColor: themeColor,
    completedStepIconColor: themeColor,
    activeStepNumColor: textColor,
  };
  const progressStep = {

    previousBtnText: t("CART_SCREEN.RETURN_TO_CART"),
    finishBtnText: "",
    previousBtnStyle: styles.previousButton,
    nextBtnTextStyle: styles.buttonText,
    previousBtnTextStyle: styles.buttonText,
    scrollViewProps: { showsVerticalScrollIndicator: false },
  };

  const firstProgressStep = {
    ...progressStep,
    previousBtnStyle: {
      display: 'none',
    },
  };

  return (
    <View style={{ flex: 1, marginBottom: -30 }}>
      <ProgressSteps {...progressSteps}>
        <ProgressStep label={t("CART_SCREEN.CART")}
          nextBtnText={(cartItemsChangedError) ? t("CART_SCREEN.CONTROL_CART") : t("CART_SCREEN.CONFIRM_ORDER")}
          nextBtnStyle={(cartItemsChangedError) ? styles.firstStepNextButtonError :
            (orderState.orderedItems.length > 0) ? styles.firstStepNextButton : styles.firstStepNextButtonDisabled
          }
          nextBtnDisabled={(orderState.orderedItems.length > 0) ? false : true}
          {...firstProgressStep}
          onNext={onConfirmOrderClicked}
          errors={cartItemsChangedError}
          viewProps={{ flex: 1 }}
          scrollable={false}
        >
          <View style={styles.headerWithBilling}>
            <Text style={styles.textHeader}>{t("CART_SCREEN.CART")}</Text>
            <View>
              <BillingInfo totalPrice={totalPrice} />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={true}
          >
            {
              orderState.orderedItems.map((item, index) => {
                return (
                  <OrderItem key={item.id} item={item} />
                );
              })
            }
          </ScrollView>
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.radio}>
              <TouchableOpacity style={styles.radio} onPress={() => { setCheckedRadio("credit"); }}>
                <RadioButton
                  value="credit"
                  status={(checkedRadio === "credit") ? "checked" : "unchecked"}
                  color='black'
                  uncheckedColor='gray'
                  onPress={() => { setCheckedRadio("credit"); }}
                />
                <Text>{t("CART_SCREEN.PAY_CREDIT")}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.radio}
                disabled={(orderState.tableId) ? false : true}
                onPress={() => { setCheckedRadio("cash"); }}>
                <RadioButton
                  value="cash"
                  status={(checkedRadio === "cash") ? "checked" : "unchecked"}
                  color='black'
                  uncheckedColor='gray'
                  disabled={(orderState.tableId) ? false : true}
                  onPress={() => { setCheckedRadio("cash"); }}
                />
                <Text>{t("CART_SCREEN.PAY_CASH")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {
                  (soldOutMessage.length > 0) ?
                    <Text style={styles.modalText}>
                      {t("CART_SCREEN.SOLD_OUT_ITEMS")}
                      {soldOutMessage.map((soldOut) => {
                        return soldOut.name
                      }).join(", ")
                      }
                    </Text>
                    :
                    null
                }
                {
                  (priceChangeMessage.length > 0) ?
                    <Text style={styles.modalText}>
                      {t("CART_SCREEN.PRICE_CHANGED_ITEMS")}
                      {priceChangeMessage.map((priceChanged) => {
                        return priceChanged.name
                      }).join(", ")
                      }
                    </Text>
                    :
                    null
                }
                {
                  (notCloseEnoughBool) ?
                    <Text style={styles.modalText}>
                      {t("CART_SCREEN.NOT_CLOSE_ENOUGH")}
                    </Text>
                    :
                    (noTableBool) ?
                      <Text style={styles.modalText}>
                        {t("CART_SCREEN.NO_TABLE")}
                      </Text>
                      :
                      <Text style={styles.modalText}>
                        {t("CART_SCREEN.MODAL_MESSAGE")}
                      </Text>
                }

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>{t("CART_SCREEN.MODAL_CLOSE")}</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ProgressStep>
        <ProgressStep
          label={t("CART_SCREEN.PAYMENT")} {...progressStep}
          nextBtnStyle={[styles.nextBtnStyle, {marginLeft: 800}]}
          nextBtnTextStyle={{visibility: "hidden"}}
          onPrevious={onReturnToCartClicked}
          onSubmit={onPlaceOrderClicked}
          viewProps={{ flex: 1 }}
          scrollable={false}
        >
          <Text style={styles.textHeader}>{t("CART_SCREEN.PAYMENT")}</Text>
          <View style={styles.iyzicoContainer}>
            {
              (iyzicoVisible && checkedRadio === "credit") ?
                <WebView
                  style={{ height: 400, width: 420, resizeMode: 'contain', flex: 1 }}
                  source={{ uri: webViewURL }}
                  /* scalesPageToFit={false}
                  scrollEnabled={true} */
                  onNavigationStateChange={handleChange}
                />
                :
                (checkedRadio === "credit" && creditSuccess) ?
                  <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Ionicons
                      name="shield-checkmark-sharp"
                      color={'#00ff00'}
                      size={250}
                    />
                    <Text>{t("CART_SCREEN.CREDIT_SUCCESS")}</Text>
                  </View>
                  :
                  null

            }
            {
              (checkedRadio === "cash") ?
                <CashPayment
                  cashOrderIdArray={cashOrderIdArray}
                />
                :
                null
            }
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  firstStepNextButton: {
    backgroundColor: themeColor,
    width: screenDimensions.width - 40,
    paddingVertical: 10,
    position: "absolute",
    left: -screenDimensions.width + 60 + 20,
    top: -40,
    borderRadius: 10,
  },
  firstStepNextButtonDisabled: {
    backgroundColor: "gray",
    width: screenDimensions.width - 40,
    paddingVertical: 10,
    position: "absolute",
    left: -screenDimensions.width + 60 + 20,
    top: -40,
    borderRadius: 10,
  },
  firstStepNextButtonError: {
    backgroundColor: "#D82227",
    width: screenDimensions.width - 40,
    paddingVertical: 10,
    position: "absolute",
    left: -screenDimensions.width + 60 + 20,
    top: -40,
    borderRadius: 10,
  },
  previousButton: {
    backgroundColor: themeColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    position: "absolute",
    top: -40,
    left: -screenDimensions.width / 4 + 20 + 40,
    width: screenDimensions.width / 2 - 40
  },
  buttonText: {
    color: textColor,
    fontSize: 16,
    textAlign: "center"
  },
  textHeader: {
    fontSize: 36,
    marginBottom: 10,
    marginStart: 20,
    marginTop: 0,
    fontWeight: 'bold',
  },
  nextBtnStyle: {
    backgroundColor: themeColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    position: "absolute",
    top: -40,
    left: -screenDimensions.width / 4 - 20,
    width: screenDimensions.width / 2 - 40
  },
  headerWithBilling: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iyzicoContainer: {
    flex: 1,
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
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  radioView: {
    backgroundColor: "red",
    borderRadius: 15,
    elevation: 5,
    position: "absolute",
    bottom: 0
  }
});