import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import OrderItem from './OrderItem';
import BillingInfo from './BillingInfo';
import { WebView } from 'react-native-webview';
import { initializePayment, getWebViewUrlFromAWS, getPaymentResult, completePayment } from '../../endpoints';
import { useState } from 'react';

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function StepperMain() {

  const [webViewURL, setWebViewURL] = useState("");
  const [token, setToken] = useState("");


  function onPlaceOrderClicked() {
    console.log("place order!");
  }

  function onReturnToCartClicked() {
    setWebViewURL("");
    setToken("");
  }

  function onConfirmOrderClicked() {
    let payload = {
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
    }

    initializePayment(payload)
      .then((res) => {
        console.log(res);
        getWebViewUrlFromAWS(res.data)
          .then((response) => {
            console.log(response);
            setWebViewURL(response.data.paymentPageUrl);
            setToken(response.data.token);
          })
          .catch((error) => {
            console.log(error);
          })

      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleChange(params) {
    if (params.url.includes("/orderCallback")) {
      getPaymentResult({ "token": token })
        .then((res) => {
          completePayment(res)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        })
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

    previousBtnText: 'Return to Cart',
    finishBtnText: 'Place Order',
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
        <ProgressStep label="Cart"
          nextBtnText='Confirm Order'
          nextBtnStyle={styles.firstStepNextButton}
          {...firstProgressStep}
          onNext={onConfirmOrderClicked}
        >
          <View style={styles.headerWithBilling}>
            <Text style={styles.textHeader}>Cart</Text>
            <View>
              <BillingInfo />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </ScrollView>
        </ProgressStep>
        <ProgressStep
          label="Payment" {...progressStep}
          nextBtnStyle={styles.nextBtnStyle}
          onPrevious={onReturnToCartClicked}
          onSubmit={onPlaceOrderClicked}
        >
          <Text style={styles.textHeader}>Payment</Text>
          <View style={styles.iyzicoContainer}>
            <WebView
              style={{ height: 400, width: 420, resizeMode: 'contain', flex: 1 }}
              source={{ uri: webViewURL }}
              /* scalesPageToFit={false}
              scrollEnabled={true} */
              onNavigationStateChange={handleChange}
            />
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

  }
});