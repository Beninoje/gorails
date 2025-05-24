import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const goLines = ['Barrie', 'Kitchener', 'Lakeshore East', 'Lakeshore West', 'Milton', 'Richmond Hill', 'Stouffville'];
const barrieStations = ['Union Station', 'Downsview Park', 'Rutherford', 'Maple', 'King City', 'Aurora', 'Newmarket', 'East Gwillimbury', 'Bradford', 'Barrie South', 'Allandale Waterfront'];

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    line: '',
    origin: '',
    destination: '',
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const isLastStep = step === 2;

  const handleFinish = () => {
    console.log('Form Data:', formData);
    // Navigate or submit data here
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <ScrollView scrollEnabled={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        {step === 0 && (
          <>
            <View className="items-center pt-4">
              <Text className="text-white text-2xl font-semibold text-center">First, let's set your line</Text>
              <Text className="text-white pt-4 text-lg font-light text-center">
                Your line is the GO Train route that you travel along most frequently.
              </Text>
            </View>
            <View className="flex-1 justify-center">
              <Picker
                selectedValue={formData.line}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, line: value }))}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {goLines.map((line) => (
                  <Picker.Item key={line} label={line} value={line} color="white" />
                ))}
              </Picker>
            </View>
          </>
        )}

        {step === 1 && (
          <>
            <View className="items-center pt-4">
              <Text className="text-white text-2xl font-semibold text-center">Next, what is your origin?</Text>
              <Text className="text-white pt-4 text-lg font-light text-center">
                Your origin is the station from which you depart to begin your journey.
              </Text>
            </View>
            <View className="flex-1 justify-center">
              <Picker
                selectedValue={formData.origin}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, origin: value }))}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {barrieStations.map((station) => (
                  <Picker.Item key={station} label={station} value={station} color="white" />
                ))}
              </Picker>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <View className="items-center pt-4">
              <Text className="text-white text-2xl font-semibold text-center">Where is your destination?</Text>
              <Text className="text-white pt-4 text-lg font-light text-center">
                Your destination is where you end your trip.
              </Text>
            </View>
            <View className="flex-1 justify-center">
              <Picker
                selectedValue={formData.destination}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, destination: value }))}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {barrieStations.map((station) => (
                  <Picker.Item key={station} label={station} value={station} color="white" />
                ))}
              </Picker>
            </View>
          </>
        )}

        {/* Navigation Buttons */}
        <View className="flex-row justify-between w-full pb-20">
          <TouchableOpacity
            className={`flex-1 items-center py-2 mr-2 border-2 rounded-xl ${step === 0 ? 'border-gray-700' : 'border-green-700'}`}
            onPress={back}
            disabled={step === 0}
          >
            <Text className={`text-base font-medium ${step === 0 ? 'text-gray-700' : 'text-white'}`}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 items-center py-2 ml-2 bg-green-700 rounded-xl"
            onPress={isLastStep ? handleFinish : next}
          >
            <Text className="text-white text-base font-medium">{isLastStep ? 'Finish' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center gap-2 ">
            {[0,1,2].map((i)=>(
                <View
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  step === i ? 'bg-green-700' : 'bg-white opacity-20'
                }`}
              />
            ))}
          
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
