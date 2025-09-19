"use client"

import { useState } from "react"
import { X, Edit, Save, FileText, Languages, Eye, History, Link } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useLanguage } from "./language-provider"

export const DocumentView = ({ document, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showSidePanel, setShowSidePanel] = useState(false)
  const [sidePanelType, setSidePanelType] = useState("summary") // summary, translation, ocr
  const [showVersions, setShowVersions] = useState(false)
  const [showLinkedDocs, setShowLinkedDocs] = useState(false)
  const [editedDocument, setEditedDocument] = useState(document)
  const { t } = useLanguage()

  // Mock data for demonstration
  const mockSummary =
    "This document outlines critical safety procedures for emergency situations in the metro system. Key points include evacuation protocols, communication procedures, and coordination with emergency services."
  const mockTranslation = "ഈ രേഖ മെട്രോ സിസ്റ്റത്തിലെ അടിയന്തര സാഹചര്യങ്ങൾക്കുള്ള നിർണായക സുരക്ഷാ നടപടിക്രമങ്ങൾ വിവരിക്കുന്നു."
  const mockOCR =
    "Extracted text from document using OCR technology. This includes all readable text content from scanned documents."

  const mockVersions = [
    { id: 1, version: "v1.3", date: "2024-01-15", editor: "Rajesh Kumar", changes: "Updated safety protocols" },
    { id: 2, version: "v1.2", date: "2024-01-10", editor: "Priya Nair", changes: "Added emergency contacts" },
    { id: 3, version: "v1.1", date: "2024-01-05", editor: "Suresh Kumar", changes: "Initial draft" },
  ]

  const mockLinkedDocs = [
    { id: 1, name: "Emergency Response Plan", department: "Engineering", date: "2024-01-14", priority: "high" },
    { id: 2, name: "Safety Training Manual", department: "HR", date: "2024-01-12", priority: "medium" },
    { id: 3, name: "Equipment Maintenance Log", department: "Engineering", date: "2024-01-10", priority: "low" },
  ]

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(editedDocument)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedDocument(document)
    setIsEditing(false)
  }

  const handleFieldChange = (field, value) => {
    setEditedDocument((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const openSidePanel = (type) => {
    setSidePanelType(type)
    setShowSidePanel(true)
  }

  const renderDocumentFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Document ID</label>
            <Input value={editedDocument.id} disabled className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Created Date</label>
            <Input value={editedDocument.createdAt} disabled className="mt-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={editedDocument.title || ""}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={editedDocument.description || ""}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
            rows={3}
          />
        </div>
      </>
    )

    // Render fields based on document type
    switch (document.type) {
      case "JobCard":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Job Number</label>
                <Input
                  value={editedDocument.jobNumber || ""}
                  onChange={(e) => handleFieldChange("jobNumber", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editedDocument.status}
                  onValueChange={(value) => handleFieldChange("status", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Assigned To</label>
                <Input
                  value={editedDocument.assignedTo || ""}
                  onChange={(e) => handleFieldChange("assignedTo", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={editedDocument.dueDate || ""}
                  onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "Tender":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tender ID</label>
                <Input
                  value={editedDocument.tenderId || ""}
                  onChange={(e) => handleFieldChange("tenderId", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tender Number</label>
                <Input
                  value={editedDocument.tenderNo || ""}
                  onChange={(e) => handleFieldChange("tenderNo", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Name of Work</label>
              <Input
                value={editedDocument.nameOfWork || ""}
                onChange={(e) => handleFieldChange("nameOfWork", e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Contract Value</label>
                <Input
                  type="number"
                  value={editedDocument.contractValue || ""}
                  onChange={(e) => handleFieldChange("contractValue", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Opening Date</label>
                <Input
                  type="date"
                  value={editedDocument.openingDate || ""}
                  onChange={(e) => handleFieldChange("openingDate", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "SafetyNotice":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Notice Number</label>
                <Input
                  value={editedDocument.noticeNumber || ""}
                  onChange={(e) => handleFieldChange("noticeNumber", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Severity</label>
                <Select
                  value={editedDocument.severity}
                  onValueChange={(value) => handleFieldChange("severity", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Issued By</label>
                <Input
                  value={editedDocument.issuedBy || ""}
                  onChange={(e) => handleFieldChange("issuedBy", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Valid Until</label>
                <Input
                  type="date"
                  value={editedDocument.validUntil || ""}
                  onChange={(e) => handleFieldChange("validUntil", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      case "EngineeringDrawing":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Drawing Number</label>
                <Input
                  value={editedDocument.drawingNumber || ""}
                  onChange={(e) => handleFieldChange("drawingNumber", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Revision</label>
                <Input
                  value={editedDocument.revision || ""}
                  onChange={(e) => handleFieldChange("revision", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Prepared By</label>
                <Input
                  value={editedDocument.preparedBy || ""}
                  onChange={(e) => handleFieldChange("preparedBy", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Approved By</label>
                <Input
                  value={editedDocument.approvedBy || ""}
                  onChange={(e) => handleFieldChange("approvedBy", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </>
        )

      default:
        return commonFields
    }
  }

  const renderSidePanel = () => {
    let content = ""
    let title = ""

    switch (sidePanelType) {
      case "summary":
        title = t("summarize")
        content = mockSummary
        break
      case "translation":
        title = t("translate")
        content = mockTranslation
        break
      case "ocr":
        title = "OCR"
        content = mockOCR
        break
    }

    return (
      <div className="w-1/2 border-l bg-card/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowSidePanel(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{document.title || `Document ${document.id}`}</h2>
            <div className="flex gap-2">
              {document.departments?.map((dept) => (
                <Badge key={dept} variant="outline">
                  {dept}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => openSidePanel("summary")}>
              <FileText className="h-4 w-4 mr-1" />
              {t("summarize")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => openSidePanel("translation")}>
              <Languages className="h-4 w-4 mr-1" />
              {t("translate")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => openSidePanel("ocr")}>
              <Eye className="h-4 w-4 mr-1" />
              OCR
            </Button>
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  {t("update")}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  {t("cancel")}
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                {t("edit")}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className={`${showSidePanel ? "w-1/2" : "w-full"} p-6 overflow-y-auto transition-all duration-300`}>
            <div className="space-y-6">{renderDocumentFields()}</div>
          </div>
          {showSidePanel && renderSidePanel()}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowVersions(!showVersions)} className="gap-2">
                <History className="h-4 w-4" />
                {t("versionControl")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowLinkedDocs(!showLinkedDocs)} className="gap-2">
                <Link className="h-4 w-4" />
                {t("linkedDocuments")}
              </Button>
            </div>
          </div>

          {/* Version Control Panel */}
          {showVersions && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">{t("versionControl")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockVersions.map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <span className="font-medium">{version.version}</span>
                        <span className="text-sm text-muted-foreground ml-2">{version.date}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">by</span> {version.editor}
                      </div>
                      <div className="text-sm text-muted-foreground">{version.changes}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Linked Documents Panel */}
          {showLinkedDocs && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">{t("linkedDocuments")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockLinkedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            doc.priority === "high"
                              ? "bg-priority-high"
                              : doc.priority === "medium"
                                ? "bg-priority-medium"
                                : "bg-priority-low"
                          }`}
                        />
                        <div>
                          <span className="font-medium text-sm">{doc.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {doc.department}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
