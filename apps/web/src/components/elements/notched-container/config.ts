import { NotchedContainerProps } from '.';

export const defaultNotchOptions = {
  depth: {
    min: '12px',
    max: '25px',
  },
  width: {
    min: '3px',
    max: '5px',
  },
  interval: {
    min: '6%',
    max: '17%',
  },
} as const satisfies NotchedContainerProps['notchOptions'];
