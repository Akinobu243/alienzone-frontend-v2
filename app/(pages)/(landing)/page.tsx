"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { TwitterX } from "@/components/ui/icons"
import { SignInModal } from "@/components/auth/SignInModal"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 items-center justify-end h-[calc(100vh-96px)] lg:h-[calc(100vh-144px)] pb-10">
      <Button onClick={() => setIsModalOpen(true)} className="btn-primary">
        Log in with <TwitterX />
      </Button>
      <p className="text-xs text-white/50 mt-12 text-center">
        © {new Date().getFullYear()} Alienzone All rights reserved. Reach out
        to us at{" "}
        <a href="mailto:team@alienzone.io" className="underline">
          team@alienzone.io
        </a>
      </p>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
