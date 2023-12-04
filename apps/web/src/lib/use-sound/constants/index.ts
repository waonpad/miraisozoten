export const SOUND_ATTRIBUTE = 'data-sound' as const;

export const SOUND_ATTRIBUTE_VALUE = {
  OFF: 'off',
  ON: 'on',
  CLICK: 'click',
  NEGATIVE_CLICK: 'negative-click',
  DISABLED_CLICK: 'disabled-click',
  OPEN_DIALOG: 'open-dialog',
  CLOSE_DIALOG: 'close-dialog',
} as const;

// disabled-clickは、disabled属性が付与されている要素に直接指定しても動作しないため、divで囲んで
// {...(disabled ? soundAttirbuteObject('DISABLED_CLICK') : {})} のようにする
// 無効化している要素を丁度囲むようにすると良い(w-fit, h-fit)
// disableable としてコンポーネントにする？

/**
 * @description
 * セレクターで検索する時に使う
 */
export const soundAttributeString = <T extends keyof typeof SOUND_ATTRIBUTE_VALUE>(key: T) =>
  `[${SOUND_ATTRIBUTE}="${SOUND_ATTRIBUTE_VALUE[key]}"]` as const;

/**
 * @description
 * コンポーネントのpropsに渡すときに使う
 */
export const soundAttirbuteObject = <T extends keyof typeof SOUND_ATTRIBUTE_VALUE>(
  key: T
): { [SOUND_ATTRIBUTE]: (typeof SOUND_ATTRIBUTE_VALUE)[T] } => ({
  [SOUND_ATTRIBUTE]: SOUND_ATTRIBUTE_VALUE[key],
});
