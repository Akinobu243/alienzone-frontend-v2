import {
  PriceChangeSmall,
  Typography,
} from "@/components/pages/profile/components"

import { Box } from "../Box"

interface PriceProps {
  price: string
  tokenName: string
  isPositive?: boolean
  percentageDiff?: string
  withoutChange?: boolean
}

export const Price = ({
  price,
  tokenName,
  isPositive,
  percentageDiff,
  withoutChange,
}: PriceProps) => {
  return (
    <Box flex direction="column" align="end" gap={1}>
      <Typography.Text font="secondary">
        {price} {tokenName}
      </Typography.Text>
      {!withoutChange && (
        <PriceChangeSmall
          isPositive={isPositive}
          percentageDiff={percentageDiff}
        />
      )}
    </Box>
  )
}
