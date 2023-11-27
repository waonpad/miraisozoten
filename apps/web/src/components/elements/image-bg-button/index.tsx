import { cn } from 'ui/lib/utils';

export type ImageBgButtonProps = {
  imagePath: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ImageBgButton = ({ imagePath, active, ...props }: ImageBgButtonProps) => {
  return (
    <button
      {...props}
      style={{
        backgroundImage: `url(${imagePath})`,
        ...props.style,
      }}
      className={cn(
        `flex items-center justify-center bg-transparent bg-[length:100%_100%] cursor-pointer hover:cursor-pointer hover:saturate-150 disabled:cursor-default disabled:opacity-50 [&.active]:saturate-200 disabled:pointer-events-none`,
        props.className,
        active && 'active'
      )}
    >
      {props.children}
    </button>
  );
};
