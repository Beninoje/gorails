import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5C8118', // green when active
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarLabelStyle: {
          fontSize: 12, // increase label size
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
