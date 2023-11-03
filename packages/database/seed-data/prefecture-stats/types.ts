import { Prefectures } from '../prefectures';

/**
 * 都道府県データを保存するための型
 */
export type PrefectureStatsData = {
  /**
   * データ名
   * Example: 人口, 面積
   */
  label: string;
  /**
   * 単位
   * Example: 人, km2
   */
  unit: string;
  /**
   * 帰属表示のための情報
   */
  attribution: {
    /**
     * データを取得したサイト名
     */
    sourceSiteName: string;
    /**
     * データを取得したURLのタイトル
     */
    sourceUrlTitle: string;
    /**
     * データを取得したURL
     */
    sourceUrl: `https://${string}` | `http://${string}`;
    /**
     * データを取得した日時
     */
    retrievedAt: {
      /**
       * このプロダクトは2023年と2024年にしか使われる予定が今のところないため、この2つの値しか取り得ない
       */
      year: 2023 | 2024;
      month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
      // prettier-ignore
      day: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
    };
  };
  /**
   * 都道府県ごとのデータ
   */
  prefectures: {
    [K in keyof typeof Prefectures]: {
      id: K;
      name: (typeof Prefectures)[K]['name'];
      /**
       * 各都道府県の値
       */
      value: number;
    };
  };
};
