import React from "react"
import Image from "next/image"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{
        backgroundImage: "url(/images/landing/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen"
    >
      <div className="flex justify-center items-center h-24 lg:h-36">
        <div className="max-lg:size-[60px] max-lg:bg-white/5 flex items-center justify-center max-lg:rounded-2xl max-lg:border">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={45}
            height={45}
            className="max-lg:size-8"
          />
        </div>
      </div>
      {children}
    </main>
  )
}

export default LandingLayout
