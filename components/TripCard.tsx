import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import StopItem from './StopItem';
import TripCardIndicator from './TripCardIndicator';
import { formatTripDuration } from '@/lib/utils';
import { useTripStore } from '@/store/useTripStore';

type Trip = {
  departure: string;
  from: string;
  arrival: string;
  to: string;
  transfers:number;
  duration:string;
  tripNumber:string;
};
type Platforms = {
  ActualPlatform:string;
  Linename:string;
  ScheduledPlatform:string;
  TripNumber:string;
};
type Stop = {
  name: string;
  time: string;
};

type Props = {
  trip: Trip;
  stops:Stop[];
  platforms: Platforms[];
  duration:string;
};

const TripCard = ({ trip,stops, platforms,duration }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { line } = useTripStore;

  console.log(trip)

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleCorrectPlatform = (platforms:Platforms[]) => {
      const platform = platforms.find(p => p.Linename === line && p.TripNumber === trip.tripNumber);
      return platform?.ActualPlatform  || platform?.ScheduledPlatform || 'TBD';
  }

  return (
    <Pressable onPress={toggleExpanded}>
      <View className={`flex-row items-center bg-zinc-800 ${expanded ? 'rounded-t-xl' : 'rounded-xl'}  py-3 px-5`}>
        <View className="w-4/5 flex-row justify-between gap-4">
          <View className="flex-col w-1/2">
            <Text className="text-white text-2xl truncate" >{trip.departure}</Text>
            <Text className="text-zinc-500 text-lg" numberOfLines={1}>{trip.from}</Text>
          </View>
          <View className="flex-col w-1/2">
            <Text className="text-white  text-2xl truncate" numberOfLines={1}>{trip.arrival}</Text>
            <Text className="text-zinc-500 text-lg" numberOfLines={1}>{trip.to}</Text>
          </View>
        </View>

        <View className="w-1/5 items-end">
          <TripCardIndicator trip={trip}/>
        </View>
      </View>

      {expanded && (
        <View className="bg-zinc-800 flex-col items-start gap-3 rounded-b-xl py-3 px-5">
          {/* {stops.map((stop:Stop,index: number)=>(
            <StopItem key={index} name={stop.name} time={stop.time} isLast={index === stops.length - 1}/>
          ))} */}
          <View className="w-4/5 flex-row justify-between gap-4">
          <View className="flex-col w-1/2 ">
            <Text className="text-white text-lg">On Time</Text>
            <Text className="text-zinc-500 text-lg">Expected</Text>
          </View>
          <View className="flex-col w-1/2">
            <Text className="text-white text-lg">{handleCorrectPlatform(platforms)}</Text>
            <Text className="text-zinc-500 text-lg">Platform</Text>
          </View>
        </View>
        <View className="w-4/5 flex-row justify-between gap-4">
          <View className="flex-col w-1/2">
            <Text className="text-white text-lg">{formatTripDuration(duration)}</Text>
            <Text className="text-zinc-500 text-lg">Duration</Text>
          </View>
          <View className="flex-col w-1/2">
            <Text className="text-white text-lg">{stops.length - 2}</Text>
            <Text className="text-zinc-500 text-lg">Stops</Text>
          </View>
        </View>

        </View>
      )}
    </Pressable>
  );
};

export default TripCard;
