import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const formatDateLabel = (date: string) => {
  if (!date) return 'Future';

  const [year, month, day] = date.split('-').map(Number);
  const d = new Date(year, month - 1, day); // Use local time

  const monthLabel = d.toLocaleString('en-US', { month: 'short' });
  const dayLabel = d.getDate();

  return `${monthLabel} ${dayLabel}`;
};

type Props = {
  setActive: (tab: string) => void;
  activeTab: string;
  selectedDate: string;
};

const ScheduleTab = ({ setActive, activeTab, selectedDate }: Props) => {
  const tabLabels = ['Today', 'Tomorrow', 'Future'];

  return (
    <View className="w-full px-10 py-2">
      <View className="flex-row bg-zinc-800 p-1 rounded-lg">
        {tabLabels.map((tab, index) => {
          // For the "Future" tab, override label if a date is selected and tab is active
          const label =
            tab === 'Future' && selectedDate && activeTab === 'Future'
              ? formatDateLabel(selectedDate)
              : tab;

          const isActive = tab === activeTab;

          return (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-1 rounded-lg items-center ${
                isActive ? 'bg-zinc-500' : ''
              }`}
              onPress={() => setActive(tab)}
            >
              <Text className="text-sm font-semibold text-white">
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ScheduleTab;
