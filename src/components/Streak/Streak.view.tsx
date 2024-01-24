import React, { FC } from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
  Canvas,
  Circle,
  Group,
  Line,
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
  const spacing = 14;
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

  const fullStreak = !days.map(item => item.selected).includes(false);
  let x = w;
  const cy = r + fontSize + strokeWidth + 10;

  return (
    <View style={styles.container}>
      <Canvas style={{ width: 700, height: 100, flexDirection: 'row' }}>
        {fullStreak && (
          <Line
            p1={vec(r + strokeWidth / 2, cy)}
            p2={vec((r + strokeWidth) * 15, cy)}
            color="lightblue"
            style="stroke"
            strokeWidth={r * 2}
            strokeCap="round">
            <LinearGradient
              start={vec(r + strokeWidth / 2, cy)}
              end={vec((r + strokeWidth) * 15, cy)}
              colors={['#e336eb33', '#f66938ff']}
            />
          </Line>
        )}
        {days.map((day: StreakDay, i: number) => {
          const isCurrentDay = days.findLastIndex(item => item.selected) === i;

          x = i * w;
          const tx = x + r - font.measureText(day.shortName).width / 2 + 1;
          const cx = x + r + strokeWidth / 2;
          const ty = fontSize;

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
                    <Circle
                      cx={cx}
                      cy={cy}
                      r={isCurrentDay ? r - strokeWidth / 2 : r}
                      color="#c69">
                      {isCurrentDay && (
                        <Paint
                          color="#fff"
                          style="stroke"
                          strokeWidth={strokeWidth}
                        />
                      )}
                      <LinearGradient
                        start={vec(r, cy - r)}
                        end={vec(r, cy + r)}
                        colors={['#e336eb', '#e336eb', '#f66938', '#f66938']}
                      />
                    </Circle>
                    {fullStreak ? (
                      <Path
                        path="m 5.561319,21.272652 c -6.645634,-2.56579 -7.681363,-9.8917 -1.219681,-13.775207 0.233484,2.646707 0.618814,4.426447 2.905708,4.771107 C 10.491127,8.308732 7.599323,3.817087 5.633062,0 c 3.204749,1.494304 8.9952,3.846726 11.04887,9.542202 2.17277,8.09945 -3.82566,11.43731 -4.986342,11.29998 -0.384116,0.12829 5.400152,-4.55778 -0.143492,-10.83363 -0.03587,4.01777 -2.306228,7.27501 -3.085073,7.35395 -1.968685,0.19954 -4.519989,-2.90571 -4.519989,-2.90571 -0.372243,1.3565 -0.278555,4.14182 1.614283,6.81586 z"
                        color="#fff"
                        transform={[
                          { translateX: cx - 9 },
                          { translateY: cy - 11 },
                        ]}
                      />
                    ) : (
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
                    )}
                  </>
                ) : (
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={r + strokeWidth / 2}
                    color="#444951"
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
