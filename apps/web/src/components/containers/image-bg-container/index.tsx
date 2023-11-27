import { cn } from 'ui/lib/utils';

export type ImageBgContainerProps = {
  imagePath: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ImageBgContainer = ({ imagePath, ...props }: ImageBgContainerProps) => {
  return (
    <div
      {...props}
      style={{
        backgroundImage: `url(${imagePath})`,
        ...props.style,
      }}
      className={cn(
        `flex items-center justify-center bg-transparent bg-[length:100%_100%]`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
