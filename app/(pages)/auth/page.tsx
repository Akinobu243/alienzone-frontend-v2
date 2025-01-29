import { Suspense } from "react"
import { headers } from "next/headers"
import { userAgent } from "next/server"
import { Loader2 } from "lucide-react"

import Auth from "@/components/auth"

export default function AuthPage() {
  const { device } = userAgent({ headers: headers() })
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop"

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      }
    >
      <Auth deviceType={deviceType} />
    </Suspense>
  )
}
