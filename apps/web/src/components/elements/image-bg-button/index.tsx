import { useState } from 'react';

export type ImageBgButtonProps = {
  imagePath: string;
  hoverImagePath?: string;
  selectedImagePath?: string;
  isSelected?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ImageBgButton = ({
  imagePath,
  hoverImagePath,
  selectedImagePath,
  isSelected,
  ...props
}: ImageBgButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      {...props}
      style={{
        backgroundImage:
          // 選択フラグがtrueでその時用の画像がある場合は選択時の画像を表示
          isSelected && selectedImagePath
            ? `url(${selectedImagePath})`
            : // hoverされていて、かつhover時の画像がある場合はhover時の画像を表示
            isHover && hoverImagePath
            ? `url(${hoverImagePath})`
            : // それ以外は通常の画像を表示
              `url(${imagePath})`,
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '8px 16px 8px 16px',
        ...props.style,
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {props.children}
    </button>
  );
};
