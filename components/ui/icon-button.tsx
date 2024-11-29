import React from "react"

import { cn } from "@/lib/utils"

import { ButtonProps } from "./button"

const IconButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "aspect-square glass-effect size-60 lg:size-70 flex items-center justify-center rounded-2xl active:scale-95 transition-[background] duration-300 hover:bg-white/10",
        className
      )}
    >
      <span className="flex items-center gap-2 glass-effect size-10 rounded-md  justify-center  ">
        {children}
      </span>
    </button>
  )
}

export default IconButton
