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

export default function ScheduleScreen() {
    const [trainTrips, setTrainTrips] = useState([]);
    const { origin, destination, line } = useTripStore();
  useEffect(() => {
    const fetchTrainData = async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0] + '_06-00';

      // const url = `https://api.gotransit.com/v2/tripplanner/search?DateType=DEPARTURE&Date=${formattedDate}&Page=1&PageLimit=3&DepartureTripPointId=75276&DepartureTypeId=4&ArrivalTripPointId=75749&ArrivalTypeId=4`;
      const url = `https://api.gotransit.com/v2/schedules/en/timetable/all?fromStop=AD&toStop=UN&date=${formatCurrentTime()}`
      try {
        const response = await fetch(url);
        
        const data = await response.json();
        const railTrips=[];
        data.trips.forEach(trip => {
          const railLines = trip.lines.filter(line => line.transitType === 1);
          
          if (railLines.length > 0) {
            railTrips.push({
              departureTime: trip.departureTimeDisplay,
              arrivalTime: trip.arrivalTimeDisplay,
              duration: trip.duration,
              railLines: railLines.map(line => ({
                tripNumber: line.tripNumber,
                from: line.fromStopDisplay.slice(0,-3),
                to: line.toStopDisplay,
                departure: line.fromStopTime,
                arrival: line.toStopTime,
                stops: line.stops.map(stop => ({
                  name: stop.name,
                  code: stop.code,
                  time: stop.time
                }))
              }))
            });
          }
        });
        console.log(JSON.stringify(railTrips, null, 2));

        setTrainTrips(railTrips);
      } catch (error) {
        console.error('Failed to fetch GO Train data:', error);
      }
    };

    fetchTrainData();
  }, []);

  const formatCurrentTime = () => {
    const now = new Date();
    // For todays schedule
    now.setDate(now.getDate());

    // Set to specific hour and minute if needed (e.g., 6:00 AM)
    now.setHours(6);
    now.setMinutes(0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-col gap-3 px-4'>

      
      {trainTrips.map((item)=>(

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


