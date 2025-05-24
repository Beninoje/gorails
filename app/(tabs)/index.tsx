import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [trainTrips, setTrainTrips] = useState([]);

  useEffect(() => {
    const fetchTrainData = async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0] + '_06-00';

      const url = `https://api.gotransit.com/v2/tripplanner/search?DateType=DEPARTURE&Date=${formattedDate}&Page=1&PageLimit=3&DepartureTripPointId=75276&DepartureTypeId=4&ArrivalTripPointId=75749&ArrivalTypeId=4`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setTrainTrips(data?.Trips?.items || []);
      } catch (error) {
        console.error('Failed to fetch GO Train data:', error);
      }
    };

    fetchTrainData();
  }, []);

  const formatTime = (rawTime) => {
    if (!rawTime) return '';
    const [date, time] = rawTime.split(' ');
    const [day, month, year] = date.split('/');
    const isoString = `${year}-${month}-${day}T${time}`;
    const dateObj = new Date(isoString);
    return dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{ height: 178, width: 290, position: 'absolute', bottom: 0, left: 0 }}
        />
      }>
      <ThemedView className="flex-row items-center space-x-2">
        <Text className="text-red-500 text-lg font-bold">HELLO</Text>
        <HelloWave />
      </ThemedView>

      <ThemedView className="mt-6 space-y-4">
        <ThemedText type="subtitle">GO Train Trips</ThemedText>

        {trainTrips.length === 0 ? (
          <Text className="text-center text-gray-500">Loading trips...</Text>
        ) : (
          trainTrips.map((trip, index) => {
            const section = trip?.sectionDetails?.SectionDetail?.[0];

            return (
              <View
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md space-y-2"
              >
                <Text className="text-base text-gray-800 dark:text-gray-200">
                  {section?.DepartureStopName} ({formatTime(section?.DepartureTime)}) →{' '}
                  {section?.ArrivalStopName} ({formatTime(section?.ArrivalTime)})
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Line: {section?.LineName} ({section?.LineNumber})
                </Text>
              </View>
            );
          })
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}
