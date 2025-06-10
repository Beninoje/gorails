import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const tabs = ['Today', 'Tomorrow', 'Future'];

type Props = {
  setActive: (tab:string)=> void
  activeTab:string;
}

const ScheduleTab = ({setActive,activeTab}:Props) => {

  return (
    <View className="w-full px-10 py-2">
      <View className="flex-row bg-zinc-800 p-1 rounded-lg">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-1 rounded-lg items-center ${
                isActive ? 'bg-zinc-500' : ''
              }`}
              onPress={() => setActive(tab)}
            >
              <Text className={`text-sm font-semibold text-white`}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ScheduleTab;
