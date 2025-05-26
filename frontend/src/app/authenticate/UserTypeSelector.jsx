"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Headphones, User, ArrowRight } from "lucide-react"

export default function UserTypeSelector() {
  const userTypes = [
    {
      type: "customer",
      title: "Customer",
      description: "Get support, track tickets, and access help resources",
      icon: User,
      color: "purple",
      bgGradient: "from-purple-50 to-pink-100",
      iconBg: "bg-purple-600",
      buttonColors: {
        signin: "bg-purple-600 hover:bg-purple-700",
        signup: "border-purple-600 text-purple-600 hover:bg-purple-50",
      },
      routes: {
        signin: "/auth/customer/signin",
        signup: "/auth/customer/signup",
      },
    },
    {
      type: "company",
      title: "Company",
      description: "Manage your support operations and agent teams",
      icon: Building2,
      color: "blue",
      bgGradient: "from-blue-50 to-indigo-100",
      iconBg: "bg-blue-600",
      buttonColors: {
        signin: "bg-blue-600 hover:bg-blue-700",
        signup: "border-blue-600 text-blue-600 hover:bg-blue-50",
      },
      routes: {
        signin: "/auth/company/signin",
        signup: "/auth/company/signup",
      },
    },
    {
      type: "agent",
      title: "Call Center Agent",
      description: "Access your dashboard and help customers efficiently",
      icon: Headphones,
      color: "green",
      bgGradient: "from-green-50 to-emerald-100",
      iconBg: "bg-green-600",
      buttonColors: {
        signin: "bg-green-600 hover:bg-green-700",
        signup: "border-green-600 text-green-600 hover:bg-green-50",
      },
      routes: {
        signin: "/auth/agent/signin",
        signup: "/auth/agent/signup",
      },
    },
  ]

  const handleNavigation = (route) => {
    window.location.href = route
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-white shadow-sm hover:scale-110 transition-transform duration-300 ease-in-out">
            <img src="/logoSVG.svg" className="w-14 h-14"/>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to PrometheiaAI Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to access the right tools and features for your needs
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon
            return (
              <Card
                key={userType.type}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${userType.bgGradient} opacity-50`} />
                <CardHeader className="relative text-center pb-4">
                  <div
                    className={`mx-auto w-16 h-16 ${userType.iconBg} rounded-full flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{userType.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base mt-2">{userType.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleNavigation(userType.routes.signin)}
                      className={`w-full ${userType.buttonColors.signin} text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg`}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleNavigation(userType.routes.signup)}
                      variant="outline"
                      className={`w-full ${userType.buttonColors.signup} font-semibold py-3 rounded-lg transition-all duration-200 border-2`}
                    >
                      Sign Up
                    </Button>
                  </div>

                  {/* Features list */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {userType.type === "customer" && (
                        <>
                          <li>• Submit and track support tickets</li>
                          <li>• Live chat with agents</li>
                          <li>• Access help center</li>
                          <li>• File complaints with media</li>
                        </>
                      )}
                      {userType.type === "company" && (
                        <>
                          <li>• Manage agent teams</li>
                          <li>• View analytics and reports</li>
                          <li>• Configure support settings</li>
                          <li>• Monitor performance</li>
                        </>
                      )}
                      {userType.type === "agent" && (
                        <>
                          <li>• Handle customer conversations</li>
                          <li>• Access knowledge base</li>
                          <li>• Voice and chat support</li>
                          <li>• Real-time notifications</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Need help choosing? Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
