import React from "react"

import {
  MailIcon,
  SettingsIcon,
  Shop2Icon,
  ShopIcon,
  VolumeIcon,
} from "../icons"
import BlurBox from "../ui/blur-box"

const topbarItems = [
  { label: "", href: "", icon: <MailIcon className="size-4" /> },
  { label: "", href: "", icon: <ShopIcon className="size-4" /> },
  { label: "", href: "", icon: <Shop2Icon className="size-4" /> },
  { label: "", href: "", icon: <VolumeIcon className="size-4" /> },
  { label: "", href: "", icon: <SettingsIcon className="size-4" /> },
]

const TopBar = () => {
  return (
    <div className="absolute right-28 top-28 z-20 flex flex-col gap-2">
      <BlurBox className="rounded-normal items-center gap-2.5 p-2">
        {topbarItems.map((item, index) => (
          <BlurBox key={index}> {item.icon}</BlurBox>
        ))}
      </BlurBox>
    </div>
  )
}

export default TopBar
