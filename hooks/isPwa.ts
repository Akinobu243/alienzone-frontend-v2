import { useEffect, useState } from "react"

export const isPwa = () => {
  if (typeof window === "undefined") return false

  // Check if window.matchMedia is available
  if (!window.matchMedia) return false

  // iOS specific check
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  const isIOSPwa = isIOS && (window.navigator as any).standalone

  // Android and other platforms check
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    document.referrer.includes("android-app://")

  return isIOSPwa || isStandalone
}

export const usePwa = () => {
  const [isPwaMode, setIsPwaMode] = useState(false)

  useEffect(() => {
    setIsPwaMode(isPwa())

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPwaMode(isPwa())
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return isPwaMode
}
