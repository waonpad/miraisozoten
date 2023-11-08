import _ from 'lodash';

import { NotchedContainerProps } from '..';
import { Coord, Side } from '../types';
import { px, pxToNumber, percent, percentToNumber } from '../utils/format';
import { generateInterval } from '../utils/generate-interval';
import { generateNotch } from '../utils/generate-notch';
import { generateRandomBetween } from '../utils/generate-random-between';
import { getTargetDimension } from '../utils/get-target-dimmension';
import { moveToCurrentSideRangeCoords } from '../utils/move-to-current-side-range-coords';
import { regenerateIntervalOption } from '../utils/regenerate-intervel-option';

import { rotationCoords } from './rotation-coords';

export const generateCoords = ({
  notchOptions,
  containerDimensions,
  side,
}: {
  notchOptions: NonNullable<NotchedContainerProps['notchOptions']>;
  containerDimensions: {
    width: number;
    height: number;
  };
  side: Side;
}): (Coord & { role: Side })[] => {
  // どの辺を処理するか
  const { targetDimension, verticalDimmension } = getTargetDimension({ side });

  // 処理する辺の長さ
  const sideRange = containerDimensions[targetDimension];

  // この変数を使って、どこまで辺を処理したかを管理する
  let currentSideRange = 0;

  const coords: Coord[] = [];

  const { depth: depthOption, width: widthOption, interval: intervalOption } = notchOptions;

  // 長い方の辺に、インターバルの数値だけ合わせる(インターバルは%なため)
  const regeneratedIntervalOption = regenerateIntervalOption({
    intervalOption,
    targetDimension,
    containerDimensions,
  });

  // 処理した辺の長さが、辺の長さを超えるまでループ
  while (currentSideRange < sideRange) {
    // ランダムな値を生成
    const depthPx = px(
      generateRandomBetween(pxToNumber(depthOption.min), pxToNumber(depthOption.max))
    );
    const widthPx = px(
      generateRandomBetween(pxToNumber(widthOption.min), pxToNumber(widthOption.max))
    );
    const intervalPercent = percent(
      generateRandomBetween(
        percentToNumber(regeneratedIntervalOption.min),
        percentToNumber(regeneratedIntervalOption.max)
      )
    );
    const intervalPx = px((sideRange * percentToNumber(intervalPercent)) / 100);
    // ランダムな値生成ここまで

    const prevCoord = coords[coords.length - 1];

    // 初回は、端からインターバルの半分の位置に切り込みを作る
    if (!prevCoord) {
      currentSideRange += pxToNumber(intervalPx) / 2; // 適当に端にインターバルを入れている
    }

    // これはまだ切り込みを作っただけで座標を移動していない
    const notch = generateNotch({ width: widthPx, depth: depthPx });

    // これで、現在の位置に移動した切り込みの座標が得られる
    const movedNotch = moveToCurrentSideRangeCoords({
      coords: notch,
      currentSideRange,
    });

    // 移動したので、残りの辺の長さを更新する
    currentSideRange = pxToNumber(movedNotch[movedNotch.length - 1].x);

    if (currentSideRange >= sideRange) {
      console.warn('これ以上切り込みを作れないので、終了');
      break;
    }

    // 切り込みの座標を追加
    coords.push(...movedNotch);

    // インターバル(線分)を作成
    const interval = generateInterval({ width: intervalPx });

    // インターバルを移動
    const movedInterval = moveToCurrentSideRangeCoords({
      coords: interval,
      currentSideRange,
    });

    // 移動したので、残りの辺の長さを更新する
    currentSideRange = pxToNumber(movedInterval[movedInterval.length - 1].x);

    if (currentSideRange >= sideRange) {
      console.warn('これ以上切り込みを作れないので、終了');
      break;
    }

    // インターバルの座標を追加
    coords.push(...movedInterval);
  }

  // 一番最初と最後に、端の座標を追加する
  coords.unshift({ x: px(0), y: px(0) });
  coords.push({ x: px(sideRange), y: px(0) });

  // インターバルと切り込みが同じ座標を作るため、重複を削除する
  const uniquedCoords = _.uniqWith(coords, _.isEqual);

  // 回転
  const rotatedCoords = rotationCoords({
    coords: uniquedCoords,
    side,
    sideRange,
    verticalSideRange: containerDimensions[verticalDimmension],
  });

  const roledCoords = rotatedCoords.map((coord) => ({ ...coord, role: side }));

  return roledCoords;
};
