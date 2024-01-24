import React, { FC } from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
  Canvas,
  Circle,
  Group,
  Paint,
  Text,
  useFont,
} from '@shopify/react-native-skia';

interface Props {
  days: string[];
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
        {days.map((day: string, i: number) => {
          const text = day[0];

          const x = i * w;
          const tx = x + r - font.measureText(text).width / 2 + 1;
          const cx = x + r + strokeWidth / 2;

          const ty = fontSize;
          const cy = r + fontSize + strokeWidth + 10;

          return (
            <Group key={day}>
              <Group>
                <Paint color="#fff" style="stroke" strokeWidth={strokeWidth} />
                <Text x={tx} y={ty} text={text} font={font} color="#fff" />
              </Group>
              <Group>
                <Circle cx={cx} cy={cy} r={r} color="#c69">
                  <Paint
                    color="#fff"
                    style="stroke"
                    strokeWidth={strokeWidth}
                  />
                </Circle>
              </Group>
            </Group>
          );
        })}
      </Canvas>
    </View>
  );
};
