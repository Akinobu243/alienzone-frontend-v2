import React from "react"

import { ChatIcon } from "../icons"
import BlurBox from "../ui/blur-box"

const ChatBox = () => {
  return (
    <div className="absolute left-28 bottom-28">
      <BlurBox className="rounded-normal flex-col items-center gap-2.5 w-14 p-2">
        <BlurBox>
          <ChatIcon className="size-4" />
        </BlurBox>
      </BlurBox>
    </div>
  )
}

export default ChatBox
