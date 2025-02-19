import Link from "next/link"
import { FaTelegram } from "react-icons/fa6"

import { TwitterX } from "../icons"

const Footer = () => {
  return (
    <div className="font-inter text-[12px]/[12px] flex-col font-normal text-off-white flex gap-4 w-full justify-center items-center z-50 relative mt-4">
      {/* social icons */}
      <div className="flex gap-4">
        <Link
          href="https://x.com/alienzonex?s=21&t=WBAVhU0dzXKdkowjI2oaKw"
          target="_blank"
          className="hover:text-white"
        >
          <TwitterX size={24} />
        </Link>
        <Link
          href="https://t.me/+YlSMU6kwiS40MWE8"
          target="_blank"
          className="hover:text-white"
        >
          <FaTelegram size={24} />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <span>
          © {new Date().getFullYear()} Alienzone All rights reserved.
        </span>
        <span>
          &nbsp; Reach out to us at &nbsp;
          <span className="border-b border-off-white">team@alienzone.io</span>
        </span>
      </div>
    </div>
  )
}

export default Footer
