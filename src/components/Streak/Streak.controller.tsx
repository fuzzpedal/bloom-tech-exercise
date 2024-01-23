import React, { FC } from 'react';
import { StreakView } from './Streak.view';
import { StreakData } from '../../types';

interface Props {
  data: StreakData;
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
  const getDays = (data: StreakData) => {
    const { streak } = data;
    if (streak.length === 0) {
      return [];
    }
    const numDays = streak.length % 7 || 7;
    const dates = streak.slice(streak.length - numDays);
    return dates.map((item: string) => dayNames[new Date(item).getUTCDay()]);
  };

  console.log();

  return <StreakView days={getDays(data)} />;
};
