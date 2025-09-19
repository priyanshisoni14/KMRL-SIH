"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Copy, FileText, X, Save, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { useLanguage } from "./language-provider"

export const TemplateManagement = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [templates, setTemplates] = useState([
    {
      id: "JobCard",
      name: "Job Card",
      description: "Maintenance and work assignment cards for tracking job progress and assignments",
      category: "Maintenance",
      fieldsCount: 8,
      usageCount: 156,
      lastModified: "2024-01-15",
      createdBy: "System Admin",
      isActive: true,
      fields: [
        { name: "jobNumber", label: "Job Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "assignedTo", label: "Assigned To", type: "text", required: true },
        { name: "issuedBy", label: "Issued By", type: "text", required: false },
        { name: "dueDate", label: "Due Date", type: "date", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: ["Open", "In Progress", "Completed"],
        },
        { name: "priority", label: "Priority", type: "select", required: true, options: ["High", "Medium", "Low"] },
        { name: "remarks", label: "Remarks", type: "textarea", required: false },
      ],
    },
    {
      id: "Tender",
      name: "Tender Document",
      description: "Procurement and tender documents for contract management and bidding processes",
      category: "Procurement",
      fieldsCount: 12,
      usageCount: 89,
      lastModified: "2024-01-12",
      createdBy: "Procurement Team",
      isActive: true,
      fields: [
        { name: "tenderId", label: "Tender ID", type: "text", required: true },
        { name: "tenderNo", label: "Tender Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "nameOfWork", label: "Name of Work", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "contractValue", label: "Contract Value", type: "number", required: true },
        { name: "contractDuration", label: "Contract Duration", type: "text", required: true },
        { name: "bidSecurity", label: "Bid Security", type: "number", required: true },
        { name: "openingDate", label: "Opening Date", type: "date", required: true },
        { name: "closingDate", label: "Closing Date", type: "date", required: true },
        { name: "scopeOfWork", label: "Scope of Work", type: "textarea", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: ["Draft", "Published", "Closed", "Awarded"],
        },
      ],
    },
    {
      id: "SafetyNotice",
      name: "Safety Notice",
      description: "Safety regulations and notices for compliance and risk management",
      category: "Safety",
      fieldsCount: 10,
      usageCount: 234,
      lastModified: "2024-01-10",
      createdBy: "Safety Department",
      isActive: true,
      fields: [
        { name: "noticeNumber", label: "Notice Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        {
          name: "severity",
          label: "Severity",
          type: "select",
          required: true,
          options: ["Critical", "High", "Medium", "Low"],
        },
        { name: "issuedBy", label: "Issued By", type: "text", required: true },
        { name: "issuedTo", label: "Issued To", type: "text", required: false },
        { name: "validFrom", label: "Valid From", type: "date", required: true },
        { name: "validUntil", label: "Valid Until", type: "date", required: true },
        { name: "safetyMeasures", label: "Safety Measures", type: "textarea", required: true },
        { name: "emergencyDuty", label: "Emergency Duty", type: "text", required: false },
      ],
    },
    {
      id: "EngineeringDrawing",
      name: "Engineering Drawing",
      description: "Technical drawings and blueprints for engineering projects and specifications",
      category: "Engineering",
      fieldsCount: 11,
      usageCount: 67,
      lastModified: "2024-01-08",
      createdBy: "Engineering Team",
      isActive: true,
      fields: [
        { name: "drawingNumber", label: "Drawing Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "revision", label: "Revision", type: "text", required: false },
        { name: "discipline", label: "Discipline", type: "text", required: true },
        { name: "preparedBy", label: "Prepared By", type: "text", required: true },
        { name: "checkedBy", label: "Checked By", type: "text", required: false },
        { name: "approvedBy", label: "Approved By", type: "text", required: false },
        { name: "approvalDate", label: "Approval Date", type: "date", required: false },
        { name: "issueDate", label: "Issue Date", type: "date", required: true },
        { name: "version", label: "Version", type: "number", required: true },
      ],
    },
    {
      id: "InspectionReport",
      name: "Inspection Report",
      description: "Inspection and audit reports for quality assurance and compliance tracking",
      category: "Quality",
      fieldsCount: 9,
      usageCount: 123,
      lastModified: "2024-01-05",
      createdBy: "Quality Team",
      isActive: false,
      fields: [
        { name: "reportNumber", label: "Report Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "inspectorName", label: "Inspector Name", type: "text", required: true },
        { name: "findings", label: "Findings", type: "textarea", required: true },
        { name: "inspectedOn", label: "Inspected On", type: "date", required: true },
        { name: "vesselName", label: "Vessel Name", type: "text", required: false },
        { name: "complianceCheck", label: "Compliance Check", type: "text", required: false },
        { name: "medicalFitness", label: "Medical Fitness", type: "checkbox", required: false },
        { name: "remarks", label: "Remarks", type: "textarea", required: false },
      ],
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    fields: [],
  })

  const [newField, setNewField] = useState({
    name: "",
    label: "",
    type: "text",
    required: false,
    options: [],
  })

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Text Area" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "select", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
  ]

  const categories = ["Maintenance", "Procurement", "Safety", "Engineering", "Quality", "Finance", "HR", "Legal"]

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) => {
    const query = searchQuery.toLowerCase()
    return (
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query)
    )
  })

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description || newTemplate.fields.length === 0) {
      alert("Please fill in all required fields and add at least one field to the template.")
      return
    }

    const template = {
      id: Date.now().toString(),
      ...newTemplate,
      fieldsCount: newTemplate.fields.length,
      usageCount: 0,
      lastModified: new Date().toISOString().split("T")[0],
      createdBy: "Rajesh Kumar",
      isActive: true,
    }

    setTemplates((prev) => [...prev, template])
    setNewTemplate({ name: "", description: "", category: "", fields: [] })
    setShowCreateDialog(false)
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate({ ...template })
  }

  const handleUpdateTemplate = () => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === editingTemplate.id
          ? {
              ...editingTemplate,
              fieldsCount: editingTemplate.fields.length,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : t,
      ),
    )
    setEditingTemplate(null)
  }

  const handleDeleteTemplate = (templateId) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId))
    }
  }

  const handleDuplicateTemplate = (template) => {
    const duplicated = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastModified: new Date().toISOString().split("T")[0],
      createdBy: "Rajesh Kumar",
    }
    setTemplates((prev) => [...prev, duplicated])
  }

  const handleToggleTemplateStatus = (templateId) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? {
              ...t,
              isActive: !t.isActive,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : t,
      ),
    )
  }

  const addFieldToTemplate = (template, setTemplate) => {
    if (!newField.name || !newField.label) {
      alert("Please fill in field name and label.")
      return
    }

    const field = {
      ...newField,
      options: newField.type === "select" ? newField.options : undefined,
    }

    setTemplate((prev) => ({
      ...prev,
      fields: [...prev.fields, field],
    }))

    setNewField({
      name: "",
      label: "",
      type: "text",
      required: false,
      options: [],
    })
  }

  const removeFieldFromTemplate = (template, setTemplate, fieldIndex) => {
    setTemplate((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, index) => index !== fieldIndex),
    }))
  }

  const renderTemplateForm = (template, setTemplate, onSave, onCancel) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="templateName">Template Name *</Label>
          <Input
            id="templateName"
            value={template.name}
            onChange={(e) => setTemplate((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter template name"
          />
        </div>
        <div>
          <Label htmlFor="templateCategory">Category *</Label>
          <Select
            value={template.category}
            onValueChange={(value) => setTemplate((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="templateDescription">Description *</Label>
        <Textarea
          id="templateDescription"
          value={template.description}
          onChange={(e) => setTemplate((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Enter template description"
          rows={3}
        />
      </div>

      {/* Fields Section */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Template Fields</h4>

        {/* Add New Field */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Add New Field</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fieldName">Field Name</Label>
                <Input
                  id="fieldName"
                  value={newField.name}
                  onChange={(e) => setNewField((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="fieldName"
                />
              </div>
              <div>
                <Label htmlFor="fieldLabel">Field Label</Label>
                <Input
                  id="fieldLabel"
                  value={newField.label}
                  onChange={(e) => setNewField((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="Field Label"
                />
              </div>
              <div>
                <Label htmlFor="fieldType">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {newField.type === "select" && (
              <div>
                <Label htmlFor="fieldOptions">Options (comma-separated)</Label>
                <Input
                  id="fieldOptions"
                  value={newField.options.join(", ")}
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      options: e.target.value
                        .split(",")
                        .map((opt) => opt.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fieldRequired"
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField((prev) => ({ ...prev, required: checked }))}
                />
                <Label htmlFor="fieldRequired">Required Field</Label>
              </div>
              <Button onClick={() => addFieldToTemplate(template, setTemplate)} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Field
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Fields */}
        <div className="space-y-2">
          {template.fields.map((field, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-sm">{field.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {field.name} • {fieldTypes.find((t) => t.value === field.type)?.label}
                    {field.required && " • Required"}
                  </p>
                </div>
                {field.options && (
                  <div className="flex gap-1">
                    {field.options.slice(0, 3).map((option, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {option}
                      </Badge>
                    ))}
                    {field.options.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{field.options.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFieldFromTemplate(template, setTemplate, index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("templateManagement")}</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("create")} Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            {renderTemplateForm(newTemplate, setNewTemplate, handleCreateTemplate, () => setShowCreateDialog(false))}
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search templates by name, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{template.category}</Badge>
                      <Badge variant={template.isActive ? "default" : "secondary"}>
                        {template.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Fields</p>
                  <p className="font-medium">{template.fieldsCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Usage</p>
                  <p className="font-medium">{template.usageCount}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>Modified: {template.lastModified}</p>
                <p>Created by: {template.createdBy}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDuplicateTemplate(template)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleTemplateStatus(template.id)}
                  className={template.isActive ? "text-yellow-600" : "text-green-600"}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  {template.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search criteria" : "Create your first template to get started"}
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Template Dialog */}
      {editingTemplate && (
        <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Template: {editingTemplate.name}</DialogTitle>
            </DialogHeader>
            {renderTemplateForm(editingTemplate, setEditingTemplate, handleUpdateTemplate, () =>
              setEditingTemplate(null),
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
