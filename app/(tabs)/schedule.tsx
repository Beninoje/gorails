import { Image } from 'expo-image';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useFetch, useFetchAllRides } from '@/lib/fetch';
import { formatCurrentTime } from '@/lib/utils';

export default function ScheduleScreen() {
    
    // const { origin, destination, line } = useTripStore();
    const  { recentRides } = useFetchAllRides(`https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=AD&toStop=UN&date=${formatCurrentTime()}`)

    


  
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-col gap-3 px-4'>

      
      {recentRides.map((item)=>(

        <View className='bg-zinc-900 '>
        {item.railLines.map((rail)=>(
          <View className='flex-row w-full justify-between rounded-xl py-3 px-5'>
            <View className='flex-col'>
              <Text className='text-white text-lg'>
                {rail.departure}
              </Text>
              <Text className='text-zinc-500'>
                {rail.from}
              </Text>
            </View>
            <View className='flex-col'>
              <Text className='text-white text-lg'>
                {rail.arrival}
              </Text>
              <Text className='text-zinc-500'>
                {rail.to}
              </Text>
            </View>
            
          </View>
        ))}
        </View>
        
      ))}
      </View>
      
    </SafeAreaView>
  );
}


