import { useState } from 'react';

import { cn } from 'ui/lib/utils';

export type ImageBgButtonProps = {
  imagePath: string;
  hoverImagePath?: string;
  selectedImagePath?: string;
  disabledImagePath?: string;
  selected?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ImageBgButton = ({
  imagePath,
  hoverImagePath,
  selectedImagePath,
  disabledImagePath,
  selected,
  disabled,
  ...props
}: ImageBgButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      {...props}
      style={{
        backgroundImage:
          // disabledフラグがtrueでその時用の画像がある場合はdisabled時の画像を表示
          disabled && disabledImagePath
            ? `url(${disabledImagePath})`
            : // 選択フラグがtrueでその時用の画像がある場合は選択時の画像を表示
            selected && selectedImagePath
            ? `url(${selectedImagePath})`
            : // hoverされていて、かつhover時の画像がある場合はhover時の画像を表示
            isHover && hoverImagePath
            ? `url(${hoverImagePath})`
            : // それ以外は通常の画像を表示
              `url(${imagePath})`,
        ...props.style,
      }}
      className={cn(
        `${
          // disabledフラグがtrueでその時用の画像がある場合はdisabled時の画像を表示
          disabled && disabledImagePath
            ? 'cursor-default'
            : // 選択フラグがtrueでその時用の画像がある場合は選択時の画像を表示
            selected && selectedImagePath
            ? 'cursor-pointer'
            : // hoverされていて、かつhover時の画像がある場合はhover時の画像を表示
            isHover && hoverImagePath
            ? 'cursor-pointer'
            : // それ以外は通常の画像を表示
              'cursor-pointer'
        } flex items-center justify-center bg-transparent bg-[length:100%_100%]`,
        props.className
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {props.children}
    </button>
  );
};
