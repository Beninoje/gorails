import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Check } from 'lucide-react-native';
import NormalHeader from '@/components/header/NormalHeader';
import { useTripStore } from '@/store/useTripStore';

const barrieStations = [
  { name: 'Union Station', code: 'UN' },
  { name: 'Downsview Park', code: 'DW' },
  { name: 'Rutherford', code: 'RU' },
  { name: 'Maple', code: 'MP' },
  { name: 'King City', code: 'KC' },
  { name: 'Aurora', code: 'AU' },
  { name: 'Newmarket', code: 'NE' },
  { name: 'East Gwillimbury', code: 'EA' },
  { name: 'Bradford', code: 'BD' },
  { name: 'Barrie South', code: 'BA' },
  { name: 'Allandale Waterfront', code: 'AD' },
];

export default function ChangeOrigin() {
  const { setTrip, originName, origin, destination, destinationName,line } = useTripStore();

  return (
    <SafeAreaView className="flex-1 bg-green-700">
      <View className="flex-1 bg-black">
        <View className="">
          <View className="bg-black rounded-md ">
            {barrieStations.map((station) => (
              <TouchableOpacity
                key={station.code}
                className={`flex-row items-center justify-between px-4 py-4 border-b border-zinc-700 
                `}
                onPress={() => setTrip({
                  origin:station.code,
                  originName:station.name,
                })}
                disabled={destinationName === station.name}
              >
                <Text className={`${destinationName === station.name ? 'text-zinc-500' : 'text-white'}  text-base`}>{station.name}</Text>
                {originName === station.name && (
                  <Check color="#22c55e" size={20} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
