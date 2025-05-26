"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Eye, EyeOff } from "lucide-react"
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom";

const handleCustomerSignUp = async (firstName, lastName, email, password) => {

    try {
        const response = await axios.post("https://flipr-hackathon-submission-promethia.onrender.com/customer_register", {
            username: `${firstName} ${lastName}`, // better keep username = firstName + lastName
            email: `${email}`,
            password: `${password}`
        });
        console.log("Server response:", response.data);
        return { code: "SUCCESS", data: response.data };
    } catch (error) {
      console.error("Submission failed:", error);
      return { code: "FAILURE", error };
    }
}

export default function CustomerSignUp() {

    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredContactMethod: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    console.log("Customer sign up:", formData)
    const result = await handleCustomerSignUp(formData.firstName, formData.lastName, formData.email, formData.password);
    if(result.code === "SUCCESS") {
        //
        console.log("Boss working");
        if (result.code === "SUCCESS") {
            console.log("Boss working");
            setShowSuccessAlert(true); // this will trigger a re-render and show the alert
        }
    } 
    else if (result.code === "FAILURE") {
        setShowFailureAlert(true);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  useEffect(() => {
    if (showSuccessAlert) {
        const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        }, 2000); // 2 seconds

        return () => clearTimeout(timer); // Cleanup on unmount or state change
    }
    }, [showSuccessAlert]);

    useEffect(() => {
    if (showFailureAlert) {
        const timer = setTimeout(() => {
        setShowFailureAlert(false);
        }, 2000); // 2 seconds

        return () => clearTimeout(timer); // Cleanup on unmount or state change
    }
    }, [showFailureAlert]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Customer Account</CardTitle>
          <CardDescription>Join us to get support and track your requests</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                  required
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-purple-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, subscribeNewsletter: checked })}
                />
                <Label htmlFor="subscribeNewsletter" className="text-sm">
                  Subscribe to our newsletter for updates and tips
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/auth/customer/signin" className="text-purple-600 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Success alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 shadow-lg w-fit max-w-lg flex flex-col gap-y-2 rounded-md">
            <strong className="font-semibold">Successfully created user!</strong>
            <span className="block sm:inline">Wanna login or go to home page?</span>
            <div className="flex gap-x-3">
                <button className="rounded-sm bg-green-500 text-white py-1 px-4" onClick={() => navigate("/auth/customer/signin")}>Login</button>
            </div>
            
            <button className="absolute top-1 right-2 text-green-700" onClick={() => setShowSuccessAlert(false)}>&times;</button>
        </div>
        )}

        {showFailureAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-4 shadow-lg w-fit max-w-lg flex flex-col gap-y-2 rounded-md">
            <strong className="font-semibold">Cannot create user, username already exists!</strong>
            
            <button className="absolute top-1 right-2 text-red-700" onClick={() => setShowFailureAlert(false)}>&times;</button>
        </div>
        )}

    </div>
  )
}
