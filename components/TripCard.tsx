import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import StopItem from './StopItem';

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
      <View className="flex-row w-full justify-between rounded-xl py-3 px-5 bg-zinc-800">
        <View className="flex-col">
          <Text className="text-white text-2xl">{trip.departure}</Text>
          <Text className="text-zinc-500 text-lg">{trip.from}</Text>
        </View>
        <View className="flex-col">
          <Text className="text-white text-2xl">{trip.arrival}</Text>
          <Text className="text-zinc-500 text-lg">{trip.to}</Text>
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
