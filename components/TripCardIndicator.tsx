import { Check } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

type Trip = {
  departure: string;
  from: string;
  arrival: string;
  to: string;
};
type Props = {
  trip:Trip
}

const TripCardIndicator = ({trip}: Props) => {

  const [highlight,setHighlight] = useState(false)

  useEffect(()=>{
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    if(currentTime > trip.departure)
    {
      setHighlight(true)
    }
  },[trip.departure]);

  
  return (
    <View className={`flex justify-center items-center rounded-full w-7 h-7 border-2  ${highlight ? 'bg-green-700 border-green-700': ' border-zinc-500'}`}>
        <Check color={highlight ? 'white': '#a1a1aa'}  size={15}/>
    </View>
  )
}

export default TripCardIndicator