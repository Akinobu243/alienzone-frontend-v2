import { forwardRef, useEffect, useRef, useState } from "react"

interface AlienRendererProps {
  selectedTraits: {
    hair: string
    face: string
  }
  element: string
}

// Cache for loaded images
const imageCache: { [key: string]: HTMLImageElement } = {}

// Preload an image and store in cache
const preloadImage = (src: string): Promise<HTMLImageElement> => {
  if (imageCache[src]) {
    return Promise.resolve(imageCache[src])
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageCache[src] = img
      resolve(img)
    }
    img.onerror = (e) => {
      console.error(`Failed to load image: ${src}`, e)
      reject(e)
    }
    img.src = src
  })
}

export const AlienRenderer = forwardRef<HTMLCanvasElement, AlienRendererProps>(
  ({ selectedTraits, element }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const localCanvasRef = useRef<HTMLCanvasElement>(null)
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
    const bufferCanvasRef = useRef<HTMLCanvasElement>(null)
    const [isImagesLoaded, setIsImagesLoaded] = useState(false)
    const canvasRef =
      (ref as React.RefObject<HTMLCanvasElement>) || hiddenCanvasRef

    // High resolution output scale
    const OUTPUT_SCALE = 1

    // Get base image dimensions from the first loaded image
    const getBaseDimensions = (): { width: number; height: number } => {
      const bodyImage = imageCache["/images/alien/body/body.png"]
      if (bodyImage) {
        return {
          width: bodyImage.naturalWidth,
          height: bodyImage.naturalHeight,
        }
      }
      return { width: 462, height: 462 } // Fallback dimensions
    }

    // Preload all required images when traits change
    useEffect(() => {
      setIsImagesLoaded(false)

      const baseImages = [
        "/images/alien/body/body.png",
        "/images/alien/body/head.png",
        "/images/alien/body/cothes.png",
      ]

      const loadAllImages = async () => {
        try {
          const promises = baseImages.map((src) => preloadImage(src))
          if (selectedTraits.face)
            promises.push(preloadImage(selectedTraits.face))
          if (selectedTraits.hair)
            promises.push(preloadImage(selectedTraits.hair))
          if (element) promises.push(preloadImage(element))

          await Promise.all(promises)
          setIsImagesLoaded(true)
        } catch (error) {
          console.error("Error preloading images:", error)
          setIsImagesLoaded(false)
        }
      }

      loadAllImages()
    }, [selectedTraits.face, selectedTraits.hair, element])

    useEffect(() => {
      if (!isImagesLoaded) return

      const displayCanvas = localCanvasRef.current
      const outputCanvas = canvasRef.current
      const bufferCanvas = bufferCanvasRef.current
      if (!displayCanvas || !outputCanvas || !bufferCanvas) {
        console.error("Canvas references not found")
        return
      }

      // Get natural dimensions from base image
      const { width: naturalWidth, height: naturalHeight } = getBaseDimensions()

      // Set up all canvases with correct dimensions
      const setupCanvas = (canvas: HTMLCanvasElement, scale: number = 1) => {
        canvas.width = naturalWidth * scale
        canvas.height = naturalHeight * scale
      }

      setupCanvas(displayCanvas)
      setupCanvas(bufferCanvas)
      setupCanvas(outputCanvas, OUTPUT_SCALE)

      const displayCtx = displayCanvas.getContext("2d", { alpha: true })
      const outputCtx = outputCanvas.getContext("2d", { alpha: true })
      const bufferCtx = bufferCanvas.getContext("2d", { alpha: true })

      if (!displayCtx || !outputCtx || !bufferCtx) {
        console.error("Failed to get canvas contexts")
        return
      }

      const drawAlien = async (
        ctx: CanvasRenderingContext2D,
        scale: number = 1,
        showBackground: boolean
      ) => {
        const width = naturalWidth * scale
        const height = naturalHeight * scale

        // Clear canvas with transparency
        ctx.clearRect(0, 0, width, height)

        try {
          // Helper function to draw image maintaining aspect ratio
          const drawImage = (image: HTMLImageElement) => {
            ctx.drawImage(image, 0, 0, width, height)
          }

          // Draw base body
          const bodyPath = "/images/alien/body/body.png"
          if (imageCache[bodyPath]) {
            drawImage(imageCache[bodyPath])
          }

          // Draw head
          const headPath = "/images/alien/body/head.png"
          if (imageCache[headPath]) {
            drawImage(imageCache[headPath])
          }

          // Draw selected face traits
          if (selectedTraits.face && imageCache[selectedTraits.face]) {
            drawImage(imageCache[selectedTraits.face])
          }

          // Draw selected hair
          if (selectedTraits.hair && imageCache[selectedTraits.hair]) {
            drawImage(imageCache[selectedTraits.hair])
          }

          // Draw clothes
          const clothesPath = "/images/alien/body/cothes.png"
          if (imageCache[clothesPath]) {
            drawImage(imageCache[clothesPath])
          }
        } catch (error) {
          console.error("Error drawing alien:", error)
        }
      }

      // Draw to buffer first
      drawAlien(bufferCtx, 1, true).then(() => {
        // Copy from buffer to display canvas
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height)
        displayCtx.drawImage(bufferCanvas, 0, 0)
      })

      // Draw high-res output separately
      drawAlien(outputCtx, OUTPUT_SCALE, false)
    }, [selectedTraits, element, isImagesLoaded])

    // Get dimensions for the container
    const { width: naturalWidth, height: naturalHeight } = getBaseDimensions()

    return (
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center lg:items-end rounded-normal "
        style={{
          backgroundImage: `url(${element.replace(".png", "-bg.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-fit h-fit max-w-full max-h-full">
          {/* Visible canvas for display */}
          <canvas
            ref={localCanvasRef}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: `${naturalWidth}px`,
              maxHeight: `${naturalHeight}px`,
              display: "block",
              objectFit: "contain",
            }}
            className="max-sm:h-64 max-sm:w-auto max-sm:object-contain"
          />
          {/* Hidden canvases */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <canvas ref={bufferCanvasRef} style={{ display: "none" }} />
        </div>
      </div>
    )
  }
)

AlienRenderer.displayName = "AlienRenderer"
