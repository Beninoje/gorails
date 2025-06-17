import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Check } from 'lucide-react-native';
import { GOLINES, STATION_BY_LINE } from '@/lib/utils';
import { useTripStore } from '@/store/useTripStore';



export default function ChangeLine() {
  const { setTrip,line } = useTripStore();
  const handleLineSelect = (selectedLine:string) => {
    const stations = STATION_BY_LINE[selectedLine];
    if(!stations || stations.length === 0) return;
    const origin = stations[stations.length - 1];
    const originCode = origin.code;
    const originName = origin.name;
    const destination = 'UN';

    setTrip({
      line:selectedLine,
      origin:originCode,
      originName:originName,
      destination:destination,
      destinationName:"Union Station"
    })
  }
  return (
    <SafeAreaView className="flex-1 bg-green-700">
      <View className="flex-1 bg-black">
        <View className="">
          <View className="bg-black  rounded-md ">
            {GOLINES.map((station:any) => (
              <TouchableOpacity
                key={station}
                className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-700"
                onPress={() => handleLineSelect(station)}
              >
                <Text className="text-white text-base">{station}</Text>
                {line === station && <Check color="#22c55e" size={20} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
