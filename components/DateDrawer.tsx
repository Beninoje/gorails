import React, { forwardRef, useMemo } from 'react';
import { Text, Pressable, Dimensions } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type Ref = BottomSheetModal;

const DateBottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const screenHeight = Dimensions.get('window').height;
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      backgroundStyle={{ backgroundColor: '#18181b' }}
      handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
          pressBehavior="close"
          style={{ backgroundColor: 'rgba(0,0,0,1)', marginTop: '13%' }}
        />
      )}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetView 
          style={{
            padding: 24,
            minHeight: screenHeight * 0.5,
          }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
            Select your future date
          </Text>
          <Pressable style={{ marginTop: 16, backgroundColor: '#15803d', paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
              View Dates
            </Text>
          </Pressable>
        </BottomSheetView>
      </GestureHandlerRootView>
    </BottomSheetModal>
  );
});

export default DateBottomSheet;
