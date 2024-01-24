import { SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{ backgroundColor: '#0c121d', flex: 1 }}>
      <Streak data={oneDayStreak} />
      <Streak data={fourDayStreak} />
      <Streak data={sevenDayStreak} />
      <Streak data={nineDayStreak} />
    </SafeAreaView>
  );
}
