import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import StopItem from './StopItem';
import TripCardIndicator from './TripCardIndicator';

type Trip = {
  departure: string;
  from: string;
  arrival: string;
  to: string;
};

type Stop = {
  name: string;
  time: string;
};

type Props = {
  trip: Trip;
  stops:Stop[];
};

const TripCard = ({ trip,stops }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <Pressable onPress={toggleExpanded}>
      <View className="flex-row items-center bg-zinc-800 rounded-xl py-3 px-5">
    {/* Trip Info: 75% */}
    <View className="w-3/4 flex-row justify-between gap-4">
      <View className="flex-col">
        <Text className="text-white text-2xl truncate">{trip.departure}</Text>
        <Text className="text-zinc-500 text-lg">{trip.from}</Text>
      </View>
      <View className="flex-col">
        <Text className="text-white text-2xl">{trip.arrival}</Text>
        <Text className="text-zinc-500 text-lg">{trip.to}</Text>
      </View>
    </View>

    {/* Indicator: 25% */}
    <View className="w-1/4 items-end">
      <TripCardIndicator />
    </View>
  </View>

      {expanded && (
        <View className="bg-zinc-900 rounded-b-xl flex-col justify-center">
          {stops.map((stop:Stop,index: number)=>(
            <StopItem key={index} name={stop.name} time={stop.time} isLast={index === stops.length - 1}/>
          ))}
        </View>
      )}
    </Pressable>
  );
};

export default TripCard;
