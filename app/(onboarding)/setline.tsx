import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function SetLineScreen() {
  const [selectedLine, setSelectedLine] = useState('Barrie');

  const goLines = [
    'Barrie',
    'Kitchener',
    'Lakeshore East',
    'Lakeshore West',
    'Milton',
    'Richmond Hill',
    'Stouffville'
  ];

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      {/* Header Text */}
      <View className="items-center pt-4">
        <Text className="text-white text-2xl font-semibold text-center">First, let's set your line</Text>
        <Text className="text-white pt-4 text-lg font-light text-center">
          Your line is the GO Train route that you travel along most frequently. You'll be able to
          set other routes later.
        </Text>
      </View>

      {/* Picker should take the most space */}
      <View className="flex-1 justify-center">
        <View className="w-full bg-black rounded-2xl overflow-hidden">
          <Picker
            selectedValue={selectedLine}
            onValueChange={(itemValue) => setSelectedLine(itemValue)}
            itemStyle={{ 
              fontSize: 22,      
              height: 400,        
              color: 'white', 
          }}
          >
            {goLines.map((line) => (
              <Picker.Item key={line} label={line} value={line} color="white" />
            ))}
          </Picker>
        </View>
      </View>

      {/* Footer (Buttons + Indicators) */}
      <View className="pb-10 space-y-6">
        {/* Buttons */}
        <View className="flex-row justify-between w-full">
          <TouchableOpacity
            className="flex-1 items-center py-2 mr-2 border-2 border-gray-700 rounded-xl"
            disabled={true}
          >
            <Text className="text-gray-700 text-base font-medium">Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center py-2 ml-2 bg-green-700 rounded-xl"
            onPress={() => router.replace('/(onboarding)/setorigin')}
          >
            <Text className="text-white text-base font-medium">Next</Text>
          </TouchableOpacity>
        </View>

        {/* Indicators */}
        <View className="flex-row justify-center gap-2 pt-6">
          <View className="w-2.5 h-2.5 rounded-full bg-green-700" />
          <View className="w-2.5 h-2.5 rounded-full bg-white opacity-20" />
          <View className="w-2.5 h-2.5 rounded-full bg-white opacity-20" />
        </View>
      </View>
    </SafeAreaView>
  );
}
