import { ChartCaretIcon } from "@/components/icons"
import { Typography } from "@/components/pages/profile/components"

import { Box } from "../Box"
import { textColorsByChangeSymbol } from "./constants"
import { getChangeSymbol } from "./utils"

interface PriceChangeProps {
  isPositive?: boolean
  countUsd?: string
  percentageDiff?: string
}

export const PriceChange = ({
  isPositive,
  countUsd = "0",
  percentageDiff = "0",
}: PriceChangeProps) => {
  const changeSymbol = getChangeSymbol(isPositive, percentageDiff)
  const pricesString = `${changeSymbol}$${countUsd} ${changeSymbol}${percentageDiff}%`

  return (
    <Box flex gap={1} align="center">
      {changeSymbol && (
        <ChartCaretIcon
          rotate={isPositive ? 0 : 180}
          fill={isPositive ? "#5FFF95" : "#FF3F3F"}
        />
      )}
      <Typography.Text
        color={textColorsByChangeSymbol[changeSymbol]}
        font="secondary"
      >
        {pricesString}
      </Typography.Text>
    </Box>
  )
}

type PriceChangeSmallProps = Pick<
  PriceChangeProps,
  "isPositive" | "percentageDiff"
>

export const PriceChangeSmall = ({
  isPositive,
  percentageDiff = "0",
}: PriceChangeSmallProps) => {
  const changeSymbol = getChangeSymbol(isPositive, percentageDiff)

  return (
    <Typography.Text
      color={textColorsByChangeSymbol[changeSymbol]}
      font="secondary"
      size="2xs"
    >
      {changeSymbol}
      {percentageDiff}%
    </Typography.Text>
  )
}
