import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';

import { MotiView } from 'moti';
import { Canvas, Line, LinearGradient, vec } from '@shopify/react-native-skia';

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

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {isFullStreak && (
        <Canvas
          style={{
            width: windowWidth,
            height: r * 4,
            flexDirection: 'row',
            position: 'absolute',
            top: r / 2,
            left: r / 2 - strokeWidth,
          }}>
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
        </Canvas>
      )}
      {days.map((day: StreakDay, i: number) => {
        const isCurrentDay = days.findLastIndex(item => item.selected) === i;

        return isCurrentDay ? (
          <MotiView
            key={day.fullName}
            style={styles.thing}
            from={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration: 1000,
            }}>
            <StreakItem
              isCurrentDay={isCurrentDay}
              isFullStreak={isFullStreak}
              selected={day.selected}
              shortName={day.shortName}
            />
          </MotiView>
        ) : (
          <View key={day.fullName} style={styles.thing}>
            <StreakItem
              isCurrentDay={isCurrentDay}
              isFullStreak={isFullStreak}
              selected={day.selected}
              shortName={day.shortName}
            />
          </View>
        );
      })}
    </View>
  );
};
