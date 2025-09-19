"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Eye, AlertTriangle } from "lucide-react"
import { useLanguage } from "./language-provider"
import { DocumentView } from "./document-view"

export const Dashboard = () => {
  const { t } = useLanguage()
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [escalatedDocuments, setEscalatedDocuments] = useState({})

  // Mock data for department overview
  const departmentStats = {
    high: 12,
    medium: 28,
    low: 45,
  }

  // Mock priority documents with more detailed structure
  const priorityDocuments = [
    {
      id: 1,
      type: "SafetyNotice",
      title: "Safety Protocol Update - Emergency Procedures",
      description: "Updated emergency procedures for metro operations",
      noticeNumber: "SN-2024-001",
      severity: "Critical",
      issuedBy: "Safety Department",
      validUntil: "2024-12-31",
      priority: "high",
      date: "2024-01-15",
      createdAt: "2024-01-15T10:30:00Z",
      departments: ["Engineering", "Operations"],
    },
    {
      id: 2,
      type: "Tender",
      title: "Tender Document - Track Maintenance Contract",
      description: "Annual track maintenance contract tender",
      tenderId: "2025_KMRL_782579_1",
      tenderNo: "KMRL/PROC/TENDER/2025-26/038",
      nameOfWork: "Track Maintenance and Repair Services",
      contractValue: 5000000,
      openingDate: "2024-02-01",
      priority: "high",
      date: "2024-01-14",
      createdAt: "2024-01-14T09:15:00Z",
      departments: ["Procurement", "Engineering"],
    },
    {
      id: 3,
      type: "JobCard",
      title: "Inspection Report - Rolling Stock Unit 101",
      description: "Monthly inspection of rolling stock unit",
      jobNumber: "JC-2024-0156",
      assignedTo: "Rajesh Kumar",
      status: "In Progress",
      dueDate: "2024-01-20",
      priority: "medium",
      date: "2024-01-13",
      createdAt: "2024-01-13T14:20:00Z",
      departments: ["Engineering"],
    },
    {
      id: 4,
      type: "WorkOrder",
      title: "Signal System Upgrade",
      description: "Upgrade of the signal system for improved efficiency",
      workOrderId: "WO-2024-0045",
      assignedTo: "John Doe",
      status: "Pending",
      dueDate: "2024-01-18",
      priority: "medium",
      date: "2024-01-12",
      createdAt: "2024-01-12T11:45:00Z",
      departments: ["Engineering"],
    },
    {
      id: 5,
      type: "JobCard",
      title: "Monthly Maintenance Schedule",
      description: "Monthly maintenance schedule for all departments",
      jobNumber: "JC-2024-0157",
      assignedTo: "Jane Smith",
      status: "Completed",
      dueDate: "2024-01-10",
      priority: "low",
      date: "2024-01-11",
      createdAt: "2024-01-11T08:30:00Z",
      departments: ["Engineering"],
    },
    {
      id: 6,
      type: "EngineeringDrawing",
      title: "Platform Extension",
      description: "Drawing for the extension of the platform",
      drawingNumber: "ED-2024-0001",
      priority: "high",
      date: "2024-01-10",
      createdAt: "2024-01-10T15:00:00Z",
      departments: ["Engineering"],
    },
    {
      id: 7,
      type: "VendorInvoice",
      title: "Electrical Components",
      description: "Invoice for electrical components purchase",
      invoiceNumber: "VI-2024-0002",
      amount: 250000,
      priority: "medium",
      date: "2024-01-09",
      createdAt: "2024-01-09T13:15:00Z",
      departments: ["Finance"],
    },
    {
      id: 8,
      type: "SafetyNotice",
      title: "Track Work Guidelines",
      description: "Guidelines for track work safety",
      noticeNumber: "SN-2024-002",
      severity: "High",
      issuedBy: "Safety Department",
      validUntil: "2024-11-30",
      priority: "high",
      date: "2024-01-08",
      createdAt: "2024-01-08T09:45:00Z",
      departments: ["Engineering"],
    },
    {
      id: 9,
      type: "MaintenanceReport",
      title: "Weekly Summary",
      description: "Weekly maintenance report for all units",
      reportNumber: "MR-2024-0003",
      priority: "low",
      date: "2024-01-07",
      createdAt: "2024-01-07T16:30:00Z",
      departments: ["Engineering"],
    },
    {
      id: 10,
      type: "ComplianceDocument",
      title: "CMRS Directive",
      description: "Compliance document for CMRS directive",
      documentNumber: "CD-2024-0004",
      priority: "high",
      date: "2024-01-06",
      createdAt: "2024-01-06T14:00:00Z",
      departments: ["Legal"],
    },
  ]

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
    // In a real app, this would update the document in the database
    console.log("Document updated:", updatedDoc)
    // Update the local state or refetch data
  }

  const handleEscalate = (docId) => {
    setEscalatedDocuments((prev) => ({
      ...prev,
      [docId]: {
        escalatedBy: "Rajesh Kumar",
        escalatedAt: new Date().toISOString(),
      },
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Department Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("departmentOverview")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("highPriority")}</CardTitle>
              <div className="w-4 h-4 rounded-full bg-priority-high"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.high}</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("mediumPriority")}</CardTitle>
              <div className="w-4 h-4 rounded-full bg-priority-medium"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.medium}</div>
              <p className="text-xs text-muted-foreground">Important documents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("lowPriority")}</CardTitle>
              <div className="w-4 h-4 rounded-full bg-priority-low"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.low}</div>
              <p className="text-xs text-muted-foreground">Informational documents</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Priority Documents */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("priorityDocuments")}</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {priorityDocuments.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        doc.priority === "high"
                          ? "bg-priority-high"
                          : doc.priority === "medium"
                            ? "bg-priority-medium"
                            : "bg-priority-low"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {doc.departments?.map((dept) => (
                          <Badge key={dept} variant="outline" className="text-xs">
                            {dept}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                        {escalatedDocuments[doc.id] && (
                          <Badge variant="destructive" className="text-xs">
                            Escalated by {escalatedDocuments[doc.id].escalatedBy}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge className={getPriorityColor(doc.priority)}>{getPriorityText(doc.priority)}</Badge>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                      <Eye className="h-4 w-4 mr-1" />
                      {t("view")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEscalate(doc.id)}
                      disabled={escalatedDocuments[doc.id]}
                    >
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {escalatedDocuments[doc.id] ? "Escalated" : t("escalate")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document View Modal */}
      {selectedDocument && (
        <DocumentView document={selectedDocument} onClose={handleCloseDocument} onUpdate={handleUpdateDocument} />
      )}
    </div>
  )
}
