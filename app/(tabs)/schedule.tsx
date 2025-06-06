import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCallback, useEffect, useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useFetch, useFetchAllRides } from '@/lib/fetch';
import { formatCurrentTime } from '@/lib/utils';
import TripCard from '@/components/TripCard';
import ScheduleHeader from '@/components/header/ScheduleHeader';
import LoadingScreen from '@/components/loader/LoadingScreen';
import ScheduleTab from '@/components/header/ScheduleTab';

export default function ScheduleScreen() {
    
    const { origin, destination } = useTripStore();
    const [refreshing, setRefreshing] = useState(false);
    const  { recentRides,error, loading, refetch } = useFetchAllRides(`https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=${origin}&toStop=${destination}&date=${formatCurrentTime()}`)
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refetch(); // make sure your hook exposes a refetch function
      setRefreshing(false);
    }, [refetch]);
  return (
    <SafeAreaView className='flex-1 bg-green-700'>
      <ScheduleHeader/>
      <View className="flex-1 bg-black ">
      <ScheduleTab/>
          <ScrollView 
          className="px-4" 
          contentContainerStyle={{ paddingBottom: 10}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
          }>
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


