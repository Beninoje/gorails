import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';

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

  return <Redirect href="/(onboarding)/onboardingSwiper" />;
}
