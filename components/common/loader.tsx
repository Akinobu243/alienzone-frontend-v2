"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { fetchAliens } from "@/store/slices/aliensSlice"
import { fetchRaidHistory, fetchRaids } from "@/store/slices/raidsSlice"
import { fetchUserProfile } from "@/store/slices/userProfileSlice"
import { useAppKitAccount } from "@reown/appkit/react"
import { Loader2 } from "lucide-react"

import { removeCookie } from "@/lib/cookie"

const WALLET_INIT_TIMEOUT = 2000

export function Loader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { address, isConnected } = useAppKitAccount()
  const [isLoading, setIsLoading] = useState(true)
  const [walletInitialized, setWalletInitialized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWalletInitialized(true)
    }, WALLET_INIT_TIMEOUT)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleWalletState = async () => {
      if (!walletInitialized) return

      if (!isConnected) {
        removeCookie("accessToken")
        router.push("/auth")
        return
      }

      if (address) {
        setIsLoading(false)
        try {
          await Promise.all([
            dispatch(fetchUserProfile(address)),
            dispatch(fetchRaids()),
            dispatch(fetchAliens()),
            dispatch(fetchRaidHistory()),
          ])
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    handleWalletState()
  }, [address, dispatch, walletInitialized, isConnected, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
