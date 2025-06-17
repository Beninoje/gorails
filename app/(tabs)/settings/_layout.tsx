import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function SettingsLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#15803d" /> {/* bg-green-700 */}
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'Settings' }}
        />
        <Stack.Screen
          name="change-destination"
          options={{
            title: 'Change Destination',
            headerStyle: { backgroundColor: '#15803d' }, // Tailwind's bg-green-700
            headerTintColor: '#ffffff', // White back arrow and text
          }}
        />
        <Stack.Screen
          name="change-line"
          options={{
            title: 'Change Line',
            headerStyle: { backgroundColor: '#15803d' },
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="change-origin"
          options={{
            title: 'Change Origin',
            headerStyle: { backgroundColor: '#15803d' },
            headerTintColor: '#ffffff',
          }}
        />
      </Stack>
    </>
  );
}
