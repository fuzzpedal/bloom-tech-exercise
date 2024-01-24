import { SafeAreaView, Text } from 'react-native';
import { Streak } from './src/components/Streak';
import {
  fourDayStreak,
  nineDayStreak,
  oneDayStreak,
  sevenDayStreak,
} from './src/data/dummyData';

export default function App() {
  const r = 10;
  return (
    <SafeAreaView style={{ backgroundColor: '#444', flex: 1 }}>
      <Text style={{ color: '#fff' }}>Bloom Test Exercise</Text>

      <Streak data={oneDayStreak} />
      <Streak data={fourDayStreak} />
      <Streak data={sevenDayStreak} />
      <Streak data={nineDayStreak} />
    </SafeAreaView>
  );
}
