import { Button } from "@/components/ui/button"
import { TwitterX } from "@/components/ui/icons"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-end h-[calc(100vh-96px)] lg:h-[calc(100vh-144px)] pb-10">
      <Button>
        Log in with <TwitterX />
      </Button>
      <p className="text-xs text-white/50 mt-12 text-center">
        © {new Date().getFullYear()} Alienzone All rights reserved. Reach out
        to us at{" "}
        <a href="mailto:team@alienzone.io" className="underline ">
          team@alienzone.io
        </a>
      </p>
    </div>
  )
}
