import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

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
import TripCard from '@/components/TripCard';
import ScheduleHeader from '@/components/header/ScheduleHeader';
import LoadingScreen from '@/components/loader/LoadingScreen';

export default function ScheduleScreen() {
    
    const { origin, destination } = useTripStore();
    const  { recentRides,error, loading } = useFetchAllRides(`https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=${origin}&toStop=${destination}&date=${formatCurrentTime()}`)

  return (
    <SafeAreaView className='flex-1 bg-green-700'>
      <ScheduleHeader/>
      
      <View className="flex-1 bg-black ">
          <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 10, paddingTop: 10 }}>
            {loading ? (
              <LoadingScreen/>
            ) : recentRides.length === 0 ? (
              <Text className="text-white">No recent rides found.</Text>
            ) : (
              recentRides.map((ride, i) => (
                <View key={i} className="bg-zinc-900 mb-4 rounded-xl">
                  {ride.railLines.map((trip, j) => (
                    <TripCard key={j} trip={trip} />
                  ))}
                </View>
              ))
            )}
          </ScrollView>
      </View>
      
    </SafeAreaView>
  );
}


