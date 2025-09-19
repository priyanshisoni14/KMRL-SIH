"use client"

import { useState, useRef } from "react"
import { Upload, FileText, Mail, Database, Folder, Plus, Save, X, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Checkbox } from "./ui/checkbox"
import { Progress } from "./ui/progress"
import { useLanguage } from "./language-provider"

export const DocumentProcessing = () => {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    departments: [],
    linkedDocuments: [],
    dueDate: "",
    // Template-specific fields will be added dynamically
  })

  // Document templates based on the schema
  const documentTemplates = [
    {
      id: "JobCard",
      name: "Job Card",
      description: "Maintenance and work assignment cards",
      fields: [
        { name: "jobNumber", label: "Job Number", type: "text", required: true },
        { name: "assignedTo", label: "Assigned To", type: "text", required: true },
        { name: "issuedBy", label: "Issued By", type: "text" },
        { name: "status", label: "Status", type: "select", options: ["Open", "In Progress", "Completed"] },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ],
    },
    {
      id: "Tender",
      name: "Tender Document",
      description: "Procurement and tender documents",
      fields: [
        { name: "tenderId", label: "Tender ID", type: "text", required: true },
        { name: "tenderNo", label: "Tender Number", type: "text", required: true },
        { name: "nameOfWork", label: "Name of Work", type: "text", required: true },
        { name: "contractValue", label: "Contract Value", type: "number" },
        { name: "contractDuration", label: "Contract Duration", type: "text" },
        { name: "bidSecurity", label: "Bid Security", type: "number" },
        { name: "openingDate", label: "Opening Date", type: "date" },
        { name: "closingDate", label: "Closing Date", type: "date" },
        { name: "scopeOfWork", label: "Scope of Work", type: "textarea" },
      ],
    },
    {
      id: "SafetyNotice",
      name: "Safety Notice",
      description: "Safety regulations and notices",
      fields: [
        { name: "noticeNumber", label: "Notice Number", type: "text", required: true },
        { name: "severity", label: "Severity", type: "select", options: ["Critical", "High", "Medium", "Low"] },
        { name: "issuedBy", label: "Issued By", type: "text", required: true },
        { name: "issuedTo", label: "Issued To", type: "text" },
        { name: "validFrom", label: "Valid From", type: "date" },
        { name: "validUntil", label: "Valid Until", type: "date" },
        { name: "safetyMeasures", label: "Safety Measures", type: "textarea" },
        { name: "emergencyDuty", label: "Emergency Duty", type: "text" },
      ],
    },
    {
      id: "EngineeringDrawing",
      name: "Engineering Drawing",
      description: "Technical drawings and blueprints",
      fields: [
        { name: "drawingNumber", label: "Drawing Number", type: "text", required: true },
        { name: "revision", label: "Revision", type: "text" },
        { name: "discipline", label: "Discipline", type: "text" },
        { name: "preparedBy", label: "Prepared By", type: "text" },
        { name: "checkedBy", label: "Checked By", type: "text" },
        { name: "approvedBy", label: "Approved By", type: "text" },
        { name: "approvalDate", label: "Approval Date", type: "date" },
        { name: "issueDate", label: "Issue Date", type: "date" },
        { name: "version", label: "Version", type: "number" },
      ],
    },
    {
      id: "WorkOrder",
      name: "Work Order",
      description: "Work orders and task assignments",
      fields: [
        { name: "orderNumber", label: "Order Number", type: "text", required: true },
        { name: "taskDetails", label: "Task Details", type: "textarea", required: true },
        { name: "issuedBy", label: "Issued By", type: "text", required: true },
        { name: "assignedTo", label: "Assigned To", type: "text" },
        { name: "department", label: "Department", type: "text" },
        { name: "safetyMeasures", label: "Safety Measures", type: "textarea" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ],
    },
    {
      id: "InspectionReport",
      name: "Inspection Report",
      description: "Inspection and audit reports",
      fields: [
        { name: "reportNumber", label: "Report Number", type: "text", required: true },
        { name: "inspectorName", label: "Inspector Name", type: "text", required: true },
        { name: "findings", label: "Findings", type: "textarea", required: true },
        { name: "inspectedOn", label: "Inspected On", type: "date", required: true },
        { name: "vesselName", label: "Vessel Name", type: "text" },
        { name: "complianceCheck", label: "Compliance Check", type: "text" },
        { name: "medicalFitness", label: "Medical Fitness", type: "checkbox" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ],
    },
  ]

  const departments = ["Engineering", "Operations", "Procurement", "Finance", "HR", "Legal"]

  const sourceConnectors = [
    {
      id: "email",
      name: "Email (IMAP/Exchange)",
      icon: Mail,
      description: "Connect to email servers to auto-import attachments",
    },
    { id: "sharepoint", name: "SharePoint", icon: Folder, description: "Monitor SharePoint folders for new documents" },
    { id: "maximus", name: "Maximus Exports", icon: Database, description: "Import CSV/Excel/XML from Maximus system" },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      icon: FileText,
      description: "Receive documents via WhatsApp Business API",
    },
    { id: "cloud", name: "Cloud Storage", icon: Upload, description: "Connect to Dropbox, Google Drive, etc." },
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploaded",
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploaded",
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    // Reset form data when template changes
    setFormData({
      title: "",
      description: "",
      priority: "",
      departments: [],
      linkedDocuments: [],
      dueDate: "",
    })
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleDepartmentToggle = (department) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter((d) => d !== department)
        : [...prev.departments, department],
    }))
  }

  const simulateAutoFill = () => {
    if (!selectedTemplate || uploadedFiles.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate OCR and auto-fill process
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)

          // Mock auto-filled data based on template
          const mockData = {
            JobCard: {
              title: "Monthly Maintenance - Unit 205",
              description: "Routine monthly maintenance for rolling stock unit 205",
              jobNumber: "JC-2024-0234",
              assignedTo: "Rajesh Kumar",
              issuedBy: "Maintenance Supervisor",
              status: "Open",
              priority: "medium",
              departments: ["Engineering"],
            },
            Tender: {
              title: "Track Maintenance Contract 2024",
              description: "Annual track maintenance and repair services contract",
              tenderId: "2024_KMRL_789123_1",
              tenderNo: "KMRL/PROC/TENDER/2024-25/045",
              nameOfWork: "Comprehensive Track Maintenance Services",
              contractValue: 7500000,
              priority: "high",
              departments: ["Procurement", "Engineering"],
            },
            SafetyNotice: {
              title: "Updated Safety Protocol - Platform Operations",
              description: "New safety guidelines for platform operations during peak hours",
              noticeNumber: "SN-2024-015",
              severity: "High",
              issuedBy: "Safety Department",
              priority: "high",
              departments: ["Engineering", "Operations"],
            },
          }

          const templateData = mockData[selectedTemplate] || {}
          setFormData((prev) => ({ ...prev, ...templateData }))
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleSave = () => {
    if (!formData.title || !selectedTemplate) {
      alert("Please fill in required fields")
      return
    }

    const newDocument = {
      id: Date.now(),
      type: selectedTemplate,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      departments: formData.departments,
      status: "Active",
      fileSize: uploadedFiles.length > 0 ? "2.1 MB" : "0.5 MB",
      lastModified: new Date().toISOString().split("T")[0],
      ...formData, // Include all template-specific fields
    }

    // Add to search discovery list
    if (window.addDocumentToList) {
      window.addDocumentToList(newDocument)
    }

    console.log("Saving document:", { formData, uploadedFiles, selectedTemplate })
    alert("Document saved successfully!")

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "",
      departments: [],
      linkedDocuments: [],
      dueDate: "",
    })
    setUploadedFiles([])
    setSelectedTemplate("")
  }

  const renderTemplateFields = () => {
    const template = documentTemplates.find((t) => t.id === selectedTemplate)
    if (!template) return null

    return (
      <div className="space-y-4">
        {template.fields.map((field) => (
          <div key={field.name}>
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "text" && (
              <Input
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="mt-1"
                required={field.required}
              />
            )}
            {field.type === "number" && (
              <Input
                type="number"
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="mt-1"
                required={field.required}
              />
            )}
            {field.type === "date" && (
              <Input
                type="date"
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="mt-1"
                required={field.required}
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="mt-1"
                rows={3}
                required={field.required}
              />
            )}
            {field.type === "select" && (
              <Select
                value={formData[field.name] || ""}
                onValueChange={(value) => handleFieldChange(field.name, value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2 mt-1">
                <Checkbox
                  id={field.name}
                  checked={formData[field.name] || false}
                  onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                />
                <label htmlFor={field.name} className="text-sm">
                  {field.label}
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{t("documentProcessing")}</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Document Upload</TabsTrigger>
          <TabsTrigger value="connectors">Source Connectors</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  File Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drag and Drop Area */}
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX, XLS, XLSX, images, and more</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                  />
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Uploaded Files</h4>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Auto-fill Button */}
                {uploadedFiles.length > 0 && selectedTemplate && (
                  <Button onClick={simulateAutoFill} disabled={isProcessing} className="w-full">
                    {isProcessing ? "Processing..." : "Auto-fill from Document"}
                  </Button>
                )}

                {/* Processing Progress */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing document...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Template Selection and Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Selection */}
                <div>
                  <label className="text-sm font-medium">Select Template</label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose document template" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-muted-foreground">{template.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Common Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleFieldChange("title", e.target.value)}
                      className="mt-1"
                      placeholder="Document title"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleFieldChange("description", e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Document description"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={formData.priority} onValueChange={(value) => handleFieldChange("priority", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Department Access */}
                  <div>
                    <label className="text-sm font-medium">Department Access</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {departments.map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={dept}
                            checked={formData.departments.includes(dept)}
                            onCheckedChange={() => handleDepartmentToggle(dept)}
                          />
                          <label htmlFor={dept} className="text-sm">
                            {dept}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Link Documents */}
                  <div>
                    <label className="text-sm font-medium">Link Documents (by ID)</label>
                    <Input
                      value={formData.linkedDocuments.join(", ")}
                      onChange={(e) =>
                        handleFieldChange(
                          "linkedDocuments",
                          e.target.value
                            .split(",")
                            .map((id) => id.trim())
                            .filter(Boolean),
                        )
                      }
                      className="mt-1"
                      placeholder="Enter document IDs separated by commas"
                    />
                  </div>
                </div>

                {/* Template-specific Fields */}
                {selectedTemplate && renderTemplateFields()}

                {/* Save Button */}
                <Button onClick={handleSave} className="w-full" disabled={!formData.title || !selectedTemplate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="connectors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sourceConnectors.map((connector) => {
              const Icon = connector.icon
              return (
                <Card key={connector.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {connector.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{connector.description}</p>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        alert(
                          `Configuring ${connector.name}...\n\nThis would open a configuration dialog for:\n- Connection settings\n- Authentication\n- Sync preferences\n- Folder mappings`,
                        )
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Active Connectors */}
          <Card>
            <CardHeader>
              <CardTitle>Active Connectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Email Connector</p>
                      <p className="text-sm text-muted-foreground">kmrl-docs@metro.gov.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        alert(
                          "Email Connector Configuration:\n\n- Server: mail.kmrl.gov.in\n- Port: 993 (IMAP SSL)\n- Auto-import: Enabled\n- Folder: /Attachments\n- Last sync: 2 minutes ago",
                        )
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Folder className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">SharePoint Connector</p>
                      <p className="text-sm text-muted-foreground">KMRL Document Library</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        alert(
                          "SharePoint Connector Configuration:\n\n- Site: https://kmrl.sharepoint.com\n- Library: Documents\n- Authentication: Required\n- Status: Pending admin approval\n- Next retry: In 15 minutes",
                        )
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
