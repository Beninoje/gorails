import { useTripStore } from '@/store/useTripStore';
import React from 'react'
import { Text, View } from 'react-native'

type Props = {}

const ScheduleHeader = (props: Props) => {
  const { line } = useTripStore();
  return (
    <View className="w-full py-3">
    <Text className="text-white text-2xl font-bold text-center">{line}</Text>
  </View>
  )
}

export default ScheduleHeader