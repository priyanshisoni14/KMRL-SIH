"use client"

import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  const translations = {
    en: {
      // Header
      notifications: "Notifications",
      profile: "Profile",
      settings: "Settings",
      help: "Help & Support",
      logout: "Logout",

      // Navigation
      dashboard: "Dashboard",
      searchDiscovery: "Search & Discovery",
      documentProcessing: "Document Processing",
      templateManagement: "Template Management",
      userManagement: "User Management",

      // Dashboard
      departmentOverview: "Department Overview",
      priorityDocuments: "Priority Documents",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",

      // Document actions
      view: "View",
      escalate: "Escalate",
      edit: "Edit",
      update: "Update Changes",
      translate: "Translate",
      summarize: "Summarize",
      ocr: "OCR",
      versionControl: "Version Control",
      linkedDocuments: "Linked Documents",

      // Common
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      upload: "Upload",
      create: "Create",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      department: "Department",
      priority: "Priority",
      date: "Date",
      status: "Status",
    },
    ml: {
      // Header
      notifications: "അറിയിപ്പുകൾ",
      profile: "പ്രൊഫൈൽ",
      settings: "ക്രമീകരണങ്ങൾ",
      help: "സഹായവും പിന്തുണയും",
      logout: "ലോഗൗട്ട്",

      // Navigation
      dashboard: "ഡാഷ്ബോർഡ്",
      searchDiscovery: "തിരയലും കണ്ടെത്തലും",
      documentProcessing: "ഡോക്യുമെന്റ് പ്രോസസ്സിംഗ്",
      templateManagement: "ടെംപ്ലേറ്റ് മാനേജ്മെന്റ്",
      userManagement: "ഉപയോക്തൃ മാനേജ്മെന്റ്",

      // Dashboard
      departmentOverview: "വകുപ്പ് അവലോകനം",
      priorityDocuments: "മുൻഗണനാ രേഖകൾ",
      highPriority: "ഉയർന്ന മുൻഗണന",
      mediumPriority: "ഇടത്തരം മുൻഗണന",
      lowPriority: "കുറഞ്ഞ മുൻഗണന",

      // Document actions
      view: "കാണുക",
      escalate: "ഉയർത്തുക",
      edit: "എഡിറ്റ് ചെയ്യുക",
      update: "മാറ്റങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക",
      translate: "വിവർത്തനം ചെയ്യുക",
      summarize: "സംഗ്രഹിക്കുക",
      ocr: "ഒ.സി.ആർ",
      versionControl: "പതിപ്പ് നിയന്ത്രണം",
      linkedDocuments: "ബന്ധിപ്പിച്ച രേഖകൾ",

      // Common
      search: "തിരയുക",
      filter: "ഫിൽട്ടർ",
      sort: "ക്രമീകരിക്കുക",
      upload: "അപ്‌ലോഡ് ചെയ്യുക",
      create: "സൃഷ്ടിക്കുക",
      save: "സേവ് ചെയ്യുക",
      cancel: "റദ്ദാക്കുക",
      close: "അടയ്ക്കുക",
      department: "വകുപ്പ്",
      priority: "മുൻഗണന",
      date: "തീയതി",
      status: "നില",
    },
  }

  const t = (key) => translations[language][key] || key

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ml" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>{children}</LanguageContext.Provider>
  )
}
