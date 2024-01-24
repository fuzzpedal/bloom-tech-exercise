import React, { FC } from 'react';
import { View } from 'react-native';
import {
  Canvas,
  Group,
  Line,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';

import { colours } from '../../design/colours';
import { StreakDay } from '../../types';
import { StreakItem } from './StreakItem';
import styles from './styles';

interface Props {
  days: StreakDay[];
}

export const StreakView: FC<Props> = ({ days }) => {
  const r = 20;
  const spacing = 14;
  const w = r * 2 + spacing;
  const cy = 20;
  const strokeWidth = 3;

  const isFullStreak = !days.map(item => item.selected).includes(false);
  let x = w;

  return (
    <View style={styles.container}>
      <Canvas style={{ width: 700, height: 100, flexDirection: 'row' }}>
        {isFullStreak && (
          <Line
            p1={vec(r + strokeWidth / 2, cy + r * 2 - strokeWidth)}
            p2={vec((r + strokeWidth) * 15, cy + r * 2 - strokeWidth)}
            style="stroke"
            strokeWidth={r * 2}
            strokeCap="round">
            <LinearGradient
              start={vec(r + strokeWidth / 2, cy)}
              end={vec((r + strokeWidth) * 15, cy)}
              colors={[colours.purpleAlpha, colours.orangeAlpha]}
            />
          </Line>
        )}
        {days.map((day: StreakDay, i: number) => {
          const isCurrentDay = days.findLastIndex(item => item.selected) === i;

          return (
            <Group
              key={day.fullName}
              transform={[
                { translateX: i * (r * 2 + spacing) + r },
                { translateY: 0 },
              ]}>
              <StreakItem
                isCurrentDay={isCurrentDay}
                isFullStreak={isFullStreak}
                selected={day.selected}
                shortName={day.shortName}
              />
            </Group>
          );
        })}
      </Canvas>
    </View>
  );
};
