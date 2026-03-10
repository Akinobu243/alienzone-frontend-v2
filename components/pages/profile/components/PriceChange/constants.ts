export enum CHANGE_SYMBOLS {
  POSITIVE = "+",
  NEGATIVE = "-",
  NEUTRAL = "",
}

export const textColorsByChangeSymbol = {
  [CHANGE_SYMBOLS.POSITIVE]: "positive",
  [CHANGE_SYMBOLS.NEGATIVE]: "negative",
  [CHANGE_SYMBOLS.NEUTRAL]: "caption",
} as const
