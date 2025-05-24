import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="onboardingSwiper" options={{ headerShown: false }} />
      {/* <Stack.Screen name="setline" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="setorigin" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="setdestination" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
