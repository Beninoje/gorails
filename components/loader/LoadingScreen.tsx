import { useTripStore } from '@/store/useTripStore';
import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="w-full flex-1 h-full items-center justify-center bg-black">
      <ActivityIndicator size="large" color="#16a34a" />
    </View>
  );
}
