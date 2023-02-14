import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import OrderItem from './OrderItem';

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function StepperMain() {
     
    
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
      };

      const firstProgressStep = {
        ...progressStep,
        previousBtnStyle: {
          display: 'none',
        },
      };

  return (
    <View style={{flex: 1, marginBottom: -30}}>
      <ProgressSteps {...progressSteps}>
          <ProgressStep label="Cart" 
          nextBtnText= 'Confirm Order'
          nextBtnStyle={styles.firstStepNextButton}
          {...firstProgressStep}>
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </ProgressStep>
          <ProgressStep label="Payment" {...progressStep}
          nextBtnStyle={styles.nextBtnStyle}>
            <Text>Order geçmişi kredi kartı vsvs</Text>
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
        left: -screenDimensions.width/4 + 20 + 40,
        width: screenDimensions.width/2 - 40
      },
    buttonText: {
      color: textColor,
      fontSize: 16,
      textAlign: "center"
    },
    textHeader: {
        fontSize: 36,
        marginBottom: 24,
        marginStart: 12,
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
      left: -screenDimensions.width/4 - 20,
      width: screenDimensions.width/2 - 40
  }
  });