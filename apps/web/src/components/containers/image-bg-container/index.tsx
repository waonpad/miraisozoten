export type ImageBgContainerProps = {
  imagePath: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ImageBgContainer = ({ imagePath, ...props }: ImageBgContainerProps) => {
  return (
    <div
      {...props}
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: '100% 100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
