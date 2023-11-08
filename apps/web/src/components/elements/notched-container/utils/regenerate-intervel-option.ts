import { NotchedContainerProps } from '..';

import { calculateInterval } from './calculate-interval';
import { getDimensionsLargeAndSmall } from './get-dimmensions-large-and-small';

/**
 * 長い方の辺に、インターバルの数値だけ合わせる(インターバルは%なため)
 */
export const regenerateIntervalOption = ({
  intervalOption,
  targetDimension,
  containerDimensions,
}: {
  intervalOption: NonNullable<NotchedContainerProps['notchOptions']>['interval'];
  targetDimension: 'width' | 'height';
  containerDimensions: {
    width: number;
    height: number;
  };
}) => {
  const { large, small } = getDimensionsLargeAndSmall(containerDimensions);
  const regeneratedIntervalOption =
    large === targetDimension
      ? intervalOption
      : {
          min: calculateInterval(
            intervalOption.min,
            containerDimensions[large],
            containerDimensions[small]
          ),
          max: calculateInterval(
            intervalOption.max,
            containerDimensions[large],
            containerDimensions[small]
          ),
        };

  return regeneratedIntervalOption;
};
