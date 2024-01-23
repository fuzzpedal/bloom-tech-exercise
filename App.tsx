import { SafeAreaView, Text } from 'react-native';
import { Streak } from './src/components/Streak';
import {
  fourDayStreak,
  nineDayStreak,
  oneDayStreak,
  sevenDayStreak,
} from './src/data/dummyData';

export default function App() {
  return (
    <SafeAreaView>
      <Text>Bloom Text Exercise</Text>

      <Streak data={oneDayStreak} />
      <Streak data={fourDayStreak} />
      <Streak data={sevenDayStreak} />
      <Streak data={nineDayStreak} />
    </SafeAreaView>
  );
}
