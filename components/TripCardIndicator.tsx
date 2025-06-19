import { Check } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

type Props = {}

const TripCardIndicator = (props: Props) => {
  return (
    <View className='flex justify-center items-center rounded-full w-7 h-7 border-2 border-zinc-500'>
        <Check color="#a1a1aa" className='text-zinc-400' size={15}/>
    </View>
  )
}

export default TripCardIndicator