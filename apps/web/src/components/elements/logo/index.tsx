import LogoSvg from '@/assets/logo.svg?react';

export type LogoProps = React.SVGProps<SVGSVGElement>;

export const Logo = (props: LogoProps) => {
  return <LogoSvg width={150} height={150} {...props} />;
};
