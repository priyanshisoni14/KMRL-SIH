"use client"

import { useState } from "react"
import { Bell, Moon, Sun, Globe, ChevronDown, User, HelpCircle, LogOut, X } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-provider"

export const Header = ({ title = "Dashboard" }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Safety Notice",
      message: "Emergency safety protocol updated",
      time: "2 min ago",
      priority: "high",
    },
    {
      id: 2,
      title: "Tender Document",
      message: "New tender document requires review",
      time: "15 min ago",
      priority: "medium",
    },
    {
      id: 3,
      title: "Maintenance Report",
      message: "Weekly maintenance report submitted",
      time: "1 hour ago",
      priority: "low",
    },
  ]

  // Hardcoded user data as requested
  const user = {
    name: "Rajesh Kumar",
    role: "Rolling Stock Engineer",
    department: "Engineering",
  }

  const handleProfile = () => {
    console.log("Profile clicked")
    // In a real app, this would navigate to profile page
  }

  const handleHelp = () => {
    console.log("Help clicked")
    // In a real app, this would open help documentation
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    // In a real app, this would handle logout
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>

            {showNotifications && (
              <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">{t("notifications")}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.priority === "high"
                                ? "bg-priority-high"
                                : notification.priority === "medium"
                                  ? "bg-priority-medium"
                                  : "bg-priority-low"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Language Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.department}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleHelp}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
