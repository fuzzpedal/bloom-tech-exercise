import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { Streak } from './src/components/Streak';
import {
  fourDayStreak,
  nineDayStreak,
  oneDayStreak,
  sevenDayStreak,
} from './src/data/dummyData';
import { useState } from 'react';
import styles from './styles';

export default function App() {
  const [index, setIndex] = useState<number>(0);
  const datasets = [oneDayStreak, fourDayStreak, sevenDayStreak, nineDayStreak];

  const next = () => {
    if (index === datasets.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>
        {datasets[index].streak.length}-day streak
      </Text>
      <Streak data={datasets[index]} />
      <TouchableOpacity onPress={next} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
