import { STATION_BY_LINE } from '@/lib/utils';
import { useTripStore } from '@/store/useTripStore';
import { Check } from 'lucide-react-native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function ChangeDestination() {

  const { setTrip, originName, origin, destination, destinationName,line } = useTripStore();
  const currentStations = STATION_BY_LINE[line] || [];
    return (
      <SafeAreaView className="flex-1 bg-green-700">
        <View className="flex-1 bg-black">
          <View className="">
            <View className="bg-black rounded-md ">
              {currentStations.map((station:any) => (
                <TouchableOpacity
                  key={station.code}
                  className={`flex-row items-center justify-between px-4 py-4 border-b border-zinc-700 
                  `}
                  onPress={() => setTrip({
                    destination:station.code,
                    destinationName:station.name,
                  })}
                  disabled={originName === station.name}
                >
                  <Text className={`${originName === station.name ? 'text-zinc-500' : 'text-white'}  text-base`}>{station.name}</Text>
                  {destinationName === station.name && (
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
