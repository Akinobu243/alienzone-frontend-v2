import React from "react"

import { Loader } from "@/components/common/loader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Loader>{children}</Loader>
}

export default layout
