import { useEffect, useState } from "react"
import Image from "next/image"
import { useDailyRewards } from "@/store/hooks"
import { DailyReward } from "@/types"
import { Check, Lock } from "lucide-react"
import toast from "react-hot-toast"

import { cn } from "@/lib/utils"

import BrandButton from "../ui/brand-button"
import { GradientBorder } from "../ui/gradient-border"

const DailyLoginReward = () => {
  const {
    data: rewards,
    loading,
    claimRewards,
    fetchDailyRewards,
  } = useDailyRewards()
  const [multiplier] = useState(6)
  const [currentReward, setCurrentReward] = useState<DailyReward | null>(null)

  useEffect(() => {
    fetchDailyRewards()
  }, [])

  const handleClaim = async () => {
    if (currentReward?.claimed) return
    try {
      await claimRewards()
      toast.success("Daily rewards claimed successfully!")
      fetchDailyRewards() // Refresh the rewards data
    } catch (error) {
      toast.error("Failed to claim rewards")
    }
  }

  useEffect(() => {
    if (rewards) {
      setCurrentReward(rewards.find((reward) => reward.current) || null)
    }
  }, [rewards])

  const getRewardImage = (reward: DailyReward) => {
    switch (reward.type) {
      case "STARS":
        return "/images/stars.png"
      case "ITEM":
        return reward.item?.image
      case "XP":
        return "/images/xp.png"
    }
  }

  return (
    <div>
      <h2 className="font-medium mb-5 bg-white/5 border border-white/10 w-max rounded-xl p-4">
        Daily Login Bonus
      </h2>
      <div className="w-full mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grid of rewards */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {rewards?.map((reward) => (
                <GradientBorder key={reward.id} isSelected={reward.current}>
                  <div
                    className={cn(
                      "relative aspect-square rounded-xl overflow-hidden flex flex-col",
                      reward.claimed
                        ? "bg-white/5"
                        : reward.current
                          ? "bg-white/10 cursor-pointer"
                          : "bg-white/5 opacity-50"
                    )}
                    onClick={() => {
                      if (reward.current) {
                        handleClaim()
                      }
                    }}
                  >
                    {/* Day number */}
                    <span className="absolute top-2 left-2">{reward.id}</span>

                    {/* Reward image */}
                    <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
                      <div className="relative w-3/5 h-3/5">
                        <Image
                          src={getRewardImage(reward) || ""}
                          alt={reward.type}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Image
                        src={getRewardImage(reward) || ""}
                        alt={reward.type}
                        width={200}
                        height={200}
                        className="opacity-10 !w-[135%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                      />
                    </div>

                    {/* Claimed status */}
                    {!reward.current && (
                      <div
                        className={cn(
                          "flex items-center justify-between text-xs bg-white/10 p-2 font-inter",
                          reward.claimed && "text-gray-400"
                        )}
                      >
                        <span>
                          {reward.claimed
                            ? "Claimed"
                            : reward.current
                              ? "Claim"
                              : "Not available"}
                        </span>
                        {reward.claimed && <Check className="size-3" />}
                        {!reward.current && !reward.claimed && (
                          <Lock className="size-3" />
                        )}
                      </div>
                    )}
                  </div>
                </GradientBorder>
              ))}
            </div>
          </div>

          <div className="lg:w-[240px] flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-2 bg-white/5 p-3 rounded text-center">
                <div className="text-lg font-medium">Today&apos;s Claim</div>
                <div className="font-inter text-sm">
                  <span>06</span>
                  <span className="mx-1">:</span>
                  <span>54</span>
                  <span className="mx-1">:</span>
                  <span>09</span>
                  <span className="ml-2 text-gray-400">Left</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="bg-white/10 rounded text-xs font-inter border border-white/10 flex w-max mx-auto">
                  <div className="border-r py-1 border-white/10 px-2 bg-white/5">
                    Multiplicator{" "}
                  </div>
                  <div className="font-volkhov px-4 py-1">x{multiplier}</div>
                </div>

                <div className="relative aspect-square rounded-xl p-4 flex items-center justify-center overflow-hidden size-32 mx-auto my-4 border border-white/10">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/images/stars.png"
                      alt="Reward"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Image
                    src="/images/stars.png"
                    alt="Reward"
                    width={200}
                    height={200}
                    className="opacity-10 !w-[120%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                  />
                </div>

                <div className="bg-white/10 rounded text-xs font-inter border border-white/10 flex w-max mx-auto">
                  <div className="border-r py-1 border-white/10 px-2 bg-white/5">
                    {currentReward?.type === "STARS"
                      ? `${currentReward.amount} STAR`
                      : currentReward?.type === "XP"
                        ? `${currentReward.amount} XP`
                        : `${currentReward?.amount} ${currentReward?.item?.type}`}
                  </div>
                  <div className="font-volkhov px-4 py-1">
                    {loading ? "Loading..." : "Ready"}
                  </div>
                </div>

                <div className="text-center w-max bg-white/5 rounded-full py-1 px-2 text-2xs text-white/50 mx-auto mt-auto">
                  What&apos;s &quot;Object name&quot;?
                </div>
              </div>
            </div>
          </div>
        </div>
        <BrandButton
          className="w-full mt-4"
          onClick={handleClaim}
          disabled={loading}
        >
          {currentReward && !currentReward.claimed
            ? "Claim Reward"
            : "Already Claimed"}
        </BrandButton>
      </div>
    </div>
  )
}

export default DailyLoginReward
