// app/settings/add-origin.tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Check } from 'lucide-react-native';

const GO_LINES = [
  'Barrie',
  'Kitchener',
  'Lakeshore East',
  'Lakeshore West',
  'Milton',
  'Richmond Hill',
  'Stouffville',
];

export default function ChangeLine() {
  const [selectedLine, setSelectedLine] = useState<string | null>('Barrie'); // default

  return (
    <SafeAreaView className="flex-1 bg-green-700">
      <View className="flex-1 bg-black">
        <View className="">

          <View className="bg-black  rounded-md ">
            {GO_LINES.map((line) => (
              <TouchableOpacity
                key={line}
                className="flex-row items-center justify-between px-4 py-4 border-b border-zinc-700"
                onPress={() => setSelectedLine(line)}
              >
                <Text className="text-white text-base">{line}</Text>
                {selectedLine === line && <Check color="#22c55e" size={20} />} {/* Green check */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
