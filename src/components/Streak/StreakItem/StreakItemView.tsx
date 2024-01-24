import {
  Circle,
  Group,
  LinearGradient,
  Paint,
  Path,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import React, { FC } from 'react';
import { colours } from '../../../design/colours';

interface Props {
  isCurrentDay: boolean;
  isFullStreak: boolean;
  shortName: string;
  selected: boolean;
}

export const StreakItemView: FC<Props> = ({
  isCurrentDay,
  isFullStreak,
  selected,
  shortName,
}) => {
  const strokeWidth = 3;
  const r = 20;
  const spacing = 14;
  const w = r * 2 + spacing;

  const fontSize = 24;
  const font = useFont(
    require('../../../assets/fonts/Roboto-Regular.ttf'),
    fontSize,
  );

  if (!font) {
    return <Circle cx={0} cy={0} r={0} />;
  }

  const cx = 0;
  const cy = r + fontSize + strokeWidth + 10;
  const tx = 0 - font.measureText(shortName).width / 2 + 1;
  const ty = 20;

  return (
    <>
      {selected ? (
        <>
          <Group>
            <Circle cx={cx} cy={cy} r={isCurrentDay ? r - strokeWidth / 2 : r}>
              {isCurrentDay && (
                <Paint
                  color={colours.white}
                  style="stroke"
                  strokeWidth={strokeWidth}
                />
              )}
              <LinearGradient
                start={vec(r, cy - r)}
                end={vec(r, cy + r)}
                colors={[
                  colours.purple,
                  colours.purple,
                  colours.orange,
                  colours.orange,
                ]}
              />
            </Circle>
            {isFullStreak ? (
              <Path
                path="m 5.561319,21.272652 c -6.645634,-2.56579 -7.681363,-9.8917 -1.219681,-13.775207 0.233484,2.646707 0.618814,4.426447 2.905708,4.771107 C 10.491127,8.308732 7.599323,3.817087 5.633062,0 c 3.204749,1.494304 8.9952,3.846726 11.04887,9.542202 2.17277,8.09945 -3.82566,11.43731 -4.986342,11.29998 -0.384116,0.12829 5.400152,-4.55778 -0.143492,-10.83363 -0.03587,4.01777 -2.306228,7.27501 -3.085073,7.35395 -1.968685,0.19954 -4.519989,-2.90571 -4.519989,-2.90571 -0.372243,1.3565 -0.278555,4.14182 1.614283,6.81586 z"
                color={colours.white}
                transform={[{ translateX: cx - 9 }, { translateY: cy - 11 }]}
              />
            ) : (
              <Path
                path={`
            M ${cx - r / 2} ${cy}
            L ${cx - r / 5} ${cy + r / 3}
            L ${cx + r / 2.3} ${cy - r / 2.5}
            `}
                color={colours.white}
                style="stroke"
                strokeJoin="round"
                strokeWidth={strokeWidth}
                strokeCap="round"
              />
            )}
          </Group>
          <Group>
            <Paint
              color={colours.white}
              style="stroke"
              strokeWidth={strokeWidth}
            />
          </Group>
        </>
      ) : (
        <Circle
          cx={cx}
          cy={cy}
          r={r + strokeWidth / 2}
          color={colours.greyDark}
        />
      )}
      <Text x={tx} y={ty} text={shortName} font={font} color={colours.white} />
    </>
  );
};
