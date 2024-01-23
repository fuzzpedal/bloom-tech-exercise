import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  days: string[];
}

export const StreakView: FC<Props> = ({ days }) => {
  return (
    <View style={styles.container}>
      {days.map((day: string) => (
        <Text key={day} style={styles.item}>
          {day[0]}
        </Text>
      ))}
    </View>
  );
};