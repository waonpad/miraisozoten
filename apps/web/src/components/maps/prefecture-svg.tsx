import { useEffect, useState } from 'react';

import Japan from '@svg-maps/japan';
import { Prefecture } from 'database';
import { Map } from 'react-svg-map';
import './styles/index.css';
import { cn } from 'ui/lib/utils';

export type PrefectureSVGProps = {
  prefectureNameEn: Prefecture['en'];
  pathProps?: React.SVGProps<SVGPathElement>;
} & React.SVGProps<SVGSVGElement>;

// TODO: リファクタリング

export const PrefectureSVG = ({ prefectureNameEn, pathProps, ...props }: PrefectureSVGProps) => {
  const [pre, setPre] = useState<{
    preId: string;
    preName: string;
    prePath: string;
  }>({
    preId: '',
    preName: '',
    prePath: '',
  });

  const [mixMax, setMinMax] = useState<{
    minBeforeCommas: number;
    maxBeforeCommas: number;
    minAfterCommas: number;
    maxAfterCommas: number;
  }>({
    minBeforeCommas: 0,
    maxBeforeCommas: 0,
    minAfterCommas: 0,
    maxAfterCommas: 0,
  });

  useEffect(() => {
    if (pre.preId !== '') return;

    const JapanSVG = Japan as unknown as Map;

    // console.log(JapanSVG);

    const prefecture = JapanSVG.locations.find((location) => {
      return location.id === prefectureNameEn;
    });

    if (!prefecture) throw new Error('prefecture is not found');

    // 空白か,で分割
    const a = prefecture.path.split(/([\s,]+)/g);

    const b = a.map((a) => {
      // 正規表現で数値であるかを判定(-と.がある)
      if (/^-?\d*\.?\d+$/.test(a)) {
        return Number(a);
      }

      return a;
    });

    // console.log(b);

    const beforeCommas = b
      .map((item, index) => {
        if (item === ',') {
          return {
            index: index - 1,
            value: b[index - 1],
          };
        }
      })
      .filter((b) => b !== undefined) as {
      index: number;
      value: number;
    }[];

    beforeCommas.forEach((beforeComma, index) => {
      b[beforeComma.index] =
        beforeComma.value +
        beforeCommas.reduce((acc, cur, i) => {
          if (i < index) {
            return acc + cur.value;
          }

          return acc;
        }, 0);
    });

    const afterCommas = b
      .map((item, index) => {
        if (item === ',') {
          return {
            index: index + 1,
            value: b[index + 1],
          };
        }
      })
      .filter((b) => b !== undefined) as {
      index: number;
      value: number;
    }[];

    afterCommas.forEach((afterComma, index) => {
      b[afterComma.index] =
        afterComma.value +
        afterCommas.reduce((acc, cur, i) => {
          if (i < index) {
            return acc + cur.value;
          }

          return acc;
        }, 0);
    });

    const newBeforeCommas = b
      .map((item, index) => {
        if (item === ',') {
          return {
            index: index - 1,
            value: b[index - 1],
          };
        }
      })
      .filter((b) => b !== undefined) as {
      index: number;
      value: number;
    }[];

    const minBeforeCommas = Math.min(...(newBeforeCommas.map((item) => item.value) as number[]));
    const maxBeforeCommas = Math.max(...(newBeforeCommas.map((item) => item.value) as number[]));

    b.forEach((item, index) => {
      if (item === ',') {
        b[index - 1] = (b as number[])[index - 1] - minBeforeCommas;
      }
    });

    const newAfterCommas = b
      .map((item, index) => {
        if (item === ',') {
          return {
            index: index + 1,
            value: b[index + 1],
          };
        }
      })
      .filter((b) => b !== undefined) as {
      index: number;
      value: number;
    }[];

    // console.log(beforeCommas, newAfterCommas);

    const minAfterCommas = Math.min(...(newAfterCommas.map((item) => item.value) as number[]));
    const maxAfterCommas = Math.max(...(newAfterCommas.map((item) => item.value) as number[]));

    // console.log({
    //   minBeforeCommas,
    //   maxBeforeCommas,
    //   minAfterCommas,
    //   maxAfterCommas,
    // });

    setMinMax({
      minBeforeCommas,
      maxBeforeCommas,
      minAfterCommas,
      maxAfterCommas,
    });

    b.forEach((item, index) => {
      if (item === ',') {
        b[index + 1] = (b as number[])[index + 1] - minAfterCommas;
      }
    });

    // mをMに変換
    const bConvertM = b.map((b) => {
      if (b === 'm') {
        return 'M';
      }
      return b;
    });

    // console.log(bConvertM);

    const formatNum = bConvertM.map((item) => {
      // 正規表現で数値であるかを判定(-と.がある)
      if (/^-?\d*\.?\d+$/.test(String(item))) {
        return Number(item) * 10;
      }

      return item;
    });

    const c = formatNum.join('');

    setPre({
      preId: prefecture.id,
      preName: prefecture.name as string,
      prePath: c,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(`svg-map h-full max-h-full w-full max-w-full`, props.className)}
      viewBox={`0 0 ${(mixMax.maxBeforeCommas - mixMax.minBeforeCommas) * 10} ${
        (mixMax.maxAfterCommas - mixMax.minAfterCommas) * 10
      }`}
    >
      <path
        {...pathProps}
        id={pre.preId}
        name={pre.preName}
        d={pre.prePath}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={cn(`svg-map__location cursor-default`, pathProps?.className)}
        aria-checked="true"
      ></path>
    </svg>
  );
};

// 動かない！！
// import { useState, useEffect } from 'react';

// import Japan from '
// @svg
// -maps/japan';
// import { Prefecture } from 'database';
// import { Map } from 'react-svg-map';
// import 'react-svg-map/lib/index.css'; // とりあえずそのままcssを流用

// export type PrefectureSVGProps = {
// prefectureNameEn: Prefecture['en'];
// };

// // eslint-disable-next-line
// @typescript
// -eslint/no-unused-vars
// export const PrefectureSVG = ({ prefectureNameEn }: PrefectureSVGProps) => {
// const [pre, setPre] = useState<{
// preId: string;
// preName: string;
// prePath: string;
// }>({
// preId: '',
// preName: '',
// prePath: '',
// });

// const [mixMax, setMinMax] = useState<{
// minBeforeCommas: number;
// maxBeforeCommas: number;
// minAfterCommas: number;
// maxAfterCommas: number;
// }>({
// minBeforeCommas: 0,
// maxBeforeCommas: 0,
// minAfterCommas: 0,
// maxAfterCommas: 0,
// });

// useEffect(() => {
// if (pre.preId !== '') return;

// const JapanSVG = Japan as unknown as Map;
// const prefecture = JapanSVG.locations.find((location) => {
// return http://location.id === prefectureNameEn;
// });

// if (!prefecture) throw new Error('prefecture is not found');

// const pathParts = prefecture.path.split(/([\s,]+)/g).map((a) => {
// // 正規表現で数値であるかを判定(-と.がある)
// return /^-?\d*\.?\d+$/.test(a) ? Number(a) : a;
// });
// console.log(pathParts);

// const reducedPathParts = getReducedPathParts(getReducedPathParts(pathParts, 'before'), 'after');

// console.log(reducedPathParts);

// const beforeCommas = getArroundCommas(reducedPathParts, 'before');

// const afterCommas = getArroundCommas(reducedPathParts, 'after');
// console.log(beforeCommas, afterCommas);

// const minBeforeCommas = Math.min(...(http://beforeCommas.map((item) => item.value) as number[]));

// const maxBeforeCommas = Math.max(...(http://beforeCommas.map((item) => item.value) as number[]));
// const minAfterCommas = Math.min(...(http://afterCommas.map((item) => item.value) as number[]));

// const maxAfterCommas = Math.max(...(http://afterCommas.map((item) => item.value) as number[]));
// console.log({

// minBeforeCommas,
// maxBeforeCommas,
// minAfterCommas,
// maxAfterCommas,
// });
// setMinMax({

// minBeforeCommas,
// maxBeforeCommas,
// minAfterCommas,
// maxAfterCommas,
// });
// const processedPathParts = getProcessedPathParts(reducedPathParts, {

// minBeforeCommas,
// minAfterCommas,
// });
// console.log(processedPathParts);

// const path = processedPathParts

// .map((item) => (typeof item === 'number' ? item * 10 : item))
// .join('')
// .replace(/m/g, 'M');
// setPre({

// preId: http://prefecture.id,
// preName: http://prefecture.name as string,
// prePath: path,
// });
// // eslint-disable-next-line react-hooks/exhaustive-deps

// }, []);
// return (

// <svg
// className="svg-map"
// viewBox={`0 0 ${(mixMax.maxBeforeCommas - mixMax.minBeforeCommas) * 10} ${
// (mixMax.maxAfterCommas - mixMax.minAfterCommas) * 10
// }`}
// style={{
// width: '100%',
// maxWidth: '100%',
// height: '100%',
// maxHeight: '100%',
// }}
// >
// <path id={pre.preId} name={pre.preName} d={pre.prePath} className="svg-map__location"></path>
// </svg>
// );
// };
// const getArroundCommas = (pathParts: (number | string)[], arround: 'before' | 'after') => {

// return pathParts
// .map((item, index) => {
// if (item === ',') {
// // console.log(item, index, pathParts[index + (arround === 'before' ? -1 : 1)]);
// return {
// // indexとは、pathPartsにおけるindex
// index: index + (arround === 'before' ? -1 : 1),

// // valueは、そのindexの値
// value: pathParts[index + (arround === 'before' ? -1 : 1)],
// };
// }
// })
// .filter((b) => b !== undefined) as {
// index: number;
// value: number;
// }[];
// };
// const getReducedPathParts = (pathParts: (number | string)[], arround: 'before' | 'after') => {
// const arroundCommas = getArroundCommas(pathParts, arround);
// return http://pathParts.map((item, index) => {

// const target = arroundCommas.find((item) => item.index === index);
// if (!target) return item;
// if (typeof item !== 'number') throw new Error('item is not number');
// if (arroundCommas.findIndex((_item) => _item.index === target.index) === 0) return item;

// return (
// target.value +

// arroundCommas.reduce((acc, cur, i) => {

// if (i < index) {

// return acc + cur.value;

// }
// return acc;
// }, 0)
// );
// });
// };

// const getProcessedPathParts = (
// pathParts: (number | string)[],
// min: { minBeforeCommas: number; minAfterCommas: number }
// ) => {
// const { minBeforeCommas, minAfterCommas } = min;

// return http://pathParts.map((item, index) => {
// if (pathParts[index + 1] === ',') {
// if (typeof item !== 'number') {
// throw new Error('item is not number');
// }
// return item - minBeforeCommas;

// }
// if (pathParts[index - 1] === ',') {
// if (typeof item !== 'number') {
// throw new Error('item is not number');
// }

// return item - minAfterCommas;
// }

// return item;
// });
// };
