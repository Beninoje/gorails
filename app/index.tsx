import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';
import { useTripStore } from '@/store/useTripStore';

export default function HomeScreen() {
  
  // const {origin, destination, line} = useTripStore()
  // if(origin && destination && line) return <Redirect href="/(tabs)/schedule" />;
  

  return <Redirect href="/(onboarding)/onboarding" />;
}
