import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import OrderFood from './OrderFood';

const OrderBottomSheet = (props) => {

    const {
        isBottomSheetOpen,
        setIsBottomSheetOpen,
        selectedMenuItem
    } = props;

    useEffect(() => {
        if(isBottomSheetOpen){handlePresentModalPress();}
    }, [isBottomSheetOpen]);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = ['60%', '70%'];

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableDismissOnClose={true}
          onDismiss={() => {setIsBottomSheetOpen(false)}}
          enableHandlePanningGesture={false}
          enableOverDrag={true}
          enablePanDownToClose={true}
          backdropComponent={props => ( <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} opacity={0.7} enableTouchThrough={true} /> )}
          
        >
          <View style={styles.contentContainer}>
            <OrderFood 
                selectedMenuItem={selectedMenuItem}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    flexGrow: 1
  },
});

export default OrderBottomSheet;