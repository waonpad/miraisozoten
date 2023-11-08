import { Side } from '../types';

export const getTargetDimension = ({ side }: { side: Side }) =>
  (['top', 'bottom'] satisfies Side[]).some((s) => s === side)
    ? ({ targetDimension: 'width', verticalDimmension: 'height' } as const)
    : ({ targetDimension: 'height', verticalDimmension: 'width' } as const);
