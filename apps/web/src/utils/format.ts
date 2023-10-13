import { InfiniteData } from '@tanstack/react-query';
import { default as dayjs } from 'dayjs';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');

export const formatInfiniteData = <T>(data: InfiniteData<[T[], unknown]> | undefined) => {
  return data?.pages?.map((page) => page[0]).flat() ?? [];
};
