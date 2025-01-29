interface JackpotCardProps {
  amount: number
}

export function JackpotCard({ amount }: JackpotCardProps) {
  const formattedAmount = new Intl.NumberFormat("en-US").format(amount)

  return (
    <div className="relative bg-white/10 border border-white/20 rounded-2xl  overflow-hidden">
      <div className="relative p-4">
        <h2 className="text-sm text-white mb-1 ">
          FUTURE BILLIONAIRES JACKPOT
        </h2>
        <div className="text-3xl font-bold mt-3 ">${formattedAmount}</div>
      </div>
    </div>
  )
}
