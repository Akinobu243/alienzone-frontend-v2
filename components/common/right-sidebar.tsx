import React from "react"

import {
  DoubleArrowIcon,
  FlagIcon,
  HomeIcon,
  InfoIcon,
  PeopleIcon,
  StackIcon,
} from "../icons"
import AlienzoneIcon from "../icons/alienzone"
import BlurBox from "../ui/blur-box"

const sidebarItems = [
  { label: "", href: "", icon: <HomeIcon className="size-4" /> },
  { label: "", href: "", icon: <DoubleArrowIcon className="size-4" /> },
  { label: "", href: "", icon: <PeopleIcon className="size-4" /> },
  { label: "", href: "", icon: <FlagIcon className="size-4" /> },
  { label: "", href: "", icon: <StackIcon className="size-4" /> },
  { label: "", href: "", icon: <InfoIcon className="size-4" /> },
]

const RightSidebar = () => {
  return (
    <div className="absolute left-28 top-28 z-20 flex flex-col gap-2">
      <div className="border border-gray-light rounded-normal cursor-pointer backdrop-blur-[40px] flex justify-center items-center size-14">
        <AlienzoneIcon className="size-6" />
      </div>

      <BlurBox className="rounded-normal flex-col items-center gap-2.5 w-14 p-2">
        {sidebarItems.map((item, index) => (
          <BlurBox key={index}> {item.icon}</BlurBox>
        ))}
      </BlurBox>
    </div>
  )
}

export default RightSidebar
