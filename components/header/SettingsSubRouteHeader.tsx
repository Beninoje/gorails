import { useTripStore } from '@/store/useTripStore';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeftRight, ChevronLeft, RefreshCcw } from 'lucide-react-native';
import { router } from 'expo-router';
type Props = {
  label:string;
}

const SettingsSubRouteHeader = ({label}: Props) => {

  return (
    <View className="w-full py-3 px-8 flex-row justify-center items-center">
        <View className=''>
            <TouchableOpacity
            onPress={()=> router.push("/(tabs)/settings")}
            >
                <ChevronLeft/>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
        <Text className="text-white text-2xl font-bold text-center">
            {label}
        </Text>
    </View>
  )
}

export default SettingsSubRouteHeader