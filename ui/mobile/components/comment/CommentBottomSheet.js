import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import AddComment from './AddComment';

const CommentBottomSheet = (props) => {

    const {
        isBottomSheetOpen,
        setIsBottomSheetOpen,
    } = props;

    useEffect(() => {
        if(isBottomSheetOpen){handlePresentModalPress();}
        if(!isBottomSheetOpen){handleClose();}
    }, [isBottomSheetOpen]);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = ['90%'];

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <BottomSheetModalProvider>
      <View>
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
            <AddComment
              setIsBottomSheetOpen={setIsBottomSheetOpen}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    flexGrow: 1
  },
});

export default CommentBottomSheet;