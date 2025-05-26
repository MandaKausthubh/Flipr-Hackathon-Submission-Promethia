import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, FileText, MessageSquare, Search } from "lucide-react"
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function TrackComplaint() {
    
    return (
        <div className="flex flex-col min-h-screen">

            {/* Task div header */}
            <div className="py-4 flex justify-between px-20 border-b border-b-gray-200"> 
                <div className="flex gap-x-2 items-center">
                    <div className="rounded-full h-11 w-11">
                        <img src="/logo.png"/>
                    </div>
                    <div className="text-lg text-black font-semibold">PrometheiaAI</div>
                </div>
                
                <div className="flex justify-between items-center gap-x-4">
                    <Link to="/customer/submit-complaint">
                        <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                        Submit Complaint
                        </div>
                    </Link>
                    <Link to="/customer/track-complaint">
                        <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                        Track Complaint
                        </div>
                    </Link>
                    <Link to="/customer/helpCenter">
                        <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">
                        Help Center
                        </div>
                    </Link>
                    <Button variant="outline" className="shadow-none px-3 hover:bg-black text-black flex gap-x-2 cursor-pointer">
                        <Icon icon="bx:user" width="32" height="32"  style={{color: "#fff"}} />
                        My Account
                    </Button>
                </div>
            </div>

            {/* Main */}
            <div className="flex flex-1 py-12 text-center justify-center items-center">
                <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-2xl space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tight">Track Your Complaint</h1>
                        <p className="text-muted-foreground">
                            Enter your ticket ID to check the status of your complaint
                        </p>
                    </div>

                    <Card>
                    <CardHeader>
                        <CardTitle className="pb-2 flex items-start">Complaint Lookup</CardTitle>
                        <CardDescription className="flex items-start">Enter your complaint ticket ID or search by your email address</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="reference" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="reference">Ticket ID</TabsTrigger>
                            <TabsTrigger value="email">Email Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="reference" className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="reference-number">Complaint ticket ID</Label>
                            <div className="flex gap-1">
                                <Input id="reference-number" placeholder="e.g., TKT-12345" />
                                <Button className="bg-blue-500">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-start">
                                Your ticket ID was provided in your confirmation email
                            </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="email" className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="flex gap-2">
                                <Input id="email" type="email" placeholder="your.email@example.com" />
                                <Button className="bg-blue-500">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-start">
                                We'll show all complaints associated with this email address
                            </p>
                            </div>
                        </TabsContent>
                        </Tabs>
                    </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Recent Complaints</h2>

                        <Card>
                            <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="pb-2 flex items-start">Product arrived damaged</CardTitle>
                                    <CardDescription>Reference: COMP-12345 • Submitted: May 23, 2025</CardDescription>
                                </div>
                                <Badge className="bg-yellow-500">In Progress</Badge>
                            </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Last Updated:</span>
                                <span>May 23, 2025 (2 hours ago)</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Category:</span>
                                <span>Product Issue {">"} Damaged on Arrival</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status:</span>
                                <span>Under Review</span>
                                </div>
                            </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Estimated response: Within 24 hours</span>
                            </div>
                            <Button className="bg-blue-500">View Details</Button>
                            </CardFooter>
                        </Card>
                        
                        <Card>
                            <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="pb-2 flex items-start">Billing discrepancy on monthly statement</CardTitle>
                                    <CardDescription>Reference: COMP-12340 • Submitted: May 15, 2025</CardDescription>
                                </div>
                                <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>
                            </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>May 18, 2025 (5 days ago)</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Category:</span>
                                    <span>Billing Problem {">"} Overcharged</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span>Resolved - Refund Issued</span>
                                </div>
                            </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Estimated response: Within 24 hours</span>
                            </div>
                            <Button className="bg-blue-500">View Details</Button>
                            </CardFooter>
                        </Card>
                        
                    </div>

                    <div className="rounded-lg border p-6 text-center">
                    <h3 className="text-lg font-medium">Need to submit a new complaint?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        If you have another issue you'd like to report, you can submit a new complaint.
                    </p>
                    <Button className="mt-4 bg-blue-500" asChild>
                        <Link to="/customer/submit-complaint">
                            <FileText className="mr-1 h-4 w-4" />
                            Submit New Complaint
                        </Link>
                    </Button>
                    </div>
                </div>
                </div>
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