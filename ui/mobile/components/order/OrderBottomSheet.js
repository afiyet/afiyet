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
  const snapPoints = ['60%', '80%'];

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableDismissOnClose={true}
          onDismiss={() => {setIsBottomSheetOpen(false)}}
          enableHandlePanningGesture={true}
          enableOverDrag={true}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{backgroundColor: "grey"}}
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