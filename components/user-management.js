"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Building,
  Shield,
  MoreHorizontal,
  UserCheck,
  UserX,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useLanguage } from "./language-provider"

export const UserManagement = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All Departments")
  const [filterRole, setFilterRole] = useState("All Roles")
  const [filterStatus, setFilterStatus] = useState("All Status")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@kmrl.gov.in",
      phone: "+91 9876543210",
      role: "Rolling Stock Engineer",
      department: "Engineering",
      permissions: ["view_documents", "edit_documents", "create_documents"],
      status: "Active",
      lastLogin: "2024-01-15 10:30 AM",
      joinDate: "2023-06-15",
      avatar: null,
    },
    {
      id: 2,
      name: "Priya Nair",
      email: "priya.nair@kmrl.gov.in",
      phone: "+91 9876543211",
      role: "Station Controller",
      department: "Operations",
      permissions: ["view_documents", "edit_documents"],
      status: "Active",
      lastLogin: "2024-01-15 09:15 AM",
      joinDate: "2023-08-20",
      avatar: null,
    },
    {
      id: 3,
      name: "Suresh Kumar",
      email: "suresh.kumar@kmrl.gov.in",
      phone: "+91 9876543212",
      role: "Procurement Officer",
      department: "Procurement",
      permissions: ["view_documents", "create_documents", "manage_tenders"],
      status: "Active",
      lastLogin: "2024-01-14 04:45 PM",
      joinDate: "2023-04-10",
      avatar: null,
    },
    {
      id: 4,
      name: "Anita Sharma",
      email: "anita.sharma@kmrl.gov.in",
      phone: "+91 9876543213",
      role: "Finance Manager",
      department: "Finance",
      permissions: ["view_documents", "edit_documents", "manage_invoices"],
      status: "Active",
      lastLogin: "2024-01-14 02:20 PM",
      joinDate: "2023-03-05",
      avatar: null,
    },
    {
      id: 5,
      name: "Ravi Menon",
      email: "ravi.menon@kmrl.gov.in",
      phone: "+91 9876543214",
      role: "Safety Inspector",
      department: "Engineering",
      permissions: ["view_documents", "create_safety_notices"],
      status: "Inactive",
      lastLogin: "2024-01-10 11:30 AM",
      joinDate: "2023-07-12",
      avatar: null,
    },
    {
      id: 6,
      name: "Meera Pillai",
      email: "meera.pillai@kmrl.gov.in",
      phone: "+91 9876543215",
      role: "HR Manager",
      department: "HR",
      permissions: ["view_documents", "manage_users", "edit_documents"],
      status: "Active",
      lastLogin: "2024-01-15 08:00 AM",
      joinDate: "2023-02-28",
      avatar: null,
    },
    {
      id: 7,
      name: "Arun Krishnan",
      email: "arun.krishnan@kmrl.gov.in",
      phone: "+91 9876543216",
      role: "Legal Advisor",
      department: "Legal",
      permissions: ["view_documents", "manage_compliance"],
      status: "Active",
      lastLogin: "2024-01-13 03:15 PM",
      joinDate: "2023-09-18",
      avatar: null,
    },
    {
      id: 8,
      name: "Lakshmi Nair",
      email: "lakshmi.nair@kmrl.gov.in",
      phone: "+91 9876543217",
      role: "Executive",
      department: "Operations",
      permissions: ["view_all_documents", "manage_all"],
      status: "Active",
      lastLogin: "2024-01-15 07:45 AM",
      joinDate: "2022-11-01",
      avatar: null,
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    permissions: [],
    status: "Active",
  })

  const departments = ["Engineering", "Operations", "Procurement", "Finance", "HR", "Legal"]
  const roles = [
    "Rolling Stock Engineer",
    "Station Controller",
    "Procurement Officer",
    "Finance Manager",
    "Safety Inspector",
    "HR Manager",
    "Legal Advisor",
    "Executive",
    "Maintenance Supervisor",
    "Quality Inspector",
  ]

  const availablePermissions = [
    { id: "view_documents", label: "View Documents", description: "Can view all assigned documents" },
    { id: "edit_documents", label: "Edit Documents", description: "Can edit document content and metadata" },
    { id: "create_documents", label: "Create Documents", description: "Can create new documents" },
    { id: "delete_documents", label: "Delete Documents", description: "Can delete documents" },
    { id: "manage_templates", label: "Manage Templates", description: "Can create and edit document templates" },
    { id: "manage_users", label: "Manage Users", description: "Can add, edit, and remove users" },
    { id: "manage_tenders", label: "Manage Tenders", description: "Can handle tender processes" },
    { id: "manage_invoices", label: "Manage Invoices", description: "Can process financial documents" },
    { id: "create_safety_notices", label: "Create Safety Notices", description: "Can issue safety notifications" },
    { id: "manage_compliance", label: "Manage Compliance", description: "Can handle legal and compliance matters" },
    { id: "view_all_documents", label: "View All Documents", description: "Can access documents from all departments" },
    { id: "manage_all", label: "Full System Access", description: "Complete administrative access" },
  ]

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)

    const matchesDepartment = filterDepartment === "All Departments" || user.department === filterDepartment
    const matchesRole = filterRole === "All Roles" || user.role === filterRole
    const matchesStatus = filterStatus === "All Status" || user.status === filterStatus

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.department) {
      alert("Please fill in all required fields.")
      return
    }

    const user = {
      id: Date.now(),
      ...newUser,
      lastLogin: "Never",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: null,
    }

    setUsers((prev) => [...prev, user])
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      permissions: [],
      status: "Active",
    })
    setShowCreateDialog(false)
  }

  const handleEditUser = (user) => {
    setEditingUser({ ...user })
  }

  const handleUpdateUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)))
    setEditingUser(null)
  }

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== userId))
    }
  }

  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)),
    )
  }

  const handlePermissionToggle = (user, setUser, permissionId) => {
    setUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const renderUserForm = (user, setUser, onSave, onCancel) => (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName">Full Name *</Label>
              <Input
                id="userName"
                value={user.name}
                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email Address *</Label>
              <Input
                id="userEmail"
                type="email"
                value={user.email}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="user@kmrl.gov.in"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userPhone">Phone Number</Label>
              <Input
                id="userPhone"
                value={user.phone}
                onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <Label htmlFor="userStatus">Status</Label>
              <Select value={user.status} onValueChange={(value) => setUser((prev) => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userDepartment">Department *</Label>
              <Select
                value={user.department}
                onValueChange={(value) => setUser((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="userRole">Role *</Label>
              <Select value={user.role} onValueChange={(value) => setUser((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">System Permissions</h4>
            <div className="grid grid-cols-1 gap-3">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={permission.id}
                    checked={user.permissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(user, setUser, permission.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={permission.id} className="font-medium">
                      {permission.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save User</Button>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("userManagement")}</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            {renderUserForm(newUser, setNewUser, handleCreateUser, () => setShowCreateDialog(false))}
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-48">
            <Building className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Departments">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-48">
            <Shield className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Roles">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                      {user.status === "Active" ? (
                        <>
                          <UserX className="h-4 w-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{user.department}</Badge>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Last login: {user.lastLogin}</p>
                <p>Joined: {user.joinDate}</p>
                <p>Permissions: {user.permissions.length}</p>
              </div>

              <Button variant="outline" size="sm" onClick={() => handleEditUser(user)} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
                className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterDepartment !== "All Departments" || filterRole !== "All Roles"
                ? "Try adjusting your search criteria or filters"
                : "Add your first user to get started"}
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit User: {editingUser.name}</DialogTitle>
            </DialogHeader>
            {renderUserForm(editingUser, setEditingUser, handleUpdateUser, () => setEditingUser(null))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
