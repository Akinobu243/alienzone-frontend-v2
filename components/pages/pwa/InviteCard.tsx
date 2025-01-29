import { Profile } from "@/types"
import toast from "react-hot-toast"

export function InviteCard({ profile }: { profile: Profile | null }) {
  return (
    <div className="bg-white/10 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
          {profile?.totalReferrals ?? 0}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Invite your friends and</h3>
          <p className="text-sm text-gray-400">boost your Airdrop</p>
        </div>
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}?refferalCode=${profile?.refferalCode}`
          )
          toast.success("Copied to clipboard")
        }}
        className="w-full mt-4 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors font-sans"
      >
        Copy Invite Link
      </button>
    </div>
  )
}
