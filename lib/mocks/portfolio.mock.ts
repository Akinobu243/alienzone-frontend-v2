import { GetPortfolioResponse } from "@/lib/types"

export const portfolioMock: GetPortfolioResponse = {
  characters: [
    {
      name: "Alien#270",
      price: "10,000",
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Black Flames",
      price: "100,000",
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Mizugame",
      price: "987",
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
  ],
  items: [
    {
      name: "King Curse",
      price: "351",
      amount: "1",
      price_diff_percentage: "9",
      price_diff_positive: true,
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Black Flames",
      price: "556",
      amount: "2.4",
      price_diff_percentage: "45.7",
      price_diff_positive: true,
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Peaceful Torii",
      price: "1,100",
      amount: "2.6",
      price_diff_percentage: "3",
      price_diff_positive: false,
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Peaceful Torii",
      price: "1,100",
      amount: "2.6",
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
    {
      name: "Peaceful Torii",
      price: "1,100",
      amount: "2.6",
      price_diff_percentage: "0",
      price_diff_positive: false,
      picture_url:
        "https://assets.coingecko.com/nft_contracts/images/4380/small_2x/alienzone.png?1715456806",
    },
  ],
  // // positive balbnce change
  // balance_summary: "666,666",
  // balance_usd: "9,998,19",
  // usd_balance_diff_positive: true,
  // usd_balance_diff: "1,179.31",
  // usd_diff_percentage: "34.6",
  // wallet_zone_balance: "10.000",

  // neutral balance change
  balance_summary: "666,666",
  balance_usd: "9,998,19",
  wallet_zone_balance: "10.000",

  // // negative balance change
  // balance_summary: "666,666",
  // balance_usd: "9,998,19",
  // usd_balance_diff_positive: false,
  // usd_balance_diff: "1,179.31",
  // usd_diff_percentage: "34.6",
  // wallet_zone_balance: "10.000",
}
