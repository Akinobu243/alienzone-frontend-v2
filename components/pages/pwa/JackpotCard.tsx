interface JackpotCardProps {
  amount: number
  players: number
}

export function JackpotCard({ amount, players }: JackpotCardProps) {
  const formattedAmount = new Intl.NumberFormat("en-US").format(amount)

  return (
    <div className="relative bg-white/10 border border-white/20 rounded-2xl  overflow-hidden">
      <div className="relative p-4">
        <h2 className="text-sm text-gray-400 mb-1 font-sans">
          FUTURE BILLIONAIRES JACKPOT
        </h2>
        <div className="text-3xl font-bold ">${formattedAmount}</div>
      </div>
      <div className="flex items-center gap-1 bg-white/10 p-4">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="size-8 rounded-full bg-gray-500 border-2 border-zinc-900"
            />
          ))}
        </div>
        <span className="text-sm text-gray-400">
          {new Intl.NumberFormat("en-US").format(players)} players
        </span>
      </div>
    </div>
  )
}
