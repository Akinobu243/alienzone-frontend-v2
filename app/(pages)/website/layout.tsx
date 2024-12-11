import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(112.68deg, #A0669A 0%, #563775 100%)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default layout
