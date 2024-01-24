import { SafeAreaView } from 'react-native';
import { Streak } from './src/components/Streak';
import {
  fourDayStreak,
  nineDayStreak,
  oneDayStreak,
  sevenDayStreak,
} from './src/data/dummyData';
import { colours } from './src/design/colours';

export default function App() {
  return (
    <SafeAreaView style={{ backgroundColor: colours.nearBlack, flex: 1 }}>
      <Streak data={oneDayStreak} />
      <Streak data={fourDayStreak} />
      <Streak data={sevenDayStreak} />
      <Streak data={nineDayStreak} />
    </SafeAreaView>
  );
}
