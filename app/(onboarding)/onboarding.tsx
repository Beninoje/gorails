import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useTripStore } from '@/store/useTripStore';
import { GOLINES, STATION_BY_LINE } from '@/lib/utils';


type GoLine = keyof typeof STATION_BY_LINE;

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<{
    line: GoLine;
    origin: string;
    originName: string;
    destination: string;
    destinationName: string;
  }>(() => {
    const initialLine = GOLINES[0] as GoLine;
    const initialStations = STATION_BY_LINE[initialLine];
    return {
      line: initialLine,
      origin: initialStations[0].code,
      originName: initialStations[0].name,
      destination: initialStations[0].code,
      destinationName: initialStations[0].name,
    };
  });
  const currentStations = STATION_BY_LINE[formData.line] || [];


  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const isLastStep = step === 2;

  const handleFinish = () => {
    if(formData.origin === formData.destination)
      {
        Alert.alert(
          'Error',
          'Your origin cannot be the same as your destination',
          [{ text: 'OK' }]
        );
        return;
      }
    useTripStore.getState().setTrip(formData);
    
    router.push("/(tabs)/schedule")
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-6">
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
                onValueChange={(value) => {
                  const stations = STATION_BY_LINE[value];
                  setFormData((prev) => ({
                    ...prev,
                    line: value,
                    origin: stations[0].code,
                    originName: stations[0].name,
                    destination: stations[0].code,
                    destinationName: stations[0].name,
                  }));
                }}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {GOLINES.map((line) => (
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
                onValueChange={(value) => {
                  const selected = currentStations.find((station) => station.code === value);
                  if (selected) {
                    setFormData((prev) => ({
                      ...prev,
                      origin: selected.code,
                      originName: selected.name,
                    }));
                  }
                }}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {currentStations.map((station) => (
                  <Picker.Item key={station.name} label={station.name} value={station.code} color="white" />
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
                onValueChange={(value) => {
                  const selected = currentStations.find((station) => station.code === value);
                  if (selected) {
                    setFormData((prev) => ({
                      ...prev,
                      destination: selected.code,
                      destinationName: selected.name,
                    }));
                  }
                }}
                itemStyle={{ fontSize: 22, height: 500, color: 'white' }}
              >
                {currentStations.map((station) => (
                  <Picker.Item key={station.name} label={station.name} value={station.code} color="white" />
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
