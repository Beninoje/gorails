import React from 'react'
import { Text, View } from 'react-native'

type Props = {
    name: string;
    time: string;
    isLast?:boolean;
}

const StopItem = ({name,time,isLast}: Props) => {
  return (
    <View className={` ${isLast ? '': ' border-b border-zinc-700'}`}>
        <View className='flex-row justify-between items-center px-3 py-3'>
            <Text className='text-white text-lg'>
            {name}
            </Text>
            <Text className='text-white text-lg'>
            {time}
            </Text>
        </View>
    </View>
  )
}

export default StopItem