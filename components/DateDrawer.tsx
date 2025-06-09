import React, { useRef, useMemo } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function DateDrawer() {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleOpen = () => sheetRef.current?.expand();
  const handleClose = () => sheetRef.current?.close();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#000', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleOpen} >
        <Text className='text-white'>
        Open
        </Text>
        
        </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        index={-1} // closed by default
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#111' }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 8 }}>Pick a Date</Text>
          {/* You can place Picker, Calendar, etc. here */}
        </View>
      </BottomSheet>
    </View>
  );
}
