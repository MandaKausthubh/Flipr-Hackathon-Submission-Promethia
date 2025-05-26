import { useState } from "react"
import { Icon } from "@iconify/react";
import customerAgent from '/customerAgent-removebg-preview.png'
import customerAgent2 from '/customerAgent2.png'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Search, Filter, Clock, MessageSquare, HelpCircle, User, ArrowRight } from "lucide-react"

const helpCenterArray = [
    {
        title: "Account Security Measures",
        description: "Learn about the security measures in place to protect your account.",
        category: "Account & Security",
        readTime: "3 min read",
    },
    {
        title: "Password Reset Guide",
        description: "Step-by-step guide on how to reset your password.",
        category: "Account & Security",
        readTime: "2 min read",
    },
    {
        title: "Two-Factor Authentication Setup",
        description: "How to set up and use two-factor authentication for added security.",
        category: "Account & Security",
        readTime: "4 min read",
    },
    {
        title: "Billing Cycles Explained",
        description: "Understanding your billing cycle and payment schedule.",
        category: "Billing & Payments",
        readTime: "3 min read",
    },
    {
        title: "Subscription Management",
        description: "How to manage, upgrade, or downgrade your subscription.",
        category: "Billing & Payments",
        readTime: "5 min read",
    },
    {
        title: "API Integration Guide",
        description: "Comprehensive guide on integrating with our API.",
        category: "Product Features",
        readTime: "8 min read",
    },
    {
        title: "Troubleshooting Login Issues",
        description: "Common login problems and their solutions.",
        category: "Troubleshooting",
        readTime: "4 min read",
    },
    {
        title: "Data Export Options",
        description: "How to export your data in different formats.",
        category: "Product Features",
        readTime: "3 min read",
    },
]

export default function HelpCenter() {

    return (
        <div className="flex flex-col min-h-screen">

            {/* Header */}
            <div className="py-4 flex justify-between px-20 border-b border-b-gray-200"> 

                <div className="flex gap-x-2 items-center">
                    <div className="rounded-full h-11 w-11">
                        <img src="/logo.png"/>
                    </div>
                    <div className="text-lg text-black font-semibold">PrometheiaAI</div>

                    <div className="flex justify-between items-center gap-x-6 ml-10">
                        <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">Home</div>
                        <Link to="/customer/myTickets">
                            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                            My Tickets
                            </div>
                        </Link>
                        <Link to="/customer/helpCenter">
                            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                            Help Center
                            </div>
                        </Link>
                        <Link to="/customer/community">
                            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                            Community
                            </div>
                        </Link>
                    </div>
                </div>
                
                <div className="flex justify-between items-center gap-x-4">
                    <Button variant="outline" className="shadow-none px-3 hover:bg-black text-black flex gap-x-2 cursor-pointer">
                        <Icon icon="bx:user" width="32" height="32"  style={{color: "#fff"}} />
                        My Account
                    </Button>
                    <Button variant="outline" className="shadow-none px-3 hover:bg-black text-white bg-black flex gap-x-2 cursor-pointer">
                        <Icon icon="mdi:question-mark-circle-outline" width="32" height="32"  style={{color: "#fff"}} />
                        Get Help
                    </Button>
                </div>
            </div>

            {/* Main */}
            <div className="flex flex-grow flex-col gap-y-3 justify-center mt-5 px-20">

                <div className="text-4xl font-bold text-center">Help Center</div>
                <div className="text-gray-500 font-sm pb-2 text-center">Find answers to your questions and learn how to get the most out of our product</div>
                <div className="border border-gray-200 flex px-3 py-2 gap-x-2 mb-6 items-center rounded-md mx-[650px]">
                    <Icon icon="material-symbols:search" width="20" height="20" className="text-gray-400"/>
                    <div className="text-xs text-gray-400">Search tickets...</div>
                </div>
                <Tabs defaultValue="all" className="space-y-6 px-44">
                    <TabsList className="w-full justify-start overflow-auto py-1">
                        <TabsTrigger value="all">All Articles</TabsTrigger>
                        <TabsTrigger value="account">Account & Security</TabsTrigger>
                        <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
                        <TabsTrigger value="features">Product Features</TabsTrigger>
                        <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
                        <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="account" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.filter(ticket => ticket.category == "Account & Security").map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="billing" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.filter(ticket => ticket.category == "Billing & Payments").map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.filter(ticket => ticket.category == "Product Features").map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="troubleshooting" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.filter(ticket => ticket.category == "Troubleshooting").map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="getting-started" className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {helpCenterArray.filter(ticket => ticket.category == "Getting Started").map((article, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                                <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{article.category}</span>
                                    <span className="text-muted-foreground">{article.readTime}</span>
                                </div>
                                </CardContent>
                                <CardFooter className="border-t p-4 bg-muted/20">
                                <Button variant="ghost" className="ml-auto p-0 h-auto">
                                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* footer */}
            <footer className="flex justify-between text-gray-500 py-6 items-center px-20 border-t border-gray-200">
                <div className="text-sm flex gap-x-1 items-center">
                    <Icon icon="fa6-regular:registered" width="16" height="16" className="text-gray-400" />
                    2025 PrometheiaAI. All rights reserved.
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="text-sm">Privacy Policy</div>
                    <div className="text-sm">Terms of Service</div>
                    <div className="text-sm">Contact Us</div>
                </div>
            </footer>
        </div>
    );
}