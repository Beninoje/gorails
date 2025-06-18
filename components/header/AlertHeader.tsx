import { useTripStore } from '@/store/useTripStore';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeftRight, RefreshCcw } from 'lucide-react-native';
type Props = {
  label:string;
}

const AlertHeader = ({label}: Props) => {

  return (
    <View className="w-full py-3 px-8 flex-row justify-center items-center">
      <Text className="text-white text-2xl font-bold text-center">
        {label}
      </Text>
    </View>
  )
}

export default AlertHeader