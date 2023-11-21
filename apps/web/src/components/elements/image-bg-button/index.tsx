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
        backgroundImage: isSelected
          ? `url(${selectedImagePath})`
          : isHover
          ? `url(${hoverImagePath})`
          : `url(${imagePath})`,
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
