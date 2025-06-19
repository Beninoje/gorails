import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import NormalHeader from '@/components/header/AlertHeader';
import { useTripStore } from '@/store/useTripStore';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const { setTrip, line, originName,destinationName } = useTripStore();
  return (
    <SafeAreaView className='flex-1 bg-green-700'>
      <NormalHeader label='Settings'/>
      <View className="flex-1 bg-black ">
        <View className='py-6'>
          <Text className='text-zinc-400 uppercase px-6'>Current Schedule</Text>
          <View className='bg-zinc-800 mt-2'>
           {/*======== LINE ========*/}
          <View className=''>
            <TouchableOpacity 
            className='w-full flex-row items-center px-6 py-3 justify-between'
            onPress={()=> router.push('/(tabs)/settings/change-line')}>
              <Text className='text-white text-xl'>Line</Text>
              <View className='flex-row items-center gap-2'>
                <Text className='text-zinc-100 text-lg'>{line}</Text>
                <ChevronRight color="#a1a1aa" size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/*======== ORIGIN ========*/}
          <View className='border-t border-zinc-700 '>
            <TouchableOpacity 
            className='w-full flex-row items-center px-6 py-3 justify-between'
            onPress={()=> router.push('/(tabs)/settings/change-origin')}>
              <Text className='text-white text-xl'>Origin</Text>
              <View className='flex-row items-center gap-2'>
                <Text className='text-zinc-100 text-lg'>{originName}</Text>
                <ChevronRight color="#a1a1aa" size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/*======== DESTINATION ========*/}
          <View className='border-t border-zinc-700 '>
            <TouchableOpacity 
            className='w-full flex-row items-center px-6 py-3 justify-between'
            onPress={()=> router.push('/(tabs)/settings/change-destination')}>
              <Text className='text-white text-xl'>Destination</Text>
              <View className='flex-row items-center gap-2'>
                <Text className='text-zinc-100 text-lg'>{destinationName}</Text>
                <ChevronRight color="#a1a1aa" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </View>
          
          
          
      </View>
      
      
      
    </SafeAreaView>
  );
}


