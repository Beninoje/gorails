import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import { 
  Text, 
  Pressable, 
  Dimensions, 
  View, 
  Animated, 
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export type Ref = {
  open: () => void;
  close: () => void;
};

const months = [
  { name: 'January', code: '01' },
  { name: 'February', code: '02' },
  { name: 'March', code: '03' },
  { name: 'April', code: '04' },
  { name: 'May', code: '05' },
  { name: 'June', code: '06' },
  { name: 'July', code: '07' },
  { name: 'August', code: '08' },
  { name: 'September', code: '09' },
  { name: 'October', code: '10' },
  { name: 'November', code: '11' },
  { name: 'December', code: '12' },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.4;

const DateBottomSheet = forwardRef<Ref>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    month: months[0].code,
    year: new Date().getFullYear().toString()
  });
  
  const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // Generate years (current year to next 5 years)
  const years = Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return year.toString();
  });
  
  // Expose open/close methods via ref
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    },
    close: () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: BOTTOM_SHEET_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setIsVisible(false));
    },
  }));
  
  const handleBackdropPress = () => {
    // @ts-ignore
    ref?.current?.close();
  };
  
  const handleMonthChange = (value: string) => {
    setFormData(prev => ({ ...prev, month: value }));
  };
  
  const handleYearChange = (value: string) => {
    setFormData(prev => ({ ...prev, year: value }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View 
          className="absolute top-0 left-0 right-0 bottom-0 bg-black"
          style={{ opacity: backdropOpacity }}
        />
      </TouchableWithoutFeedback>
      
      {/* Bottom Sheet */}
      <Animated.View 
        className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-2xl overflow-hidden"
        style={{ 
          height: BOTTOM_SHEET_HEIGHT,
          transform: [{ translateY }]
        }}
      >
        
        <View className="p-4 flex-1">
          
          {/* Dual Picker Container */}
          <View className="flex-row justify-between h-[75%] bg-red-500 mb-4">
            {/* Month Picker */}
            <View className="w-[50%] h-full overflow-hidden bg-zinc-900">
              <Picker
                selectedValue={formData.month}
                onValueChange={handleMonthChange}
                className="text-white h-full"
                dropdownIconColor="#fff"
                mode="dropdown"
                itemStyle={{ height: 250 }}
              >
                {months.map((item) => (
                  <Picker.Item 
                    key={item.code} 
                    label={item.name} 
                    value={item.code}
                    color="#fff"
                    style={{
                      fontSize: 16,
                      height: Platform.OS === 'ios' ? 100 : 50
                    }} 
                  />
                ))}
              </Picker>
            </View>
            
            {/* Year Picker */}
            <View className="w-[50%] h-full overflow-hidden bg-zinc-900">
              <Picker
                selectedValue={formData.year}
                onValueChange={handleYearChange}
                className="text-white h-full"
                dropdownIconColor="#fff"
                mode="dropdown"
                itemStyle={{ height: 250 }}
              >
                {years.map((year) => (
                  <Picker.Item 
                    key={year} 
                    label={year} 
                    value={year}
                    color="#fff"
                    style={{
                      fontSize: 16,
                      height: Platform.OS === 'ios' ? 100 : 50
                    }} 
                  />
                ))}
              </Picker>
            </View>
          </View>
          
          <Pressable
            className="mt-4 bg-green-700 py-3.5 rounded-lg"
            onPress={() => {
              console.log("Selected date:", formData.month, formData.year);
              // @ts-ignore
              ref?.current?.close();
            }}
          >
            <Text className="text-white text-lg font-semibold text-center">
              View Dates
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
});

export default DateBottomSheet;