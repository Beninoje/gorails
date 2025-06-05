import React from 'react'
import { Text, View } from 'react-native'

type Trip = {
    departure: string;
    from: string;
    arrival: string;
    to: string;
  };
  
  type Props = {
    trip: Trip;
  };

const TripCard = ({trip}: Props) => {
  return (
    <View className='flex-row w-full justify-between rounded-xl py-3 px-5'>
        <View className='flex-col'>
            <Text className='text-white text-2xl'>
            {trip.departure}
            </Text>
            <Text className='text-zinc-500 text-lg'>
            {trip.from}
            </Text>
        </View>
        <View className='flex-col'>
            <Text className='text-white text-2xl'>
            {trip.arrival}
            </Text>
            <Text className='text-zinc-500 text-lg'>
            {trip.to}
            </Text>
        </View>
        
    </View>
  )
}

export default TripCard