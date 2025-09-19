"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, LayoutDashboard, Search, FileText, Settings, Users } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { useLanguage } from "./language-provider"

export const Sidebar = ({ activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "search", label: t("searchDiscovery"), icon: Search },
    { id: "processing", label: t("documentProcessing"), icon: FileText },
    { id: "templates", label: t("templateManagement"), icon: Settings },
    { id: "users", label: t("userManagement"), icon: Users },
  ]

  return (
    <div
      className={cn(
        "border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && <h2 className="text-lg font-semibold text-primary">KMRL Hub</h2>}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", collapsed && "justify-center px-2")}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
