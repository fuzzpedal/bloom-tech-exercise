import React, { FC } from 'react';
import { StreakView } from './Streak.view';
import { RawStreakData, StreakDay } from '../../types';
import { View } from 'react-native';

interface Props {
  data: RawStreakData;
}

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const StreakController: FC<Props> = ({ data }) => {
  const getDays = (data: RawStreakData): StreakDay[] => {
    const { streak } = data;
    if (streak.length === 0) {
      return [];
    }
    const numDays = streak.length % 7 || 7;
    const dates = streak.slice(streak.length - numDays);
    const days = dates.map((item: string) => {
      const name = dayNames[new Date(item).getUTCDay()];
      return { fullName: name, shortName: name[0], selected: true };
    });

    const remainingDays = 7 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      let lastDayIndex = dayNames.indexOf(days[days.length - 1].fullName) + 1;
      if (lastDayIndex === 7) {
        lastDayIndex = 0;
      }
      const d: StreakDay = {
        fullName: dayNames[lastDayIndex],
        shortName: dayNames[lastDayIndex][0],
        selected: false,
      };
      days.push(d);
    }

    return days;
  };

  console.log(getDays(data));

  return <StreakView days={getDays(data)} />;
};
