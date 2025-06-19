import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Bell } from 'lucide-react-native';
import { useFetchAllAlerts } from '@/lib/fetch';

export default function TabLayout() {
  const { delayCount } = useFetchAllAlerts(`https://api.gotransit.com/v2/serviceupdate/en/all`);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5C8118',
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
          tabBarIcon: ({ color, size }) => (
            <View>
              <IconSymbol color={color} name="bell" size={size} />
              {delayCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -6,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    minWidth: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {delayCount}
                  </Text>
                </View>
              )}
            </View>
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
