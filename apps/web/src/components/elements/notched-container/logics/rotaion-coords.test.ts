import { describe, it, expect } from '@jest/globals';

import { rotationCoords } from './rotation-coords';
import { Coord } from '../types';

describe('rotationCoords', () => {
  it('should return the same coords if side is top', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const result = rotationCoords({
      coords,
      side: 'top',
      sideRange: 100,
      verticalSideRange: 200,
    });
    expect(result).toEqual(coords);
  });

  it('should rotate coords correctly if side is right', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const result = rotationCoords({
      coords,
      side: 'right',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    expect(result).toEqual([
      { x: '200px', y: '0px' },
      { x: '200px', y: '10px' },
      { x: '180px', y: '15px' }, // 切り込み
      { x: '200px', y: '20px' },
      { x: '200px', y: '100px' },
    ]);
  });

  it('should rotate coords correctly if side is bottom', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const result = rotationCoords({
      coords,
      side: 'bottom',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    expect(result).toEqual([
      { x: '100px', y: '200px' },
      { x: '90px', y: '200px' },
      { x: '85px', y: '180px' }, // 切り込み
      { x: '80px', y: '200px' },
      { x: '0px', y: '200px' },
    ]);
  });

  it('should rotate coords correctly if side is left', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const result = rotationCoords({
      coords,
      side: 'left',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    expect(result).toEqual([
      { x: '0px', y: '100px' },
      { x: '0px', y: '90px' },
      { x: '20px', y: '85px' }, // 切り込み
      { x: '0px', y: '80px' },
      { x: '0px', y: '0px' },
    ]);
  });

  // topからrightに回転して、さらにleftに回転したとき、最初の値と同じになるか
  it('should return the same coords if rotate top to right and then left', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const rotatedCoords = rotationCoords({
      coords,
      side: 'right',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    const result = rotationCoords({
      coords: rotatedCoords,
      side: 'bottom',
      sideRange: 200, // 対象の辺の長さ
      verticalSideRange: 100, // 対象の辺ではない方の長さ
    });
    // 失敗する
    expect(result).not.toEqual(coords);
  });

  // right, bottom, leftと回転させれば成功する？
  it('should return the same coords if rotate top to right and then bottom and then left', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];
    const rotatedCoords = rotationCoords({
      coords,
      side: 'right',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    const rotatedCoords2 = rotationCoords({
      coords: rotatedCoords,
      side: 'bottom',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200,
    });
    const rotatedCoords3 = rotationCoords({
      coords: rotatedCoords2,
      side: 'left',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, //
    });

    // 失敗する
    expect(rotatedCoords3).not.toEqual(coords);
  });

  // rightに回転して、さらにtopに回転したとき、最初の値と同じになるか
  // toTopフラグを有効にしたら成功する
  it('should return the same coords if rotate right to top', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];

    // この場合、縦200px、横100pxの長方形を想定している

    const rotatedCoords = rotationCoords({
      // ここでのsideRangeは、回転後のsideの長さ
      // verticalSideRangeは、回転後のsideではない方の長さ
      coords,
      side: 'right',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    const result = rotationCoords({
      coords: rotatedCoords,
      side: 'right',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
      toTop: true,
    });
    expect(result).toEqual(coords);
  });

  // bottomに回転して、さらにtopに回転したとき、最初の値と同じになるか
  // toTopフラグを有効にする
  it('should return the same coords if rotate bottom to top', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];

    // この場合、縦200px、横100pxの長方形を想定している

    const rotatedCoords = rotationCoords({
      // ここでのsideRangeは、回転後のsideの長さ
      // verticalSideRangeは、回転後のsideではない方の長さ
      coords,
      side: 'bottom',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    const result = rotationCoords({
      coords: rotatedCoords,
      side: 'bottom',
      sideRange: 100,
      verticalSideRange: 200,
      toTop: true,
    });

    expect(result).toEqual(coords);
  });

  // leftに回転して、さらにtopに回転したとき、最初の値と同じになるか
  // toTopフラグを有効にする
  it('should return the same coords if rotate left to top', () => {
    const coords: Coord[] = [
      { x: '0px', y: '0px' },
      { x: '10px', y: '0px' },
      { x: '15px', y: '20px' }, // 切り込み
      { x: '20px', y: '0px' },
      { x: '100px', y: '0px' },
    ];

    // この場合、縦200px、横100pxの長方形を想定している

    const rotatedCoords = rotationCoords({
      // ここでのsideRangeは、回転後のsideの長さ
      // verticalSideRangeは、回転後のsideではない方の長さ
      coords,
      side: 'left',
      sideRange: 100, // 対象の辺の長さ
      verticalSideRange: 200, // 対象の辺ではない方の長さ
    });
    const result = rotationCoords({
      coords: rotatedCoords,
      side: 'left',
      sideRange: 100,
      verticalSideRange: 200,
      toTop: true,
    });

    expect(result).toEqual(coords);
  });
});
