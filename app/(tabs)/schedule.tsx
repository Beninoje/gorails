import { ActivityIndicator, FlatList, Image, Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTripStore } from '@/store/useTripStore';
import { useFetchAllPlatforms, useFetchAllRides } from '@/lib/fetch';
import { formatCurrentTime, formatTomorrowTime } from '@/lib/utils';
import TripCard from '@/components/TripCard';
import ScheduleHeader from '@/components/header/ScheduleHeader';
import LoadingScreen from '@/components/loader/LoadingScreen';
import ScheduleTab from '@/components/header/ScheduleTab';
import DateBottomSheet from '@/components/DateDrawer';

export default function ScheduleScreen() {

    const { origin, destination, setTrip, line } = useTripStore();
    const [refreshing, setRefreshing] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(formatCurrentTime() as string)
    const { recentRides, error, loading, refetch } = useFetchAllRides(`https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=${origin}&toStop=${destination}&date=${selectedDate}`)
    const { platFormData } = useFetchAllPlatforms(`https://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/NextService/${destination}?key=${process.env.EXPO_PUBLIC_METRO_LINX_API_KEY}`)
    const [activeTab, setActiveTab] = useState('Today');
    const dateSheetRef = useRef<DateSheetRef>(null);
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
      switch (activeTab) {
        case "Tomorrow":
          setSelectedDate(formatTomorrowTime());
          break;
        case "Today":
          setSelectedDate(formatCurrentTime());
          break;
        case "Future":
          setSelectedDate(""); 
          dateSheetRef.current?.open();
          break;
      }
    }
  
    const handleCancelDateSelection = () => {
      setActiveTab("Today"); 
      setSelectedDate(formatCurrentTime());
    };

    useEffect(() => {
      refetch();
    }, [origin, destination,selectedDate]);
  return (

    <SafeAreaView className='flex-1 bg-green-700'>
      <ScheduleHeader onSwitch={handleSwitchAndRefresh} onRefresh={onRefresh}/>
      <View className="flex-1 bg-black ">
      <ScheduleTab setActive={handleHeaderTabChange} activeTab={activeTab} selectedDate={selectedDate}/>
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
                <View key={i} className=" mb-4 ">
                  {ride.railLines.map((trip, j) => (
                    <TripCard key={j} trip={trip} stops={trip.stops} duration={ride.duration} platforms={platFormData} />
                  ))}
                </View>
              ))
            )}
          </ScrollView>
          
          
      </View>
      
      
      <DateBottomSheet ref={dateSheetRef} onSelectDate={setSelectedDate} onCancel={handleCancelDateSelection}/>
    </SafeAreaView>

    
  );
}


