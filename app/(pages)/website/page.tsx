import React from "react"

import ChatBox from "@/components/common/chat-box"
import RightSidebar from "@/components/common/right-sidebar"
import TopBar from "@/components/common/top-bar"

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-20 relative">
      <div
        className="absolute top-0 left-0 w-full h-full "
        style={{
          background:
            "radial-gradient(69.65% 69.65% at 43.52% 23.05%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(48.12% 75.2% at 31.6% 44.58%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.81) 100%)",
        }}
      />
      <div
        className="bg-glass w-full  border  rounded-2xl p-6 relative z-10  min-h-[80vh]"
        style={{
          background: `url(/images/characters/character-3.png)`,
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <RightSidebar />
        <ChatBox />
        <TopBar />
      </div>
    </div>
  )
}

export default page
