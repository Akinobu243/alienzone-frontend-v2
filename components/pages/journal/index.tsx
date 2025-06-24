import { useEffect, useState } from "react"
import Image from "next/image"
import { CloudLightning } from "lucide-react"

import { cn } from "@/lib/utils"
import useClickSound from "@/hooks/use-click-sound"

import { journalData } from "./data"

const JournalTabs = [
  {
    label: "All",
    value: "all",
    icon: CloudLightning,
  },
  {
    label: "Alien Gear",
    value: "gear",
    icon: CloudLightning,
  },
  {
    label: "Alien Raid",
    value: "raid",
    icon: CloudLightning,
  },
  {
    label: "Dojo Items",
    value: "dojo",
    icon: CloudLightning,
  },
]

const JournalPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [filteredItems, setFilteredItems] = useState<any[]>(journalData)
  const playClickSound = useClickSound("/sounds/click.mp3")

  // Handle tab change
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }

  // Filter inventory items based on the selected tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredItems(journalData)
    } else if (activeTab === "gear") {
      setFilteredItems(journalData?.filter((item) => item.type === "gear"))
    } else if (activeTab === "raid") {
      setFilteredItems(journalData?.filter((item) => item.type === "raid"))
    } else if (activeTab === "dojo") {
      setFilteredItems(journalData?.filter((item) => item.type === "dojo"))
    }
  }, [activeTab])

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col lg:flex-row gap-3 overflow-hidden">
        <div
          className={cn(
            "w-full h-full bg-white/5 backdrop-blur-lg rounded p-4 overflow-hidden block"
          )}
        >
          {/* Tabs - scrollable on small screens */}
          <div className="flex gap-2 max-lg:flex-wrap pb-2 scrollbar-hide">
            {JournalTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  playClickSound()
                  handleTabChange(tab.value)
                }}
                className={cn(
                  "px-3 sm:px-4 h-10 lg:w-full rounded-lg border border-white/10 whitespace-nowrap flex items-center gap-2 justify-between text-xs sm:text-sm transition-all duration-300",
                  activeTab === tab.value ? "bg-white/20" : "bg-white/5"
                )}
              >
                <span>{tab.label}</span>
                <tab.icon className="w-4 h-4 hidden sm:block" />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mt-4 pb-20 h-full overflow-y-auto">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "w-full h-full backdrop-blur-lg bg-white/5 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-white/10",
                  activeTab === "all" ? "h-full" : "h-max"
                )}
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image || ""}
                    alt="item"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalPage
