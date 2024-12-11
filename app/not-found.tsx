import BrandButton from "@/components/ui/brand-button"
import ChatBox from "@/components/common/chat-box"
import RightSidebar from "@/components/common/right-sidebar"
import TopBar from "@/components/common/top-bar"

const NotFound = () => {
  return (
    <main className="w-full h-screen relative p-20">
      {/* Image Section */}
      <div className="fixed inset-0 p-20 pointer-events-none">
        <div
          className="bg-cover bg-center w-full h-full bg-no-repeat rounded-md"
          style={{
            backgroundImage: `
              linear-gradient(rgba(24, 24, 24, 0.8), rgba(24, 24, 24, 0.8)),
              url(/images/404.jpeg)
            `,
          }}
        ></div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(93.36% 90.36% at 29% 50%, rgba(0, 0, 0, 0) 46%, #000000 78%)",
            pointerEvents: "none",
          }}
        ></div>
      </div>

      {/* Centered Text Section */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="max-w-2xl text-center flex justify-center items-center flex-col gap-6">
          <h2 className="text-6xl">Ooups, Page not found</h2>
          <p className="text-gray-400 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit,
            dolor eu condimentum fringilla, est arcu aliquet urna.
          </p>
          <BrandButton
            className="items-start w-max hover:scale-105 duration-500 transition-transform active:scale-95 px-[25px]"
            blurColor="bg-purple-300"
            isLink
            href="/"
          >
            Back to homepage
          </BrandButton>
        </div>
      </div>

      <RightSidebar />
      <ChatBox />
      <TopBar />

      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="font-inter text-[12px] font-normal text-off-white flex gap-1 md:gap-0 flex-col md:flex-row w-full justify-center items-center">
          <span>
            © {new Date().getFullYear()} Alienzone All rights reserved.
          </span>
          <span>
            &nbsp; Reach out to us at &nbsp;
            <span className="border-b border-off-white">team@alienzone.io</span>
          </span>
        </div>
      </div>
    </main>
  )
}

export default NotFound
