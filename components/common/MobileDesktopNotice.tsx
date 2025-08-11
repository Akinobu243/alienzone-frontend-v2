"use client"

import { useIsMobile } from "@/hooks/useIsMobile"

export default function MobileDesktopNotice() {
  const isMobile = useIsMobile()

  if (!isMobile) return null
  //   if (!canInstallPWA && !isIOS) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gray-dark rounded-xl p-6 w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center">Use on Desktop</h3>
          <p className="text-sm text-gray-300 mt-2 text-center">
            For the best experience, please use this application on a desktop
            device
          </p>
        </div>
      </div>
    </div>
  )
}
