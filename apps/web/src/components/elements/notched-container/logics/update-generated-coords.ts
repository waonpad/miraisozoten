import { ClientRect } from '@/utils/hooks/use-element-client-rect';

import { Side, Coord } from '../types';
import { pxToNumber } from '../utils/format';
import { getTargetDimension } from '../utils/get-target-dimmension';

import { rotationCoords } from './rotation-coords';

/**
 * とりあえず動かしたのを切り出しただけ
 * 余裕があるときに整理する
 */
export const updateGeneratedCoords = ({
  coords,
  prevClientRect,
  clientRect,
  sides,
}: {
  coords: (Coord & { role: Side })[];
  prevClientRect: ClientRect;
  clientRect: ClientRect;
  sides: Side[];
}) => {
  const resultCoords: (Coord & { role: Side; index: number })[] = [];

  sides.forEach((side) => {
    const _targetCoords = coords
      .map((coord, index) => {
        return {
          ...coord,
          index: index,
        };
      })
      .filter((coord) => {
        return coord.role === side;
      });

    // 処理

    const { targetDimension, verticalDimmension } = getTargetDimension({ side });

    const prevTargrtSideRange = prevClientRect[targetDimension];
    const prevVerticalSideRange = prevClientRect[verticalDimmension];

    const currentTargetSideRange = clientRect[targetDimension];
    const currentVerticalSideRange = clientRect[verticalDimmension];

    // 回転してtopの形に戻す
    const targetCoords = rotationCoords({
      coords: _targetCoords,
      side,
      sideRange: prevTargrtSideRange,
      verticalSideRange: prevVerticalSideRange,
      toTop: true,
    }) as (Coord & { role: Side; index: number })[];

    // とりあえず、全ての切り込みの幅の合計を求める
    const notchs: {
      width: number;
      startCoord: (typeof targetCoords)[number];
      centerCoord: (typeof targetCoords)[number];
      endCoord: (typeof targetCoords)[number];
    }[] = [];

    const intervals: {
      width: number;
      startCoord: (typeof targetCoords)[number];
      endCoord: (typeof targetCoords)[number];
    }[] = [];

    for (let i = 0; i < targetCoords.length; i++) {
      const target = targetCoords[i];
      const next = targetCoords[i + 1];
      const nextNext = targetCoords[i + 2];

      // nextがない場合、それは辺の終端である
      if (!next) continue;

      // nextNextがない場合、それは辺の最後のインターバルである
      if (!nextNext) {
        const diff = pxToNumber(next.x) - pxToNumber(target.x);

        intervals.push({
          width: diff,
          startCoord: target,
          endCoord: next,
        });

        continue;
      }

      // y座標が0である座標が連続していたら、インターバルである
      if (pxToNumber(target.y) === 0 && pxToNumber(next.y) === 0) {
        const diff = pxToNumber(next.x) - pxToNumber(target.x);

        intervals.push({
          width: diff,
          startCoord: target,
          endCoord: next,
        });

        continue;
      }

      // targetのyが0で、nextのyが0でないということは、切り込みの先端であるから、
      // targetとnextNextのxの差分が、切り込みの幅である
      if (pxToNumber(target.y) === 0 && pxToNumber(next.y) > 0) {
        const diff = pxToNumber(nextNext.x) - pxToNumber(target.x);

        notchs.push({
          width: diff,
          startCoord: target,
          centerCoord: next,
          endCoord: nextNext,
        });

        continue;
      }

      // ここに入るのは、切り込みの先端座標を見ているとき
      continue;
    }

    // インターバルを、要素の幅変更に対応して倍率をかける
    // この時点では、座標の操作自体は行わない
    const caluculatedIntervals = intervals.map((interval) => {
      return {
        ...interval,
        width: interval.width * (currentTargetSideRange / prevTargrtSideRange),
      };
    });

    // インターバルと切り込みの幅の合計を求めて、要素の幅から引くことで、インターバルでうめないといけない幅を求める
    // この値は、要素を縮めるとマイナスになる
    const restWidth =
      currentTargetSideRange -
      caluculatedIntervals.reduce((a, b) => a + b.width, 0) -
      notchs.reduce((a, b) => a + b.width, 0);

    // この時点では、座標の操作自体は行わない
    const distributedIntervals = caluculatedIntervals.map((interval) => {
      return {
        ...interval,
        width:
          interval.width +
          restWidth * (interval.width / caluculatedIntervals.reduce((a, b) => a + b.width, 0)),
      };
    });

    // 再計算が終わったので、マッピングする
    // targetCooordsに対して直接操作する
    for (let i = 0; i < targetCoords.length; i++) {
      // まず、そのindexがsatartCoordのindexと同じものをnotchsから探す
      const target = targetCoords[i];

      const targetNotch = notchs.find((notch) => {
        return notch.startCoord.index === target.index;
      });

      if (!targetNotch) {
        // targetは切り込みの始点ではない

        const targetInterval = distributedIntervals.find((interval) => {
          return interval.startCoord.index === target.index;
        });

        // targetはインターバルの始点でもない
        if (!targetInterval) continue;

        // targetがインターバルの始点である場合の処理
        // インターバルの終端のx座標に、(計算済みのインターバルの幅 - 元のインターバルの幅)を足す
        const xDiff =
          targetInterval.width -
          (pxToNumber(targetInterval.endCoord.x) - pxToNumber(targetInterval.startCoord.x));

        // これを繰り返すことで、どんどんずらしていく
        targetCoords.forEach((targetCoord, index) => {
          if (targetCoord.index < targetInterval.endCoord.index) {
            return;
          }

          targetCoords[index].x = `${pxToNumber(targetCoord.x) + xDiff}px`;
        });

        continue;
      }

      // targetは切り込みの始点である場合
      continue;
    }

    // 回転しなおす
    const rotatedCoords = rotationCoords({
      coords: targetCoords,
      side,
      sideRange: currentTargetSideRange,
      verticalSideRange: currentVerticalSideRange,
      toTop: false,
    }) as (Coord & { role: Side; index: number })[];

    // 保存する
    resultCoords.push(...rotatedCoords);
  });

  const updatedCoords = coords.map((coord, index) => {
    const targetCoord = resultCoords.find((resultCoord) => {
      return resultCoord.index === index;
    });

    if (targetCoord) {
      return targetCoord;
    }

    return coord;
  });

  return updatedCoords;
};
