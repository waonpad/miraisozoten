/* eslint-disable @typescript-eslint/no-explicit-any */
import Japan from '@svg-maps/japan';
import { CheckboxSVGMap, OnChangeMapProps } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

export type JapanCheckboxSVGMapProps = Omit<OnChangeMapProps, 'map'>;

export const JapanCheckboxSVGMap = (props: JapanCheckboxSVGMapProps) => {
  return <CheckboxSVGMap {...props} map={Japan} />;
};
