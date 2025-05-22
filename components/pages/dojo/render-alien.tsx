import { forwardRef, useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

import { useIsMobile } from "@/hooks/useIsMobile"

interface AlienRendererProps {
  selectedTraits: {
    hair: string
    eyes: string
    mouth: string
    element: string
  }
  element: string
}

// Cache for loaded images with a timestamp to help with cache busting
const imageCache: {
  [key: string]: { img: HTMLImageElement; timestamp: number }
} = {}

// Background image cache to prevent flickering
const backgroundCache: { [key: string]: string } = {}

// Base images that don't change
const BASE_IMAGES = [
  "/images/alien/body/body.png",
  "/images/alien/body/head.png",
  "/images/alien/body/cothes.png",
]

// Preload an image and store in cache
const preloadImage = (
  src: string,
  forceFresh = false
): Promise<HTMLImageElement> => {
  // Skip empty or invalid URLs
  if (!src || typeof src !== "string" || src.trim() === "") {
    return Promise.reject(new Error(`Invalid image source: ${src}`))
  }

  // Add cache busting parameter to avoid browser cache issues
  const cacheBustedSrc = forceFresh ? `${src}?cb=${Date.now()}` : src

  // Return cached image if available and not forcing a fresh load
  if (imageCache[src] && !forceFresh) {
    // If cached version is older than 5 minutes, refresh in background but still return cached
    const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
    if (Date.now() - imageCache[src].timestamp > CACHE_TTL) {
      // Refresh the cache in the background
      refreshCachedImage(src)
    }
    return Promise.resolve(imageCache[src].img)
  }

  return new Promise((resolve, reject) => {
    const img = new Image()

    // Add proper error handling
    img.onerror = () => {
      console.error(`Failed to load image: ${cacheBustedSrc}`)
      // Try one more time with cache busting if not already forcing fresh
      if (!forceFresh) {
        console.log(`Retrying with cache busting for: ${src}`)
        preloadImage(src, true).then(resolve).catch(reject)
      } else {
        reject(new Error(`Failed to load image: ${src}`))
      }
    }

    img.onload = () => {
      imageCache[src] = {
        img: img,
        timestamp: Date.now(),
      }
      resolve(img)
    }

    // Set crossOrigin to anonymous for S3 bucket images
    img.crossOrigin = "anonymous"
    img.src = cacheBustedSrc
  })
}

// Helper function to refresh cached images in the background
const refreshCachedImage = (src: string) => {
  const freshImg = new Image()
  freshImg.crossOrigin = "anonymous"
  freshImg.onload = () => {
    imageCache[src] = {
      img: freshImg,
      timestamp: Date.now(),
    }
    console.log(`Refreshed cached image: ${src}`)
  }
  freshImg.src = `${src}?cb=${Date.now()}` // Add cache busting
}

// Clear all items from the cache that are older than the specified time
const clearStaleCache = (maxAge = 10 * 60 * 1000) => {
  // Default 10 minutes
  const now = Date.now()
  Object.keys(imageCache).forEach((key) => {
    // Don't clear base images from cache
    if (BASE_IMAGES.includes(key)) return

    if (now - imageCache[key].timestamp > maxAge) {
      delete imageCache[key]
    }
  })
}

// Helper function to get or create a cached background URL
const getCachedBackgroundUrl = (elementUrl: string): string => {
  if (!elementUrl || !elementUrl.includes(".png")) {
    return ""
  }

  const bgUrl = elementUrl.replace(".png", "-bg.png")

  // If we already have this background URL cached, return it
  if (backgroundCache[elementUrl]) {
    return backgroundCache[elementUrl]
  }

  // Otherwise, create a new cached URL with a cache-busting parameter
  // that will remain consistent for this session
  const cachedUrl = `${bgUrl}?cb=${Date.now()}`
  backgroundCache[elementUrl] = cachedUrl
  return cachedUrl
}

// Preload base images once at the start
const preloadBaseImages = async () => {
  try {
    await Promise.all(BASE_IMAGES.map((src) => preloadImage(src)))
    console.log("Base images preloaded successfully")
  } catch (error) {
    console.error("Failed to preload base images:", error)
  }
}

// Initialize base image preloading
preloadBaseImages()

export const RenderAlien = forwardRef<HTMLCanvasElement, AlienRendererProps>(
  ({ selectedTraits, element }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const localCanvasRef = useRef<HTMLCanvasElement>(null)
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
    const bufferCanvasRef = useRef<HTMLCanvasElement>(null)
    const [isImagesLoaded, setIsImagesLoaded] = useState(false)
    const [loadingAttempted, setLoadingAttempted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [baseImagesLoaded, setBaseImagesLoaded] = useState(false)
    const [isTraitsChanging, setIsTraitsChanging] = useState(false)
    const previousTraitsRef = useRef({
      hair: "",
      eyes: "",
      mouth: "",
      element: "",
    })

    const canvasRef =
      (ref as React.RefObject<HTMLCanvasElement>) || hiddenCanvasRef

    // High resolution output scale
    const OUTPUT_SCALE = 1
    const isMobile = useIsMobile()

    // Load base images on initial component mount only
    useEffect(() => {
      const loadBaseImages = async () => {
        try {
          await Promise.all(BASE_IMAGES.map((src) => preloadImage(src)))
          setBaseImagesLoaded(true)
        } catch (error) {
          console.error("Failed to load base images:", error)
          // Still mark as loaded to continue
          setBaseImagesLoaded(true)
        }
      }

      if (!baseImagesLoaded) {
        loadBaseImages()
      }
    }, [baseImagesLoaded])

    // Get base image dimensions from the first loaded image
    const getBaseDimensions = (): { width: number; height: number } => {
      if (imageCache["/images/alien/body/body.png"]) {
        const bodyImage = imageCache["/images/alien/body/body.png"].img
        return {
          width: bodyImage.naturalWidth,
          height: bodyImage.naturalHeight,
        }
      }
      return { width: 462, height: 462 } // Fallback dimensions
    }

    // Check if only trait images have changed (not base images)
    const haveTraitsChanged = () => {
      const prev = previousTraitsRef.current
      return (
        prev.hair !== selectedTraits.hair ||
        prev.eyes !== selectedTraits.eyes ||
        prev.mouth !== selectedTraits.mouth ||
        prev.element !== element
      )
    }

    // Check if only user-selected traits have changed (not element or base)
    const haveUserTraitsChanged = () => {
      const prev = previousTraitsRef.current
      return (
        prev.hair !== selectedTraits.hair ||
        prev.eyes !== selectedTraits.eyes ||
        prev.mouth !== selectedTraits.mouth
      )
    }

    // Preload trait images when traits change
    useEffect(() => {
      // Only trigger full reload if traits have actually changed
      if (!haveTraitsChanged() && loadingAttempted && !isLoading) {
        return
      }

      // Determine if only user traits changed (for smoother transitions)
      const onlyUserTraitsChanged =
        haveUserTraitsChanged() && previousTraitsRef.current.element === element

      // Set transition state
      setIsTraitsChanging(onlyUserTraitsChanged)

      // Clear stale cache entries periodically
      clearStaleCache()

      // Update reference to current traits
      previousTraitsRef.current = {
        hair: selectedTraits.hair,
        eyes: selectedTraits.eyes,
        mouth: selectedTraits.mouth,
        element: element,
      }

      setLoadingAttempted(true)

      // Only show loading indicator for major changes
      if (!onlyUserTraitsChanged) {
        setIsLoading(true)
      }

      setLoadingProgress(0)

      const loadTraitImages = async () => {
        try {
          // Create an array of trait image sources (no base images)
          const traitImageSources = [
            ...(selectedTraits.eyes ? [selectedTraits.eyes] : []),
            ...(selectedTraits.hair ? [selectedTraits.hair] : []),
            ...(selectedTraits.mouth ? [selectedTraits.mouth] : []),
            ...(element ? [element] : []),
          ]

          // Filter out empty or invalid URLs
          const validImageSources = traitImageSources.filter(
            (src) => src && typeof src === "string" && src.trim() !== ""
          )

          const totalImages = validImageSources.length
          let loadedImages = 0

          // Create an array of promises to load all images in parallel
          const loadPromises = validImageSources.map((src) =>
            preloadImage(src)
              .catch((err) => {
                console.error(`Failed to load image: ${src}`, err)
                return null // Return null for failed loads, but don't fail the Promise.all
              })
              .finally(() => {
                loadedImages++
                setLoadingProgress(
                  Math.floor((loadedImages / totalImages) * 100)
                )
              })
          )

          // Wait for all images to load (or fail)
          await Promise.all(loadPromises)

          setIsImagesLoaded(true)

          // Set loading to false after a short delay to ensure smooth transition
          setTimeout(
            () => {
              setIsLoading(false)
              setIsTraitsChanging(false)
            },
            onlyUserTraitsChanged ? 50 : 300
          )
        } catch (error) {
          console.error("Error in loadAllImages:", error)
          // Try to continue with whatever images were loaded
          if (Object.keys(imageCache).length > 0) {
            console.log(
              "Some images were loaded, attempting to render with available images"
            )
            setIsImagesLoaded(true)
            setTimeout(
              () => {
                setIsLoading(false)
                setIsTraitsChanging(false)
              },
              onlyUserTraitsChanged ? 50 : 300
            )
          }
        }
      }

      loadTraitImages()
    }, [
      selectedTraits.eyes,
      selectedTraits.mouth,
      selectedTraits.hair,
      element,
    ])

    // Trigger rendering whenever traits change or images load
    useEffect(() => {
      // Attempt to render even if not all images are loaded
      // This ensures we show whatever we have available
      if (!loadingAttempted || !baseImagesLoaded) return

      const renderAlien = () => {
        const displayCanvas = localCanvasRef.current
        const outputCanvas = canvasRef.current
        const bufferCanvas = bufferCanvasRef.current
        if (!displayCanvas || !outputCanvas || !bufferCanvas) {
          console.error("Canvas references not found")
          return
        }

        // Get natural dimensions from base image
        const { width: naturalWidth, height: naturalHeight } =
          getBaseDimensions()

        // Set up all canvases with correct dimensions
        const setupCanvas = (canvas: HTMLCanvasElement, scale: number = 1) => {
          canvas.width = naturalWidth * scale
          canvas.height = naturalHeight * scale
        }

        setupCanvas(displayCanvas)
        setupCanvas(bufferCanvas)
        setupCanvas(outputCanvas, OUTPUT_SCALE)

        const displayCtx = displayCanvas.getContext("2d", {
          alpha: true,
          willReadFrequently: true,
          preserveDrawingBuffer: true,
        }) as CanvasRenderingContext2D
        const outputCtx = outputCanvas.getContext("2d", {
          alpha: true,
        }) as CanvasRenderingContext2D
        const bufferCtx = bufferCanvas.getContext("2d", {
          alpha: true,
        }) as CanvasRenderingContext2D

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
            // Different opacity settings for base images vs traits
            if (isLoading) {
              ctx.globalAlpha = 0.6 // Reduced opacity while loading everything
            } else if (isTraitsChanging) {
              // For trait changes, keep base images solid but traits translucent
              ctx.globalAlpha = 1.0
            } else {
              ctx.globalAlpha = 1.0 // Full opacity when fully loaded
            }

            // Helper function to draw image maintaining aspect ratio
            const drawImage = (src: string, isBasePart = false) => {
              if (!src || typeof src !== "string" || src.trim() === "") {
                return false
              }

              // Set appropriate opacity based on whether it's a base part or trait
              if (isTraitsChanging) {
                ctx.globalAlpha = isBasePart ? 1.0 : 0.8
              }

              if (imageCache[src]) {
                ctx.drawImage(imageCache[src].img, 0, 0, width, height)
                return true
              } else {
                // Try to load the image on-demand if not in cache
                const img = new Image()
                img.crossOrigin = "anonymous"
                img.onload = () => {
                  imageCache[src] = { img, timestamp: Date.now() }
                  ctx.drawImage(img, 0, 0, width, height)

                  // Redraw the entire alien when this image loads
                  // This ensures the full alien is displayed once all parts are available
                  drawAlien(ctx, scale, showBackground)
                }
                img.onerror = () => {
                  console.error(`Failed to load image on-demand: ${src}`)
                  // Try one more time with cache busting
                  const retryImg = new Image()
                  retryImg.crossOrigin = "anonymous"
                  retryImg.onload = () => {
                    imageCache[src] = { img: retryImg, timestamp: Date.now() }
                    ctx.drawImage(retryImg, 0, 0, width, height)
                    drawAlien(ctx, scale, showBackground)
                  }
                  retryImg.src = `${src}?cb=${Date.now()}`
                }
                img.src = src
                return false
              }
            }

            // Draw base body (always at full opacity)
            drawImage("/images/alien/body/body.png", true)

            // Draw head (always at full opacity)
            drawImage("/images/alien/body/head.png", true)

            // Reset global alpha for trait images if necessary
            if (isTraitsChanging) {
              ctx.globalAlpha = 0.8 // Slightly transparent for changing traits
            }

            // Draw selected eyes traits
            if (selectedTraits.eyes) {
              drawImage(selectedTraits.eyes)
            }

            // Draw selected hair
            if (selectedTraits.hair) {
              drawImage(selectedTraits.hair)
            }

            // Draw selected mouth traits
            if (selectedTraits.mouth) {
              drawImage(selectedTraits.mouth)
            }

            // Reset alpha for clothes (base part)
            if (isTraitsChanging) {
              ctx.globalAlpha = 1.0
            }

            // Draw clothes (always at full opacity)
            drawImage("/images/alien/body/cothes.png", true)

            // Reset global alpha
            ctx.globalAlpha = 1.0
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
      }

      renderAlien()

      // Render again after a short delay to handle potential timing issues
      const timeoutId = setTimeout(() => {
        renderAlien()
      }, 200)

      return () => clearTimeout(timeoutId)
    }, [
      selectedTraits,
      element,
      isImagesLoaded,
      loadingAttempted,
      isLoading,
      isTraitsChanging,
      baseImagesLoaded,
    ])

    // Get dimensions for the container
    const { width: naturalWidth, height: naturalHeight } = getBaseDimensions()

    // Get cached background URL (calculated once)
    const backgroundImageUrl = element
      ? getCachedBackgroundUrl(element)
      : undefined

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-fit h-fit max-w-full max-h-full flex items-center justify-center">
          {/* Visible canvas for display */}
          <canvas
            ref={localCanvasRef}
            style={{
              width: isMobile ? "100%" : "45%",
              height: "100%",
              display: "block",
              objectFit: "contain",
              opacity: isLoading ? 0.7 : 1, // Additional opacity control on the canvas element
              transition: "opacity 0.3s ease-in-out",
            }}
            className="max-sm:h-64 max-sm:w-auto max-sm:object-contain"
          />
          {/* Loading overlay - only show for major changes */}
          {isLoading && !isTraitsChanging && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              </div>
              {loadingProgress > 0 && (
                <div className="mt-2 text-white text-sm bg-black/30 px-2 py-1 rounded-full">
                  {loadingProgress}%
                </div>
              )}
            </div>
          )}
          {/* Hidden canvases */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <canvas ref={bufferCanvasRef} style={{ display: "none" }} />
        </div>
      </div>
    )
  }
)

RenderAlien.displayName = "RenderAlien"
