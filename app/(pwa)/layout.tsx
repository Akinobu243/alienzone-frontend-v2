import React, { Suspense } from "react"

import { Loader } from "@/components/common/loader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Loader>{children}</Loader>
    </Suspense>
  )
}

export default layout
