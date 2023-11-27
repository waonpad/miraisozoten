import { cn } from 'ui/lib/utils';

import LogoImage from '@/assets/logo.png';

export type LogoProps = {
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  imgProps?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
};

export const Logo = ({ wrapperProps, imgProps }: LogoProps) => {
  return (
    <div {...wrapperProps} className={cn('flex h-40 w-40 justify-center', wrapperProps?.className)}>
      <img
        {...imgProps}
        src={LogoImage}
        alt="とどうふけん"
        className={cn('h-full w-auto', imgProps?.className)}
      />
    </div>
  );
};
