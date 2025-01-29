import Image from "next/image"
import { Alien, Profile } from "@/types"

interface UserProgressProps {
  profile: Profile | null
  alien: Alien | null
}

interface LevelRange {
  min: number
  max: number
  level: number
}

const LEVEL_RANGES: LevelRange[] = [
  { min: 0, max: 5, level: 1 },
  { min: 5, max: 25, level: 2 },
  { min: 25, max: 50, level: 3 },
  { min: 50, max: 100, level: 4 },
]

export function UserProgress({ profile, alien }: UserProgressProps) {
  // Calculate current level range
  const getCurrentLevelRange = (referrals: number): LevelRange => {
    return (
      LEVEL_RANGES.find(
        (range) => referrals >= range.min && referrals < range.max
      ) || LEVEL_RANGES[LEVEL_RANGES.length - 1]
    )
  }

  const currentRange = getCurrentLevelRange(profile?.totalReferrals ?? 0)
  const progressInLevel =
    ((profile?.totalReferrals ?? 0 - currentRange.min) /
      (currentRange.max - currentRange.min)) *
    100

  return (
    <div className="bg-[#1A1B1E] rounded-2xl p-4 flex flex-col gap-4">
      {/* Alien Image */}
      <div className="w-full h-64  rounded-xl overflow-hidden bg-[#2C2D30]  relative">
        <img
          src={alien?.image}
          alt="User's alien"
          className="w-full h-full object-contain z-10 relative"
        />
        <img
          src={alien?.element.replace(".png", "-bg.png")}
          alt="User's alien"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>

      {/* User Details */}
      <div className="space-y-4">
        {/* Name and Stats */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-white/70 font-medium">{profile?.name}</div>
            <div className="text-white text-xl mt-1">{alien?.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-blue-400 text-2xl">+10 Stars</div>
            <Image src="/images/stars.png" alt="Star" width={40} height={40} />
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="mb-2">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
              <div
                className="h-full bg-[#9E96F4]"
                style={{ width: `${Math.min(progressInLevel, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between text-xs ">
            <span>{profile?.stars} Stars</span>
            <span>Airdrop Level {currentRange.level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
