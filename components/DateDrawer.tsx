import React, { forwardRef, useState, useRef, useImperativeHandle, useMemo } from 'react';
import { 
  Text, 
  Pressable, 
  Dimensions, 
  View, 
  Animated, 
  TouchableWithoutFeedback,
  Platform,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export type Ref = {
  open: () => void;
  close: () => void;
};
type Props = {
  onSelectDate: (date: string) => void;
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

const DateBottomSheet = forwardRef<Ref,Props>(({onSelectDate}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const currentMonthName = months.find(m => m.code === currentMonth)?.name || '';

  const [formData, setFormData] = useState({
    year:new Date().getFullYear(),
    month: currentMonth,
    days: new Date().getDate().toString().padStart(2, '0')
  });
  
  const translateY = useRef(new Animated.Value(BOTTOM_SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const daysInMonth = useMemo(() => {
    const monthIndex = months.findIndex(m => m.code === formData.month);
    const year = new Date().getFullYear();
    return new Date(year, monthIndex + 1, 0).getDate();
  }, [formData.month]);
  
  // Generate days array (1 to daysInMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => 
    (i + 1).toString()
  );

  
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
    // Only allow selecting the current month:
    if (value === currentMonth) {
      // If the selected day > daysInMonth for new month, reset day to '1'
      if (parseInt(formData.days) > daysInMonth) {
        setFormData({ ...formData, month: value, days: '1' });
      } else {
        setFormData({ ...formData, month: value });
      }
    } else {
      // Ignore the change - do nothing (month stays currentMonth)
    }
  };
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={() => {
        // @ts-ignore
          ref?.current?.close?.()
        }
      }
    >

      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View 
          className="absolute top-0 left-0 right-0 bottom-0 bg-black z-10"
          style={{ opacity: backdropOpacity }}
        />
      </TouchableWithoutFeedback>
      
      <Animated.View 
        className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-2xl overflow-hidden z-20"
        style={{ 
          height: BOTTOM_SHEET_HEIGHT,
          transform: [{ translateY }]
        }}
      >

        
        <View className="p-4 flex-1">
          
          <View className="flex-row justify-between h-[70%] mb-4">
            <View className="w-1/2 h-full rounded-xl overflow-hidden bg-zinc-900">
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
                    enabled={item.code === currentMonth}  // only current month enabled
                    color={item.code === currentMonth ? '#fff' : '#666'}  // gray out disabled
                  />
                ))}
              </Picker>
            </View>
            
            <View className="w-1/2 h-full rounded-xl overflow-hidden bg-zinc-900">
              <Picker
                selectedValue={formData.days}
                onValueChange={(value) => setFormData({ ...formData, days: value })}
                className="text-white h-full"
                dropdownIconColor="#fff"
                mode="dropdown"
                itemStyle={{ height: 250 }}
                
              >
                {days.map((year) => (
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
              const dateStr = `${formData.year}-${formData.month}-${formData.days}`;
              console.log("Selected date:", `${formData.year}-${formData.month}-${formData.days}`);
              onSelectDate?.(dateStr);
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
    </Modal>
  );
});

export default DateBottomSheet;