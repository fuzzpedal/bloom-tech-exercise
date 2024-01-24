import React, { FC } from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Paint,
  Path,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { StreakDay } from '../../types';

interface Props {
  days: StreakDay[];
}

export const StreakView: FC<Props> = ({ days }) => {
  const r = 20;
  const spacing = 15;
  const w = r * 2 + spacing;

  const strokeWidth = 3;

  const fontSize = 24;
  const font = useFont(
    require('../../assets/fonts/Roboto-Regular.ttf'),
    fontSize,
  );

  if (!font) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Canvas style={{ width: 700, height: 100, flexDirection: 'row' }}>
        {days.map((day: StreakDay, i: number) => {
          const x = i * w;
          const tx = x + r - font.measureText(day.shortName).width / 2 + 1;
          const cx = x + r + strokeWidth / 2;

          const ty = fontSize;
          const cy = r + fontSize + strokeWidth + 10;

          return (
            <Group key={day.fullName}>
              <Group>
                <Paint color="#fff" style="stroke" strokeWidth={strokeWidth} />
                <Text
                  x={tx}
                  y={ty}
                  text={day.shortName}
                  font={font}
                  color="#fff"
                />
              </Group>
              <Group>
                {day.selected ? (
                  <>
                    <Circle cx={cx} cy={cy} r={r} color="#c69">
                      <Paint
                        color="#fff"
                        style="stroke"
                        strokeWidth={strokeWidth}
                      />
                      <LinearGradient
                        start={vec(128, 0)}
                        end={vec(128, 100)}
                        colors={['#e336eb', '#e336eb', '#f66938', '#f66938']}
                      />
                    </Circle>
                    <Path
                      path={`
                        M ${cx - r / 2} ${cy}
                        L ${cx - r / 5} ${cy + r / 3}
                        L ${cx + r / 2.3} ${cy - r / 2.5}
                        `}
                      color="#fff"
                      style="stroke"
                      strokeJoin="round"
                      strokeWidth={3}
                      strokeCap="round"
                    />
                  </>
                ) : (
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={r + strokeWidth / 2}
                    color="#777"
                  />
                )}
              </Group>
            </Group>
          );
        })}
      </Canvas>
    </View>
  );
};
