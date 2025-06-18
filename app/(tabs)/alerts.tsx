import AlertHeader from '@/components/header/AlertHeader';
import LoadingScreen from '@/components/loader/LoadingScreen';
import { useFetchAllAlerts } from '@/lib/fetch';
import { useCallback, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';

export default function AlertsScreen() {
  const { alertData, error, loading, refetch } = useFetchAllAlerts(`https://api.gotransit.com/v2/serviceupdate/en/all`);
const [refreshing, setRefreshing] = useState(false);
  const delayAlerts = alertData.filter((alert) => {
    return (
      alert.Status !== "On-Time" ||
      alert.SaagNotifications?.SaagNotification?.length > 0
    );
  });

  const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
      }, [refetch]);
  

  return (
    <SafeAreaView className='flex-1 bg-green-700'>
      <AlertHeader label='Alerts' />
      <View className="flex-1 bg-black p-4">
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
        ) : delayAlerts.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg text-center">There are no delays!</Text>
          </View>
        ) : (
          delayAlerts.map((alert, index) => (
            <View
              key={index}
              className='mb-3 p-3 rounded-xl'
              style={{ backgroundColor: alert.LineColour || '#222' }}
            >
              <Text className='text-white font-semibold text-lg'>
                {alert.CorridorName}
              </Text>
              <Text className='text-yellow-300'>
                Status: {alert.Status}
              </Text>
              {alert.SaagNotifications?.SaagNotification?.map((note, idx) => (
                <View key={idx} className='mt-1'>
                  <Text className='text-white'>Trip: {note.TripNumbers?.[0]}</Text>
                  <Text className='text-red-400'>Reason: {note.DelayReason}</Text>
                  <Text className='text-zinc-300'>Delay: {note.DelayDuration}</Text>
                  <Text className='text-zinc-400 text-sm'>
                    From: {note.HeadSign}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}

                  </ScrollView>
        
      </View>
    </SafeAreaView>
  );
}
