"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Headphones, Eye, EyeOff } from "lucide-react"

export default function AgentSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyId: "",
  })

  // Mock companies data - in real app, this would come from API
  const companies = [
    { id: "1", name: "Acme Corporation" },
    { id: "2", name: "TechStart Inc." },
    { id: "3", name: "Global Solutions Ltd." },
    { id: "4", name: "Innovation Hub" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Agent sign in:", formData)
    // Handle agent sign in logic here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCompanyChange = (value) => {
    setFormData({
      ...formData,
      companyId: value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Agent Sign In</CardTitle>
          <CardDescription>Access your agent dashboard and start helping customers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyId">Select Company</Label>
              <Select value={formData.companyId} onValueChange={handleCompanyChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Agent Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="agent@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an agent account? "}
              <a href="/auth/agent/signup" className="text-green-600 hover:underline">
                Register as agent
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
