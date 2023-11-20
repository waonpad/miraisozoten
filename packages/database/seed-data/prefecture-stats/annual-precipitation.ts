// 1. テンプレート(_template.ts)をコピーする
// 2. ファイル名をデータの内容が分かる名前(ケバブケース)に変更する
// 3. exportしている変数名をファイル名と対応した名前(パスカルケース)に変更する
// 4. PrefectureStatsData型を満たすようにデータを入力する

import { PrefectureStatsData } from "./types";

export const AnnualPrecipitation = {
  label:"年間降水量",
  unit: "mm",
  attribution: {
    sourceSiteName: "地域の入れ物",
    sourceUrlTitle: "降水量の都道府県ランキング",
    sourceUrl: 'https://region-case.com/list-rank-product/',
    retrievedAt: {
      year: 2023,
      month: 11,
      day: 6,
    },
  },
  prefectures: {
    1:  { id: 1,  name: '北海道',   value:  1282},
    2:  { id: 2,  name: '青森県',   value:  1553},
    3:  { id: 3,  name: '岩手県',   value:  1332},
    4:  { id: 4,  name: '宮城県',   value:  1082},
    5:  { id: 5,  name: '秋田県',   value:  2016},
    6:  { id: 6,  name: '山形県',   value:  1124},
    7:  { id: 7,  name: '福島県',   value:  828},
    8:  { id: 8,  name: '茨城県',   value:  1282},
    9:  { id: 9,  name: '栃木県',   value:  1257},
    10: { id: 10, name: '群馬県',   value:  1046},
    11: { id: 11, name: '埼玉県',   value:  1056},
    12: { id: 12, name: '千葉県',   value:  1261},
    13: { id: 13, name: '東京都',   value:  1445},
    14: { id: 14, name: '神奈川県', value:  1573},
    15: { id: 15, name: '新潟県',   value:  1795},
    16: { id: 16, name: '富山県',   value:  2751},
    17: { id: 17, name: '石川県',   value:  2765},
    18: { id: 18, name: '福井県',   value:  2632},
    19: { id: 19, name: '山梨県',   value:  1153},
    20: { id: 20, name: '長野県',   value:  886},
    21: { id: 21, name: '岐阜県',   value:  2087},
    22: { id: 22, name: '静岡県',   value:  2442},
    23: { id: 23, name: '愛知県',   value:  1695},
    24: { id: 24, name: '三重県',   value:  1720},
    25: { id: 25, name: '滋賀県',   value:  1863},
    26: { id: 26, name: '京都府',   value:  1770},
    27: { id: 27, name: '大阪府',   value:  1651},
    28: { id: 28, name: '兵庫県',   value:  2037},
    29: { id: 29, name: '奈良県',   value:  1646},
    30: { id: 30, name: '和歌山県', value:  1950},
    31: { id: 31, name: '鳥取県',   value:  2183},
    32: { id: 32, name: '島根県',   value:  1976},
    33: { id: 33, name: '岡山県',   value:  1410},
    34: { id: 34, name: '広島県',   value:  1878},
    35: { id: 35, name: '山口県',   value:  1939},
    36: { id: 36, name: '徳島県',   value:  1760},
    37: { id: 37, name: '香川県',   value:  1575},
    38: { id: 38, name: '愛媛県',   value:  1796},
    39: { id: 39, name: '高知県',   value:  3092},
    40: { id: 40, name: '福岡県',   value:  1617},
    41: { id: 41, name: '佐賀県',   value:  1877},
    42: { id: 42, name: '長崎県',   value:  1821},
    43: { id: 43, name: '熊本県',   value:  1950},
    44: { id: 44, name: '大分県',   value:  1663},
    45: { id: 45, name: '宮崎県',   value:  3167},
    46: { id: 46, name: '鹿児島県', value:  2397},
    47: { id: 47, name: '沖縄県',   value:  2469},
  }
} as const satisfies PrefectureStatsData

