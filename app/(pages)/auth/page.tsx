"use client"

import { Suspense } from "react"
import { Loader2 } from "lucide-react"

import Auth from "@/components/auth"

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      }
    >
      <Auth />
    </Suspense>
  )
}
