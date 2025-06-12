import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { act, use, useCallback, useEffect, useRef, useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useFetch, useFetchAllRides } from '@/lib/fetch';
import { formatCurrentTime, formatTomorrowTime } from '@/lib/utils';
import TripCard from '@/components/TripCard';
import ScheduleHeader from '@/components/header/ScheduleHeader';
import LoadingScreen from '@/components/loader/LoadingScreen';
import ScheduleTab from '@/components/header/ScheduleTab';
import DateDrawer from '@/components/DateDrawer';
import DateBottomSheet from '@/components/DateDrawer';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ScheduleScreen() {
    
    const { origin, destination, setTrip, line } = useTripStore();
    const [refreshing, setRefreshing] = useState(false);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { dismiss } =useBottomSheetModal();
    const [ selectedDate, setSelectedDate ] = useState(formatCurrentTime() as string)
    const  { recentRides, error, loading, refetch } = useFetchAllRides(`https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=${origin}&toStop=${destination}&date=${selectedDate}`)
    const [activeTab, setActiveTab] = useState('Today');

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }, [refetch]);

    const handleSwitchAndRefresh = () => {
      setTrip({ origin: destination, destination: origin, line });
    };

    const handleHeaderTabChange = async (activeTab:string) => {
      setActiveTab(activeTab);
      if(activeTab === "Tomorrow")
      {
        setSelectedDate(formatTomorrowTime());
      }
      else if(activeTab === "Today")
      {
        setSelectedDate(formatCurrentTime());
      }
      else
      {
        bottomSheetRef.current?.present();
      }
    }

    useEffect(() => {
      refetch();
    }, [origin, destination,selectedDate]);
  return (

    <SafeAreaView className='flex-1 bg-green-700'>
      <ScheduleHeader onSwitch={handleSwitchAndRefresh} onRefresh={onRefresh}/>
      <View className="flex-1 bg-black ">
      <ScheduleTab setActive={handleHeaderTabChange} activeTab={activeTab}/>
          <ScrollView 
          className="px-4" 
          contentContainerStyle={{ paddingBottom: 10}}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="white" 
            />
          }>
            {loading ? (
              <LoadingScreen/>
            ) : recentRides.length ===  0 ? (
              <Text className="text-white text-center pt-4">No recent rides found.</Text>
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
      <DateBottomSheet ref={bottomSheetRef} />
      
    </SafeAreaView>

    
  );
}


