import { useEffect, useState } from "react"

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // Check if window is defined (for SSR)
      if (typeof window === "undefined") return false

      // Check for mobile user agent
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(navigator.userAgent)

      // Additional check for screen size (typical mobile breakpoint)
      const isMobileScreen = window.innerWidth <= 768

      return isMobileDevice || isMobileScreen
    }

    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    // Initial check
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
