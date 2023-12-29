import { InfiniteData } from '@tanstack/react-query';
import { default as dayjs } from 'dayjs';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format('YYYY/MM/DD hh:mm');

export const millisecondsToHms = (milliseconds: number) => {
  const seconds = milliseconds / 1000;
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const secondsRemainder = seconds % 60;

  const hoursString = Math.floor(hours).toString().padStart(2, '0');
  const minutesString = Math.floor(minutes).toString().padStart(2, '0');
  const secondsString = Math.floor(secondsRemainder).toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
};

export const formatInfiniteData = <T>(data: InfiniteData<[T[], unknown]> | undefined) => {
  return data?.pages?.map((page) => page[0]).flat() ?? [];
};
