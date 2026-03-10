import { CHANGE_SYMBOLS } from "./constants"

export const getChangeSymbol = (
  isPositive?: boolean,
  percentageDiff?: string
): CHANGE_SYMBOLS => {
  if (
    isPositive === undefined ||
    percentageDiff === undefined ||
    percentageDiff === "0"
  ) {
    return CHANGE_SYMBOLS.NEUTRAL
  }

  return isPositive ? CHANGE_SYMBOLS.POSITIVE : CHANGE_SYMBOLS.NEGATIVE
}
