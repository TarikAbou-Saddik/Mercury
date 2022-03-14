import { TimeOfDay } from './global/types';

export const getRandomNumber = (ceiling: number): number =>
  Math.floor(Math.random() * ceiling);

export const getInfoByTimeOfDay = (callback: (type: TimeOfDay) => any) => {
  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  if (isMorning) {
    return callback('Morning');
  }
  if (isAfternoon) {
    return callback('Afternoon');
  }
  return callback('Evening');
};
