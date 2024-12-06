const BackgroundCover = ({ url }: { url: string }) => {
  return (
    <>
      <div className="fixed w-[100vw] h-[100vh]">
        <div
          className=" absolute inset-0 w-full h-full "
          style={{
            background: `url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </>
  )
}

export default BackgroundCover
