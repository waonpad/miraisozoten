export const MapSeparator = ({
  d,
  isVisibled,
  ...props
}: { isVisibled: boolean } & React.SVGProps<SVGPathElement> & { d: string }) => {
  return (
    <path stroke="gray" strokeWidth="2" {...props} d={d} display={isVisibled ? 'block' : 'none'} />
  );
};
