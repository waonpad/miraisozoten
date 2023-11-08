export const getDimensionsLargeAndSmall = ({ width, height }: { width: number; height: number }) =>
  width > height
    ? ({ large: 'width', small: 'height' } as const)
    : ({ large: 'height', small: 'width' } as const);
