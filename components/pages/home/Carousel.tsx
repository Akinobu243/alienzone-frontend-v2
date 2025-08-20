"use client"

import React from "react"
import Image from "next/image"
import type { EmblaCarouselType } from "embla-carousel"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const slides = [
  {
    title: "Earn every friday",
    description:
      "Players receive $ZONE based on their position in the leaderboard!",
    image: "/images/carousel/01.jpeg",
  },
  {
    title: "Become stronger",
    description:
      "With the Dojo items, your Alien grows in power and collects more rewards in raids.",
    image: "/images/carousel/02.jpeg",
  },
  {
    title: "Unleash your team",
    description:
      "It takes 9 copies of a Raider to reach Tier 3 and unlock its full power.",
    image: "/images/carousel/03.PNG",
  },
]

const HomeCarousel = () => {
  const [api, setApi] = React.useState<EmblaCarouselType | undefined>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden relative">
                <div className="relative h-[140px] lg:h-[234px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover"
                    fill
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(266.01deg, rgba(0, 0, 0, 0) -31.57%, rgba(0, 0, 0, 0.8) 100.11%)",
                    }}
                  />
                  <div className="absolute top-8 lg:top-20 left-5 lg:left-10 space-y-2 w-[90%] lg:w-[80%]">
                    <h2 className="text-18 lg:text-3xl font-bold text-white">
                      {slide.title}
                    </h2>
                    <p className="text-2xs lg:text-base leading-4 lg:leading-5">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        <div className="flex gap-2 justify-center absolute bottom-4 lg:bottom-10 left-5 lg:left-10 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`size-2 rounded-full transition-colors ${
                current === index ? "bg-white scale-110" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default HomeCarousel
