/* eslint-disable @typescript-eslint/no-explicit-any */
import Japan from '@svg-maps/japan';
import { Prefecture } from 'prefecture/dist';
import { SVGMap, SVGMapProps } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

export type JapanRadioSVGMapProps = Omit<SVGMapProps, 'map'> & {
  handleSelect: (e: { target: { id: Prefecture['en'] } }) => void;
};

export const JapanRadioSVGMap = (props: JapanRadioSVGMapProps) => {
  const handleClick = (e: any) => {
    // svg-map__locationのクラスのある要素を全てaria-checked="false"にする
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      location.setAttribute('aria-checked', 'false');
    });

    // aria-checked="true"をつける
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    e.target.setAttribute('aria-checked', 'true');

    // ハンドラーを呼び出す
    props.handleSelect(e);
  };

  return <SVGMap {...props} map={Japan} onLocationClick={handleClick} />;
};
