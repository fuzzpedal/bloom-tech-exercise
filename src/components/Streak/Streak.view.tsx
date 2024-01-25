import React, { FC } from 'react';
import { Dimensions, View, Text } from 'react-native';

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
  const windowWidth = Dimensions.get('window').width;

  const initialDelay = 0;
  const transitionTime = 1000;

  const r = 20;
  const strokeWidth = 3;
  const spacing = 14;
  const w = r * 2 + spacing;

  const isFullStreak = !days.map(item => item.selected).includes(false);
  const fullStreakLineXFrom = r * 2;
  const fullStreakLineXTo = windowWidth - r * 2;
  const fullStreakLineY = 20;

  let x = w;

  return (
    <View style={styles.container}>
      {isFullStreak && (
        <MotiView
          style={{
            flexDirection: 'row',
            position: 'absolute',
          }}
          from={{ left: windowWidth * -1, opacity: 0 }}
          animate={{ left: 0, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: transitionTime,
            delay: initialDelay,
          }}>
          <Canvas
            style={{
              width: windowWidth,
              height: r * 4,
              flexDirection: 'row',
              position: 'absolute',
              top: r / 2,
              left: 0,
            }}>
            <Line
              p1={vec(
                fullStreakLineXFrom,
                fullStreakLineY + r * 2 - strokeWidth,
              )}
              p2={vec(fullStreakLineXTo, fullStreakLineY + r * 2 - strokeWidth)}
              style="stroke"
              strokeWidth={r * 2}
              strokeCap="round">
              <LinearGradient
                start={vec(fullStreakLineXFrom, fullStreakLineY)}
                end={vec(fullStreakLineXTo, fullStreakLineY)}
                colors={[colours.purpleAlpha, colours.orangeAlpha]}
              />
            </Line>
          </Canvas>
        </MotiView>
      )}

      {days.map((day: StreakDay, i: number) => {
        const isCurrentDay = days.findLastIndex(item => item.selected) === i;

        return isCurrentDay || isFullStreak ? (
          <MotiView
            key={`${i}-${day.fullName}`}
            style={styles.streakItemContainer}
            from={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration: isFullStreak ? transitionTime / 7 : transitionTime,
              delay: isFullStreak
                ? initialDelay + i * (transitionTime / 7)
                : initialDelay,
            }}>
            <StreakItem
              isCurrentDay={isCurrentDay}
              isFullStreak={isFullStreak}
              selected={day.selected}
              shortName={day.shortName}
            />
          </MotiView>
        ) : (
          <View key={day.fullName} style={styles.streakItemContainer}>
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
