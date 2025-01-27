"use client"

import { Dispatch, SetStateAction, useRef, useState } from "react"
import Image from "next/image"
import { useAliens } from "@/store/hooks"
import { AuthUserData, CreateAlienData, Traits } from "@/types"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

import BrandButton from "@/components/ui/brand-button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import PreviousStepButton from "@/components/auth/previous-step-button"

import { AlienRenderer } from "./alien-renderer"

interface CreateAlienProps {
  current: number
  moveToPreviousStep: () => void
  moveToNextStep: () => void
  setUserData: Dispatch<SetStateAction<AuthUserData>>
  userData: AuthUserData
  createAlienData: CreateAlienData
  setCreateAlienData: Dispatch<SetStateAction<CreateAlienData>>
  traits: Traits | null
}

const CreateAlien = ({
  current,
  moveToPreviousStep,
  moveToNextStep,
  setUserData,
  userData,
  createAlienData,
  setCreateAlienData,
  traits,
}: CreateAlienProps) => {
  const { createAlien, createStatus } = useAliens()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTraits, setSelectedTraits] = useState<{
    hair: string
    face: string
  }>({
    hair: "",
    face: "",
  })

  const handleCreateAlien = async () => {
    // Validate required fields
    if (!createAlienData.name) {
      toast.error("Please enter a name for your alien")
      return
    }
    if (!createAlienData.element) {
      toast.error("Please select an element for your alien")
      return
    }
    if (!selectedTraits.hair) {
      toast.error("Please select a hair style for your alien")
      return
    }
    if (!selectedTraits.face) {
      toast.error("Please select a face for your alien")
      return
    }

    try {
      // Get canvas content as PNG
      const canvas = canvasRef.current
      if (!canvas) {
        toast.error("Failed to generate alien image")
        return
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Failed to convert canvas to blob"))
          }
        }, "image/png")
      })

      // const base64 = canvas.toDataURL("image/png")

      // testing with random body image
      // const blob = await fetch(
      //   "https://picsum.photos/200/300"
      // ).then((res) => res.blob())

      // Create file from blob with a unique name
      const file = new File(
        [blob],
        `${createAlienData.name.toLowerCase().replace(/\s+/g, "-")}.png`,
        { type: "image/png" }
      )

      // Create form data
      const formData = new FormData()
      formData.append("name", createAlienData.name)
      formData.append("element", createAlienData.element)
      formData.append("image", file)
      formData.append("strengthPoints", "100") // Default strength points

      await createAlien(formData)

      if (!createStatus.error) {
        moveToNextStep()
      }
    } catch (error) {
      console.error("Error creating alien:", error)
      toast.error("Failed to create alien. Please try again.")
    }
  }

  // useEffect(() => {
  //   if (traits) {
  //     setCreateAlienData({
  //       ...createAlienData,
  //       element: traits.Elements[0],
  //     })

  //     setSelectedTraits({
  //       ...selectedTraits,
  //       hair: traits.Hair[0],
  //       face: traits.Face[0],
  //     })
  //   }
  // }, [traits])

  return (
    <div className="w-full space-y-6 z-20">
      <div className="relative w-full flex items-center justify-between">
        <BrandButton className="items-start cursor-auto">
          Create your Alien
        </BrandButton>

        <PreviousStepButton
          current={current}
          moveToPreviousStep={moveToPreviousStep}
        />
      </div>

      {/* show loading if no traits are loaded */}
      {!traits && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}

      {traits && (
        <div className="p-6 rounded-normal border border-gray-light backdrop-blur-[40px] flex flex-col lg:flex-row gap-4 overflow-hidden">
          <div className="w-full lg:w-[662px]">
            <AlienRenderer
              ref={canvasRef}
              selectedTraits={selectedTraits}
              element={createAlienData.element}
            />
          </div>

          <div className="w-full flex flex-col gap-8 overflow-hidden px-2">
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-2xl">Name your Alien</h3>
                <input
                  type="text"
                  value={createAlienData.name}
                  onChange={(e) =>
                    setCreateAlienData({
                      ...createAlienData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter alien name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-dark text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5FFF95]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-2xl">Choose your Element</h3>
                <p className="text-white text-[12px] font-inter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <ScrollArea>
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap max-w-full no-scrollbar">
                  {traits?.Elements.map((element, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 p-0.5 rounded-lg shrink-0 cursor-pointer"
                      style={{
                        background:
                          createAlienData.element === element
                            ? "linear-gradient(360deg, #5FFF95 0%, rgba(95, 255, 149, 0) 100%)"
                            : "unset",
                      }}
                      onClick={() =>
                        setCreateAlienData({
                          ...createAlienData,
                          element: element,
                        })
                      }
                    >
                      <div className="w-full h-full bg-gray-dark rounded-lg flex items-center justify-center">
                        <Image
                          src={element}
                          alt="element image"
                          width={200}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-2xl">Choose your Hair</h3>
                <p className="text-off-white text-[12px] font-inter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <ScrollArea>
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap max-w-full no-scrollbar">
                  {traits?.Hair.map((hair, index) => (
                    <div
                      key={index}
                      className="min-w-20 h-20 p-0.5 rounded-lg cursor-pointer"
                      style={{
                        background:
                          selectedTraits.hair === hair
                            ? "linear-gradient(360deg, #5FFF95 0%, rgba(95, 255, 149, 0) 100%)"
                            : "unset",
                      }}
                      onClick={() =>
                        setSelectedTraits({
                          ...selectedTraits,
                          hair: hair,
                        })
                      }
                    >
                      <div className="w-full h-full bg-gray-dark rounded-lg flex items-center justify-center">
                        <Image
                          src={hair}
                          alt="hair image"
                          width={200}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-2xl">Choose your Face</h3>
                <p className="text-white text-[12px] font-inter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <ScrollArea>
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap max-w-full no-scrollbar">
                  {traits?.Face.map((face, index) => (
                    <div
                      key={index}
                      className="min-w-20 h-20 p-0.5 rounded-lg cursor-pointer"
                      style={{
                        background:
                          selectedTraits.face === face
                            ? "linear-gradient(360deg, #5FFF95 0%, rgba(95, 255, 149, 0) 100%)"
                            : "unset",
                      }}
                      onClick={() =>
                        setSelectedTraits({
                          ...selectedTraits,
                          face: face,
                        })
                      }
                    >
                      <div className="w-full h-full bg-gray-dark rounded-lg flex items-center justify-center">
                        <Image
                          src={face}
                          alt="face image"
                          width={200}
                          height={200}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <BrandButton
              className="items-start hover:-translate-y-1 duration-500 transition-transform w-full"
              blurColor="bg-[#96DFF4]"
              onClick={handleCreateAlien}
              disabled={createStatus.loading}
            >
              {createStatus.loading ? "Creating..." : "Continue"}
            </BrandButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateAlien
