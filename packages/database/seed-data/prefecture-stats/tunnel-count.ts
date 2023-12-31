// 1. テンプレート(_template.ts)をコピーする
// 2. ファイル名をデータの内容が分かる名前(ケバブケース)に変更する
// 3. exportしている変数名をファイル名と対応した名前(パスカルケース)に変更する
// 4. PrefectureStatsData型を満たすようにデータを入力する

import { PrefectureStatsData } from "./types";

export const TunnelCount = {
  label: "トンネル数",
  unit: "本",
  attribution: {
    sourceSiteName: "地域の入れ物",
    sourceUrlTitle: "トンネル数の都道府県ランキング(平成31年)",
    sourceUrl: 'https://region-case.com/rank-h31-infra-tunnel/',
    retrievedAt: {
      year: 2023,
      month: 11,
      day: 20,
    },
  },
  prefectures: {
    1:  { id: 1,  name: '北海道',   value:  505},
    2:  { id: 2,  name: '青森県',   value:  50},
    3:  { id: 3,  name: '岩手県',   value:  306},
    4:  { id: 4,  name: '宮城県',   value:  128},
    5:  { id: 5,  name: '秋田県',   value:  182},
    6:  { id: 6,  name: '山形県',   value:  150},
    7:  { id: 7,  name: '福島県',   value:  244},
    8:  { id: 8,  name: '茨城県',   value:  52},
    9:  { id: 9,  name: '栃木県',   value:  89},
    10: { id: 10, name: '群馬県',   value:  118},
    11: { id: 11, name: '埼玉県',   value:  97},
    12: { id: 12, name: '千葉県',   value:  468},
    13: { id: 13, name: '東京都',   value:  243},
    14: { id: 14, name: '神奈川県', value:  270},
    15: { id: 15, name: '新潟県',   value:  367},
    16: { id: 16, name: '富山県',   value:  132},
    17: { id: 17, name: '石川県',   value:  138},
    18: { id: 18, name: '福井県',   value:  216},
    19: { id: 19, name: '山梨県',   value:  202},
    20: { id: 20, name: '長野県',   value:  373},
    21: { id: 21, name: '岐阜県',   value:  352},
    22: { id: 22, name: '静岡県',   value:  394},
    23: { id: 23, name: '愛知県',   value:  131},
    24: { id: 24, name: '三重県',   value:  203},
    25: { id: 25, name: '滋賀県',   value:  87},
    26: { id: 26, name: '京都府',   value:  177},
    27: { id: 27, name: '大阪府',   value:  113},
    28: { id: 28, name: '兵庫県',   value:  388},
    29: { id: 29, name: '奈良県',   value:  177},
    30: { id: 30, name: '和歌山県', value:  386},
    31: { id: 31, name: '鳥取県',   value:  105},
    32: { id: 32, name: '島根県',   value:  349},
    33: { id: 33, name: '岡山県',   value:  251},
    34: { id: 34, name: '広島県',   value:  435},
    35: { id: 35, name: '山口県',   value:  274},
    36: { id: 36, name: '徳島県',   value:  177},
    37: { id: 37, name: '香川県',   value:  55},
    38: { id: 38, name: '愛媛県',   value:  347},
    39: { id: 39, name: '高知県',   value:  414},
    40: { id: 40, name: '福岡県',   value:  129},
    41: { id: 41, name: '佐賀県',   value:  53},
    42: { id: 42, name: '長崎県',   value:  221},
    43: { id: 43, name: '熊本県',   value:  313},
    44: { id: 44, name: '大分県',   value:  596},
    45: { id: 45, name: '宮崎県',   value:  241},
    46: { id: 46, name: '鹿児島県', value:  174},
    47: { id: 47, name: '沖縄県',   value:  40},
  }
} as const satisfies PrefectureStatsData