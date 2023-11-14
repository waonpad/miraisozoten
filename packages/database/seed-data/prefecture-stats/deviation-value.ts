// 1. テンプレート(_template.ts)をコピーする
// 2. ファイル名をデータの内容が分かる名前(ケバブケース)に変更する
// 3. exportしている変数名をファイル名と対応した名前(パスカルケース)に変更する
// 4. PrefectureStatsData型を満たすようにデータを入力する

import { PrefectureStatsData } from "./types";

export const DeviationValue = {
  label: "大学偏差値",
  unit: "点",
  attribution: {
    sourceSiteName: "ベネッセ教育情報",
    sourceUrlTitle: "大学偏差値",
    sourceUrl: 'https://benesse.jp/',
    retrievedAt: {
      year: 2023,
      month: 11,
      day: 13,
    },
  },
  prefectures: {
    1:  { id: 1,  name: '北海道',   value:  66.5},
    2:  { id: 2,  name: '青森県',   value:  55.5},
    3:  { id: 3,  name: '岩手県',   value:  64.0},
    4:  { id: 4,  name: '宮城県',   value:  63.0},
    5:  { id: 5,  name: '秋田県',   value:  69.0},
    6:  { id: 6,  name: '山形県',   value:  58.0},
    7:  { id: 7,  name: '福島県',   value:  59.0},
    8:  { id: 8,  name: '茨城県',   value:  64.5},
    9:  { id: 9,  name: '栃木県',   value:  61.0},
    10: { id: 10, name: '群馬県',   value:  61.5},
    11: { id: 11, name: '埼玉県',   value:  65.0},
    12: { id: 12, name: '千葉県',   value:  65.5},
    13: { id: 13, name: '東京都',   value:  72.5},
    14: { id: 14, name: '神奈川県', value:  68.5},
    15: { id: 15, name: '新潟県',   value:  60.5},
    16: { id: 16, name: '富山県',   value:  67.0},
    17: { id: 17, name: '石川県',   value:  58.0},
    18: { id: 18, name: '福井県',   value:  67.0},
    19: { id: 19, name: '山梨県',   value:  69.0},
    20: { id: 20, name: '長野県',   value:  57.5},
    21: { id: 21, name: '岐阜県',   value:  58.5},
    22: { id: 22, name: '静岡県',   value:  63.5},
    23: { id: 23, name: '愛知県',   value:  67.0},
    24: { id: 24, name: '三重県',   value:  69.0},
    25: { id: 25, name: '滋賀県',   value:  67.0},
    26: { id: 26, name: '京都府',   value:  72.0},
    27: { id: 27, name: '大阪府',   value:  69.5},
    28: { id: 28, name: '兵庫県',   value:  64.0},
    29: { id: 29, name: '奈良県',   value:  72.5},
    30: { id: 30, name: '和歌山県', value:  67.0},
    31: { id: 31, name: '鳥取県',   value:  56.5},
    32: { id: 32, name: '島根県',   value:  56.0},
    33: { id: 33, name: '岡山県',   value:  60.0},
    34: { id: 34, name: '広島県',   value:  62.0},
    35: { id: 35, name: '山口県',   value:  59.5},
    36: { id: 36, name: '徳島県',   value:  55.0},
    37: { id: 37, name: '香川県',   value:  57.0},
    38: { id: 38, name: '愛媛県',   value:  62.5},
    39: { id: 39, name: '高知県',   value:  54.5},
    40: { id: 40, name: '福岡県',   value:  66.0},
    41: { id: 41, name: '佐賀県',   value:  54.0},
    42: { id: 42, name: '長崎県',   value:  53.5},
    43: { id: 43, name: '熊本県',   value:  53.0},
    44: { id: 44, name: '大分県',   value:  52.5},
    45: { id: 45, name: '宮崎県',   value:  52.0},
    46: { id: 46, name: '鹿児島県', value:  67.0},
    47: { id: 47, name: '沖縄県',   value:  51.0},
  }
} as const satisfies PrefectureStatsData