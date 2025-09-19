"use client"

import { useState } from "react"
import { LanguageProvider } from "../components/language-provider"
import { Header } from "../components/header"
import { Sidebar } from "../components/sidebar"
import { Dashboard } from "../components/dashboard"
import { SearchDiscovery } from "../components/search-discovery"
import { DocumentProcessing } from "../components/document-processing"
import { TemplateManagement } from "../components/template-management"
import { UserManagement } from "../components/user-management"

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard"
      case "search":
        return "Search & Discovery"
      case "processing":
        return "Document Processing"
      case "templates":
        return "Template Management"
      case "users":
        return "User Management"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "search":
        return <SearchDiscovery />
      case "processing":
        return <DocumentProcessing />
      case "templates":
        return <TemplateManagement />
      case "users":
        return <UserManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={getPageTitle()} />
          <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        </div>
      </div>
    </LanguageProvider>
  )
}
