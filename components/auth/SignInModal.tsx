"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Back, TwitterX, Wallet } from "@/components/ui/icons"

import { Button } from "../ui/button"
import IconButton from "../ui/icon-button"
import { Input } from "../ui/input"

type Step = "initial" | "invite-code" | "create-alien"

export function SignInModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [currentStep, setCurrentStep] = useState<Step>("initial")

  const steps = [
    {
      key: "initial",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl  text-center  glass-effect w-max rounded-2xl h-60 lg:h-70 flex items-center justify-center px-6">
              Log In or Sign Up
            </h2>
            <IconButton onClick={onClose}>
              <Back />
            </IconButton>
          </div>

          <div className="glass-effect w-full  rounded-2xl p-3 lg:p-6">
            <div className="glass-effect p-4 rounded-lg !border-none">
              <p className="text-xs text-white/50 ">
                By connecting a wallet, you agree to{" "}
                <a href="#" className="text-white">
                  Terms of Service
                </a>{" "}
                and acknowledge that you have read and understand the{" "}
                <a href="#" className="text-white">
                  Protocol Disclaimer
                </a>
                .
              </p>
            </div>
            <div className=" w-full mt-3 lg:mt-6 space-y-3 lg:space-y-4">
              <button
                className="flex border w-full px-6 h-60 lg:h-70 rounded-lg items-center  gap-2 lg:gap-4 font-inter hover:bg-white/5 transition-[background] duration-300"
                onClick={() => setCurrentStep("invite-code")}
              >
                <TwitterX size={32} />
                Log in with Twitter
              </button>
              <button
                className="flex border w-full px-6 h-60 lg:h-70 rounded-lg items-center gap-2 lg:gap-4 font-inter hover:bg-white/5 transition-[background] duration-300"
                onClick={() => setCurrentStep("invite-code")}
              >
                <Wallet size={32} />
                Continue with a wallet
              </button>
            </div>
            <p className="text-xs text-white/50  mt-6 hidden lg:block">
              © Protected by Privy
            </p>
          </div>
        </motion.div>
      ),
    },
    {
      key: "invite-code",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl  text-center  glass-effect w-max rounded-2xl h-60 lg:h-70 flex items-center justify-center px-6">
              Your Invite Code
            </h2>
            <IconButton onClick={() => setCurrentStep("initial")}>
              <Back />
            </IconButton>
          </div>

          <div className="glass-effect w-full  rounded-2xl p-3 lg:p-6 lg:space-y-6">
            <div className="max-lg:glass-effect max-lg:p-4 max-lg:rounded-lg max-lg:!border-none">
              <p className="text-sm lg:text-lg">
                Alienzone is currently in beta. Get an invite code to start
                playing! The easiest way to get an invite code is to join our{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Telegram
                </a>
                .
              </p>
            </div>

            <Input placeholder="Enter your code" className="mt-4" />
            <Button
              className="w-full btn-secondary mt-20"
              onClick={() => setCurrentStep("create-alien")}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      ),
    },
    {
      key: "create-alien",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col gap-4 w-full max-w-7xl "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl  text-center  glass-effect w-max rounded-2xl h-60 lg:h-70 flex items-center justify-center px-6">
              Create your Alien
            </h2>
            <IconButton onClick={() => setCurrentStep("invite-code")}>
              <Back />
            </IconButton>
          </div>

          <div className="glass-effect w-full  rounded-2xl p-3 lg:p-6 lg:space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side - Character Preview */}
              <div className="glass-effect rounded-xl aspect-square flex items-center justify-center lg:w-[35%]">
                <div className="relative w-full h-full">
                  <img
                    src="/images/landing/character-preview.png"
                    alt="Character Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Right side - Customization Options */}
              <div className="space-y-6 flex-1">
                {/* Element Selection */}
                <div className="space-y-3">
                  <h3 className="text-lg">Choose your Element</h3>
                  <p className="text-xs ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <button
                          key={index}
                          className={`aspect-square rounded-lg glass-effect hover:bg-white/10 transition-colors ${
                            index === 2 ? "ring-2 ring-green-500" : ""
                          }`}
                        >
                          <Image
                            src={`/images/landing/elements/element-${index + 1}.png`}
                            alt="Element"
                            fill
                            className="w-full h-full object-contain"
                          />
                        </button>
                      ))}
                  </div>
                </div>

                {/* Hair Selection */}
                <div className="space-y-3">
                  <h3 className="text-lg">Choose your Hair</h3>
                  <p className="text-xs ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <button
                          key={index}
                          className={`aspect-square rounded-lg glass-effect hover:bg-white/10 transition-colors ${
                            index === 4 ? "ring-2 ring-green-500" : ""
                          }`}
                        />
                      ))}
                  </div>
                </div>

                {/* Face Selection */}
                <div className="space-y-3">
                  <h3 className="text-lg">Choose your Face</h3>
                  <p className="text-xs ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <button
                          key={index}
                          className={`aspect-square rounded-lg glass-effect hover:bg-white/10 transition-colors ${
                            index === 0 ? "ring-2 ring-green-500" : ""
                          }`}
                        />
                      ))}
                  </div>
                </div>

                {/* Continue Button */}
                <Button className="w-full btn-secondary mt-6">Continue</Button>
              </div>
            </div>
          </div>
        </motion.div>
      ),
    },
  ]

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep("initial")
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
        >
          <div
            className={cn(
              "fixed inset-0 bg-black/5 backdrop-blur-lg transition-all duration-300"
            )}
            // onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="w-full flex items-center justify-center z-10"
          >
            <AnimatePresence mode="wait">
              {steps.find((step) => step.key === currentStep)?.content}
            </AnimatePresence>
            <div className="flex items-center justify-center gap-4 w-full fixed bottom-24 left-0 ">
              {steps.map((step) => (
                <div
                  key={step.key}
                  className={cn(
                    "w-8 h-px  rounded-full",
                    step.key === currentStep ? "bg-[#FFFFFF]" : "bg-[#D9D9D980]"
                  )}
                ></div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
