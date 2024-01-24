import React, { FC } from 'react';

import { RawStreakData, StreakDay } from '../../types';
import { StreakView } from './Streak.view';

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

    // get the number of streak days since the last 7-day streak
    const numDays = streak.length ? streak.length % 7 || 7 : 0;

    // get the dates that correspond to those streak days
    const dates = streak.slice(streak.length - numDays);

    const days = dates.map((item: string) => {
      const name = dayNames[new Date(item).getUTCDay()];
      return { fullName: name, shortName: name[0], selected: true };
    });

    // add the non-streak days
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

  return <StreakView days={getDays(data)} />;
};
