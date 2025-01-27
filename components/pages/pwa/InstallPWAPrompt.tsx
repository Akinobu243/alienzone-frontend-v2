import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [shouldShowPrompt, setShouldShowPrompt] = useState(false)
  const [showManualInstructions, setShowManualInstructions] = useState(false)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  useEffect(() => {
    // Check if app is already installed
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone || // iOS
        document.referrer.includes("android-app://")

      setIsStandalone(isStandalone)
      return isStandalone
    }

    const checkInstallState = () => {
      // If not installed and on mobile, show the prompt
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && !checkStandalone()) {
        setShouldShowPrompt(true)
        // Show manual instructions immediately for iOS
        if (isIOS) {
          setShowManualInstructions(true)
        }
      }
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      checkInstallState()
    }

    // Initial checks
    checkInstallState()

    // Add listeners
    window.addEventListener("beforeinstallprompt", handler)
    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", () => {
        const isNowStandalone = checkStandalone()
        if (isNowStandalone) {
          setShouldShowPrompt(false)
        }
      })

    document.addEventListener("visibilitychange", checkInstallState)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      document.removeEventListener("visibilitychange", checkInstallState)
    }
  }, [isIOS])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowManualInstructions(true)
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShouldShowPrompt(false)
      } else {
        setShowManualInstructions(true)
      }
    } catch (error) {
      console.error("Error during installation:", error)
      setShowManualInstructions(true)
    }
  }

  if (isStandalone || !shouldShowPrompt) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gray-dark rounded-xl p-6 w-full max-w-sm space-y-6">
        <div className="space-y-4">
          {/* <div className="flex justify-center">
            <Image
              src="/images/add-to-home.png"
              alt="Add to Home Screen"
              width={100}
              height={100}
              className="w-24 h-24"
            />
          </div> */}
          <div>
            <h3 className="text-xl font-bold text-center">
              Add To Home Screen
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {isIOS ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                In your Safari browser menu:
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                <li>Tap the Share button</li>
                <li>Scroll down and tap &apos;Add to Home Screen&apos;</li>
                <li>Tap &apos;Add&apos; to confirm</li>
              </ol>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                In your Chrome browser menu:
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                <li>Tap the menu button (three dots)</li>
                <li>
                  Tap &apos;Install App&apos; or &apos;Add to Home Screen&apos;
                </li>
                <li>Tap &apos;Install&apos; to confirm</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
