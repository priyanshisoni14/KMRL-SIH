"use client"

import { useState } from "react"
import { Search, Filter, SortAsc, Calendar, Building, AlertCircle, Eye, Download, Share } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar as CalendarComponent } from "./ui/calendar"
import { format } from "date-fns"
import { useLanguage } from "./language-provider"
import { DocumentView } from "./document-view"

export const SearchDiscovery = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [filters, setFilters] = useState({
    department: "All Departments",
    priority: "All Priorities",
    dateFrom: null,
    dateTo: null,
    status: "",
    documentType: "All Types",
  })
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const [allDocuments, setAllDocuments] = useState([
    {
      id: 1,
      type: "SafetyNotice",
      title: "Safety Protocol Update - Emergency Procedures",
      description:
        "Updated emergency procedures for metro operations including evacuation protocols and emergency contact information",
      noticeNumber: "SN-2024-001",
      severity: "Critical",
      issuedBy: "Safety Department",
      validUntil: "2024-12-31",
      priority: "high",
      date: "2024-01-15",
      createdAt: "2024-01-15T10:30:00Z",
      departments: ["Engineering", "Operations"],
      status: "Active",
      fileSize: "2.4 MB",
      lastModified: "2024-01-15",
    },
    {
      id: 2,
      type: "Tender",
      title: "Tender Document - Track Maintenance Contract",
      description: "Annual track maintenance contract tender for comprehensive track repair and maintenance services",
      tenderId: "2025_KMRL_782579_1",
      tenderNo: "KMRL/PROC/TENDER/2025-26/038",
      nameOfWork: "Track Maintenance and Repair Services",
      contractValue: 5000000,
      openingDate: "2024-02-01",
      priority: "high",
      date: "2024-01-14",
      createdAt: "2024-01-14T09:15:00Z",
      departments: ["Procurement", "Engineering"],
      status: "Open",
      fileSize: "5.1 MB",
      lastModified: "2024-01-14",
    },
    {
      id: 3,
      type: "JobCard",
      title: "Inspection Report - Rolling Stock Unit 101",
      description:
        "Monthly inspection report for rolling stock unit 101 including mechanical and electrical systems check",
      jobNumber: "JC-2024-0156",
      assignedTo: "Rajesh Kumar",
      status: "In Progress",
      dueDate: "2024-01-20",
      priority: "medium",
      date: "2024-01-13",
      createdAt: "2024-01-13T14:20:00Z",
      departments: ["Engineering"],
      fileSize: "1.8 MB",
      lastModified: "2024-01-13",
    },
    {
      id: 4,
      type: "WorkOrder",
      title: "Signal System Upgrade - Phase 2",
      description: "Upgrade of the signal system for improved efficiency and safety measures across all stations",
      workOrderId: "WO-2024-0045",
      assignedTo: "Technical Team",
      status: "Pending",
      dueDate: "2024-01-18",
      priority: "medium",
      date: "2024-01-12",
      createdAt: "2024-01-12T11:45:00Z",
      departments: ["Engineering", "Operations"],
      fileSize: "3.2 MB",
      lastModified: "2024-01-12",
    },
    {
      id: 5,
      type: "EngineeringDrawing",
      title: "Platform Extension - Station 12",
      description: "Technical drawing for platform extension project at Station 12 including structural modifications",
      drawingNumber: "ED-2024-0001",
      revision: "Rev-C",
      preparedBy: "Design Team",
      approvedBy: "Chief Engineer",
      priority: "high",
      date: "2024-01-10",
      createdAt: "2024-01-10T15:00:00Z",
      departments: ["Engineering"],
      status: "Approved",
      fileSize: "8.7 MB",
      lastModified: "2024-01-10",
    },
    {
      id: 6,
      type: "MaintenanceReport",
      title: "Weekly Maintenance Summary - Week 2",
      description: "Comprehensive weekly maintenance report covering all rolling stock units and infrastructure",
      reportNumber: "MR-2024-0003",
      priority: "low",
      date: "2024-01-07",
      createdAt: "2024-01-07T16:30:00Z",
      departments: ["Engineering"],
      status: "Completed",
      fileSize: "4.5 MB",
      lastModified: "2024-01-07",
    },
    {
      id: 7,
      type: "ComplianceDocument",
      title: "CMRS Directive - Safety Standards Update",
      description: "Updated safety standards and compliance requirements from Commissioner of Metro Railway Safety",
      documentNumber: "CD-2024-0004",
      priority: "high",
      date: "2024-01-06",
      createdAt: "2024-01-06T14:00:00Z",
      departments: ["Legal", "Engineering"],
      status: "Under Review",
      fileSize: "6.3 MB",
      lastModified: "2024-01-06",
    },
    {
      id: 8,
      type: "VendorInvoice",
      title: "Invoice - Electrical Components Q4 2023",
      description: "Quarterly invoice for electrical components and spare parts procurement",
      invoiceNumber: "VI-2024-0002",
      amount: 250000,
      vendor: "ElectroTech Solutions",
      priority: "medium",
      date: "2024-01-05",
      createdAt: "2024-01-05T13:15:00Z",
      departments: ["Finance", "Procurement"],
      status: "Paid",
      fileSize: "1.2 MB",
      lastModified: "2024-01-05",
    },
  ])

  // Filter and search logic
  const filteredDocuments = allDocuments.filter((doc) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = doc.title.toLowerCase().includes(query)
      const matchesDescription = doc.description.toLowerCase().includes(query)
      const matchesType = doc.type.toLowerCase().includes(query)
      const matchesDepartments = doc.departments.some((dept) => dept.toLowerCase().includes(query))

      if (!matchesTitle && !matchesDescription && !matchesType && !matchesDepartments) {
        return false
      }
    }

    // Department filter
    if (filters.department !== "All Departments" && !doc.departments.includes(filters.department)) {
      return false
    }

    // Priority filter
    if (filters.priority !== "All Priorities" && doc.priority !== filters.priority) {
      return false
    }

    // Document type filter
    if (filters.documentType !== "All Types" && doc.type !== filters.documentType) {
      return false
    }

    // Status filter
    if (filters.status && doc.status !== filters.status) {
      return false
    }

    if (filters.dateFrom) {
      const docDate = new Date(doc.date)
      const fromDate = new Date(filters.dateFrom)
      if (docDate < fromDate) {
        return false
      }
    }

    if (filters.dateTo) {
      const docDate = new Date(doc.date)
      const toDate = new Date(filters.dateTo)
      // Set time to end of day for 'to' date
      toDate.setHours(23, 59, 59, 999)
      if (docDate > toDate) {
        return false
      }
    }

    return true
  })

  // Sort logic
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case "date":
        aValue = new Date(a.date)
        bValue = new Date(b.date)
        break
      case "title":
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        aValue = priorityOrder[a.priority] || 0
        bValue = priorityOrder[b.priority] || 0
        break
      case "type":
        aValue = a.type.toLowerCase()
        bValue = b.type.toLowerCase()
        break
      default:
        return 0
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      department: "All Departments",
      priority: "All Priorities",
      dateFrom: null,
      dateTo: null,
      status: "",
      documentType: "All Types",
    })
    setSearchQuery("")
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-priority-high text-white"
      case "medium":
        return "bg-priority-medium text-white"
      case "low":
        return "bg-priority-low text-white"
      default:
        return "bg-muted"
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return t("highPriority")
      case "medium":
        return t("mediumPriority")
      case "low":
        return t("lowPriority")
      default:
        return priority
    }
  }

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc)
  }

  const handleCloseDocument = () => {
    setSelectedDocument(null)
  }

  const handleUpdateDocument = (updatedDoc) => {
    setAllDocuments((prev) => prev.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc)))
    console.log("Document updated:", updatedDoc)
  }

  window.addDocumentToList = (newDoc) => {
    setAllDocuments((prev) => [newDoc, ...prev])
  }

  return (
    <div className="p-6 space-y-6">
      {/* Search Header */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("searchDiscovery")}</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents, descriptions, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-base"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Department Filter */}
          <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
            <SelectTrigger className="w-48">
              <Building className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("department")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Departments">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Procurement">Procurement</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="HR">Human Resources</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
            <SelectTrigger className="w-40">
              <AlertCircle className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("priority")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Priorities">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          {/* Document Type Filter */}
          <Select value={filters.documentType} onValueChange={(value) => handleFilterChange("documentType", value)}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="JobCard">Job Cards</SelectItem>
              <SelectItem value="Tender">Tenders</SelectItem>
              <SelectItem value="SafetyNotice">Safety Notices</SelectItem>
              <SelectItem value="EngineeringDrawing">Engineering Drawings</SelectItem>
              <SelectItem value="WorkOrder">Work Orders</SelectItem>
              <SelectItem value="MaintenanceReport">Maintenance Reports</SelectItem>
              <SelectItem value="ComplianceDocument">Compliance Documents</SelectItem>
              <SelectItem value="VendorInvoice">Vendor Invoices</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48 bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                {filters.dateFrom ? format(filters.dateFrom, "MMM dd, yyyy") : "Date From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={filters.dateFrom}
                onSelect={(date) => handleFilterChange("dateFrom", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48 bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                {filters.dateTo ? format(filters.dateTo, "MMM dd, yyyy") : "Date To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={filters.dateTo}
                onSelect={(date) => handleFilterChange("dateTo", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedDocuments.length} of {allDocuments.length} documents
        </p>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {sortedDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        doc.priority === "high"
                          ? "bg-priority-high"
                          : doc.priority === "medium"
                            ? "bg-priority-medium"
                            : "bg-priority-low"
                      }`}
                    />
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{doc.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>ID: {doc.id}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span>Status: {doc.status}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {doc.departments.map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    <Badge className={getPriorityColor(doc.priority)}>{getPriorityText(doc.priority)}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                    <Eye className="h-4 w-4 mr-1" />
                    {t("view")}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or clearing the filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Document View Modal */}
      {selectedDocument && (
        <DocumentView document={selectedDocument} onClose={handleCloseDocument} onUpdate={handleUpdateDocument} />
      )}
    </div>
  )
}
