import { useTripStore } from '@/store/useTripStore';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeftRight, RefreshCcw } from 'lucide-react-native';
type Props = {
  onSwitch: () => void;
  onRefresh: () => void;
}

const ScheduleHeader = ({onSwitch,onRefresh}: Props) => {
  const { line } = useTripStore();

  return (
    <View className="w-full py-3 px-8 flex-row justify-between items-center">
      <View className="text-white text-2xl font-bold text-center">
        <TouchableOpacity onPress={onSwitch}>
          <ArrowLeftRight color="white"/>
        </TouchableOpacity>
      </View>
      <Text className="text-white text-2xl font-bold text-center">
        {line}
      </Text>
      <TouchableOpacity onPress={onRefresh}>
          <RefreshCcw color="white"/>
      </TouchableOpacity>
    </View>
  )
}

export default ScheduleHeader