import React, { FC } from 'react';
import { StreakView } from './Streak.view';
import { StreakData } from '../../types';

interface Props {
  data: StreakData;
}

const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const StreakController: FC<Props> = ({ data }) => {
  const getDays = (data: StreakData) => {
    const { streak } = data;
    if (streak.length === 0) {
      return [];
    }
    const numDays = streak.length % 7 || 7;
    const dates = streak.slice(streak.length - numDays);
    return dates.map((item: string) => dayLetters[new Date(item).getUTCDay()]);
  };

  console.log();

  return <StreakView days={getDays(data)} />;
};
