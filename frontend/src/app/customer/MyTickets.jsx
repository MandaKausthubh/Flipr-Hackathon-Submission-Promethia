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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Search, Filter, Clock, MessageSquare, HelpCircle, User, ArrowRight } from "lucide-react"
import Conversation from "./Conversation"

const tickets = [
    {
        id: "TKT-1234",
        userId: "USR-1234",
        companyName: "Amazon",
        title: "Account access problem",
        description: "I'm having trouble logging into my account after the recent update.",
        status: "Resolved",
        date: "May 22, 2025",
        lastUpdate: "2 days ago",
        messages: [
        ],
        aiHandled: false,
        suggestedResponses: [
            "I'd like both options - deactivate and refund please.",
            "Can you explain what the Data Analytics Add-on actually does?",
            "I need to speak with a human agent about this.",
        ],
        relatedArticles: [
            {
                title: "Understanding Your Invoice",
                description: "A guide to reading and understanding your monthly invoice",
            },
            {
                title: "Managing Add-ons & Subscriptions",
                description: "How to activate, deactivate, and manage account add-ons",
            },
            {
                title: "Refund Policy",
                description: "Information about our refund process and eligibility",
            }
        ]
    },
    {
        id: "TKT-1235",
        userId: "USR-1234",
        companyName: "Amazon",
        title: "Billing question about recent charge",
        description: "I noticed an unexpected charge on my last invoice and would like clarification.",
        status: "In Progress",
        date: "May 23, 2025",
        lastUpdate: "5 hours ago",
        messages: [
            {
                id: 1,
                sender: "system",
                content: "Hello, welcome! I'm NatashaAI. How can I help you today?",
                timestamp: "10:30 AM",
            },
            {
                id: 2,
                sender: "customer",
                content:
                "Hi there, I noticed an unexpected charge on my last invoice. It says 'Premium Add-on' but I don't remember signing up for any add-ons.",
                timestamp: "10:32 AM",
            },
            {
                id: 3,
                sender: "ai",
                content:
                "I understand your concern about the unexpected charge. Let me look into that for you right away. Could you please confirm the date of the charge and the amount? This will help me identify the specific transaction in our system.",
                timestamp: "10:33 AM",
            },
            {
                id: 4,
                sender: "customer",
                content: "It was on May 21st for $29.99. My invoice number is INV-87654.",
                timestamp: "10:35 AM",
            },
            {
                id: 5,
                sender: "ai",
                content:
                "Thank you for providing that information. I've checked your account and I can see the charge for $29.99 on May 21st. This appears to be for the 'Data Analytics Add-on' that was activated on your account on May 15th.\n\nOur records show that this feature was enabled through the Account Settings page. However, if you didn't intentionally activate this add-on, we can certainly help resolve this.\n\nWould you like me to:\n\n1. Deactivate the add-on immediately to prevent future charges\n2. Process a refund for the $29.99 charge\n3. Both of the above\n4. Connect you with a billing specialist to discuss further",
                timestamp: "10:37 AM",
            },
        ],
        aiHandled: true,
        suggestedResponses: [
            "I'd like both options - deactivate and refund please.",
            "Can you explain what the Data Analytics Add-on actually does?",
            "I need to speak with a human agent about this.",
        ],
        relatedArticles: [
            {
                title: "Understanding Your Invoice",
                description: "A guide to reading and understanding your monthly invoice",
            },
            {
                title: "Managing Add-ons & Subscriptions",
                description: "How to activate, deactivate, and manage account add-ons",
            },
            {
                title: "Refund Policy",
                description: "Information about our refund process and eligibility",
            }
        ]
    },
    {
        id: "TKT-1236",
        userId: "USR-1234",
        companyName: "Flipkart",
        title: "Feature request: Dark mode",
        description: "I would love to see a dark mode option added to the dashboard.",
        status: "Open",
        date: "May 23, 2025",
        lastUpdate: "1 day ago",
        messages: [
            {
                id: 1,
                sender: "system",
                content: "Hello, welcome! I'm NatashaAI. How can I help you today?",
                timestamp: "10:30 AM",
            },
            {
                id: 2,
                sender: "customer",
                content:
                "Hi there, I noticed an unexpected charge on my last invoice. It says 'Premium Add-on' but I don't remember signing up for any add-ons.",
                timestamp: "10:32 AM",
            },
            {
                id: 3,
                sender: "ai",
                content:
                "I understand your concern about the unexpected charge. Let me look into that for you right away. Could you please confirm the date of the charge and the amount? This will help me identify the specific transaction in our system.",
                timestamp: "10:33 AM",
            },
            {
                id: 4,
                sender: "customer",
                content: "It was on May 21st for $29.99. My invoice number is INV-87654.",
                timestamp: "10:35 AM",
            },
            {
                id: 5,
                sender: "ai",
                content:
                "Thank you for providing that information. I've checked your account and I can see the charge for $29.99 on May 21st. This appears to be for the 'Data Analytics Add-on' that was activated on your account on May 15th.\n\nOur records show that this feature was enabled through the Account Settings page. However, if you didn't intentionally activate this add-on, we can certainly help resolve this.\n\nWould you like me to:\n\n1. Deactivate the add-on immediately to prevent future charges\n2. Process a refund for the $29.99 charge\n3. Both of the above\n4. Connect you with a billing specialist to discuss further",
                timestamp: "10:37 AM",
            },
        ],
        aiHandled: true,
        suggestedResponses: [
            "I'd like both options - deactivate and refund please.",
            "Can you explain what the Data Analytics Add-on actually does?",
            "I need to speak with a human agent about this.",
        ],
        relatedArticles: [
            {
                title: "Understanding Your Invoice",
                description: "A guide to reading and understanding your monthly invoice",
            },
            {
                title: "Managing Add-ons & Subscriptions",
                description: "How to activate, deactivate, and manage account add-ons",
            },
            {
                title: "Refund Policy",
                description: "Information about our refund process and eligibility",
            }
        ]
    },
    {
        id: "TKT-1237",
        userId: "USR-1234",
        companyName: "Flipkart",
        title: "Integration with third-party service not working",
        description: "The integration with Slack stopped working after I updated my settings.",
        status: "In Progress",
        date: "May 20, 2025",
        lastUpdate: "12 hours ago",
        messages: [
            {
                id: 1,
                sender: "system",
                content: "Hello, welcome! I'm NatashaAI. How can I help you today?",
                timestamp: "10:30 AM",
            },
            {
                id: 2,
                sender: "customer",
                content:
                "Hi there, I noticed an unexpected charge on my last invoice. It says 'Premium Add-on' but I don't remember signing up for any add-ons.",
                timestamp: "10:32 AM",
            },
            {
                id: 3,
                sender: "ai",
                content:
                "I understand your concern about the unexpected charge. Let me look into that for you right away. Could you please confirm the date of the charge and the amount? This will help me identify the specific transaction in our system.",
                timestamp: "10:33 AM",
            },
            {
                id: 4,
                sender: "customer",
                content: "It was on May 21st for $29.99. My invoice number is INV-87654.",
                timestamp: "10:35 AM",
            },
            {
                id: 5,
                sender: "ai",
                content:
                "Thank you for providing that information. I've checked your account and I can see the charge for $29.99 on May 21st. This appears to be for the 'Data Analytics Add-on' that was activated on your account on May 15th.\n\nOur records show that this feature was enabled through the Account Settings page. However, if you didn't intentionally activate this add-on, we can certainly help resolve this.\n\nWould you like me to:\n\n1. Deactivate the add-on immediately to prevent future charges\n2. Process a refund for the $29.99 charge\n3. Both of the above\n4. Connect you with a billing specialist to discuss further",
                timestamp: "10:37 AM",
            },
        ],
        aiHandled: false,
        suggestedResponses: [
            "I'd like both options - deactivate and refund please.",
            "Can you explain what the Data Analytics Add-on actually does?",
            "I need to speak with a human agent about this.",
        ],
        relatedArticles: [
            {
                title: "Understanding Your Invoice",
                description: "A guide to reading and understanding your monthly invoice",
            },
            {
                title: "Managing Add-ons & Subscriptions",
                description: "How to activate, deactivate, and manage account add-ons",
            },
            {
                title: "Refund Policy",
                description: "Information about our refund process and eligibility",
            }
        ]
    },
    {
        id: "TKT-1238",
        userId: "USR-1234",
        companyName: "Myntra",
        title: "Password reset not working",
        description: "I'm not receiving the password reset email when I request it.",
        status: "Resolved",
        date: "May 15, 2025",
        lastUpdate: "1 week ago",
        messages: [
            {
                id: 1,
                sender: "system",
                content: "Hello, welcome! I'm NatashaAI. How can I help you today?",
                timestamp: "10:30 AM",
            },
            {
                id: 2,
                sender: "customer",
                content:
                "Hi there, I noticed an unexpected charge on my last invoice. It says 'Premium Add-on' but I don't remember signing up for any add-ons.",
                timestamp: "10:32 AM",
            },
            {
                id: 3,
                sender: "ai",
                content:
                "I understand your concern about the unexpected charge. Let me look into that for you right away. Could you please confirm the date of the charge and the amount? This will help me identify the specific transaction in our system.",
                timestamp: "10:33 AM",
            },
            {
                id: 4,
                sender: "customer",
                content: "It was on May 21st for $29.99. My invoice number is INV-87654.",
                timestamp: "10:35 AM",
            },
            {
                id: 5,
                sender: "ai",
                content:
                "Thank you for providing that information. I've checked your account and I can see the charge for $29.99 on May 21st. This appears to be for the 'Data Analytics Add-on' that was activated on your account on May 15th.\n\nOur records show that this feature was enabled through the Account Settings page. However, if you didn't intentionally activate this add-on, we can certainly help resolve this.\n\nWould you like me to:\n\n1. Deactivate the add-on immediately to prevent future charges\n2. Process a refund for the $29.99 charge\n3. Both of the above\n4. Connect you with a billing specialist to discuss further",
                timestamp: "10:37 AM",
            },
        ],
        aiHandled: true,
        suggestedResponses: [
            "I'd like both options - deactivate and refund please.",
            "Can you explain what the Data Analytics Add-on actually does?",
            "I need to speak with a human agent about this.",
        ],
        relatedArticles: [
            {
                title: "Understanding Your Invoice",
                description: "A guide to reading and understanding your monthly invoice",
            },
            {
                title: "Managing Add-ons & Subscriptions",
                description: "How to activate, deactivate, and manage account add-ons",
            },
            {
                title: "Refund Policy",
                description: "Information about our refund process and eligibility",
            }
        ]
    }
]



export default function MyTickets() {

    const [activeConversation, setActiveConversation] = useState(null); // our active ticketID
    const navigate = useNavigate();

    function handleClick(ticket) {
        // Pass the entire ticket object via state
        navigate(`/customer/myTickets/${ticket.id}`, { state: { ticket } });
    }

    return (
        <div className="flex flex-col min-h-screen">

            {/* Task div */}
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

            {/* Main content */}
            <div className="mt-5 flex-grow">
                <div className="flex justify-between px-20">
                    <div className="text-3xl font-bold">My Support Tickets</div>
                    <div className="flex gap-x-3">
                        {/* Search Tickets search bar */}
                        <div className="border border-gray-200 flex px-3 pr-28 py-0.5 gap-x-2 items-center rounded-md">
                            <Icon icon="material-symbols:search" width="20" height="20" className="text-gray-400"/>
                            <div className="text-xs text-gray-400">Search tickets...</div>
                        </div>

                        <div className="border border-gray-200 flex px-3 py-0.5 gap-x-2 items-center rounded-md">
                            <Icon icon="icon-park-outline:filter" width="16" height="16" className="text-black"/>
                            <div className="text-xs text-black">Filter</div>
                        </div>

                        <div className="border border-black flex px-3 py-0.5 gap-x-2 bg-black text-white items-center rounded-md">
                            <Icon icon="ph:chat" width="16" height="16" className="text-white"/>
                            <div className="text-xs text-white">New Ticket</div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="all" className="space-y-4 mt-10 px-20 mb-10">
                    <TabsList>
                        <TabsTrigger value="all">All Tickets</TabsTrigger>
                        <TabsTrigger value="open">Open</TabsTrigger>
                        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        {tickets.map((ticket, index) => (
                            <Card key={index} className="overflow-hidden pb-0 pt-6 gap-0">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{ticket.title}</CardTitle>
                                            <CardDescription className="mt-1">
                                                Ticket #{ticket.id} • Opened on {ticket.date}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant={ticket.status === "Resolved" ? "outline" : "default"}
                                            className={ticket.status === "Resolved"? "border-green-500 text-green-500": ticket.status === "In Progress"? "bg-yellow-500": ""}>
                                            {ticket.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="pb-3">
                                    <p className="text-sm text-muted-foreground pb-2">{ticket.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground ">
                                                <Clock className="h-4 w-4" />
                                                <span>Updated {ticket.lastUpdate}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <MessageSquare className="h-4 w-4" />
                                                <span>{ticket.messages.length} messages</span>
                                            </div>
                                        </div>
                                        {ticket.aiHandled && (
                                        <Badge variant="outline" className="gap-1 text-xs">
                                            <Brain className="h-3 w-3" />
                                            NatashaAI Assisted
                                        </Badge>
                                        )}
                                    </div>
                                </CardContent>
                                <div className="border-t px-6 py-5 flex justify-end ">
                                    <Button className="bg-blue-500" key={ticket.id} onClick={() => handleClick(ticket)}>
                                        View Conversation
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>

                                </div>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="resolved" className="space-y-4">
                        {tickets.filter(ticket => ticket.status === "Resolved").map((ticket, index) => (
                        <Card key={index} className="overflow-hidden pb-0 pt-6 gap-0">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            Ticket #{ticket.id} • Opened on {ticket.date}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant={ticket.status === "Resolved" ? "outline" : "default"}
                                        className={ticket.status === "Resolved"? "border-green-500 text-green-500": ticket.status === "In Progress"? "bg-yellow-500": ""}>
                                        {ticket.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pb-3">
                                <p className="text-sm text-muted-foreground pb-2">{ticket.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground ">
                                            <Clock className="h-4 w-4" />
                                            <span>Updated {ticket.lastUpdate}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{ticket.messages.length} messages</span>
                                        </div>
                                    </div>
                                    {ticket.aiHandled && (
                                    <Badge variant="outline" className="gap-1 text-xs">
                                        <Brain className="h-3 w-3" />
                                        AI Assisted
                                    </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <div className="border-t px-6 py-5 flex justify-end ">
                                <Button className="bg-blue-500" key={ticket.id} onClick={() => handleClick(ticket)}>
                                    View Conversation
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="open" className="space-y-4">
                        {tickets.filter(ticket => ticket.status === "Open").map((ticket, index) => (
                        <Card key={index} className="overflow-hidden pb-0 pt-6 gap-0">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            Ticket #{ticket.id} • Opened on {ticket.date}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant={ticket.status === "Resolved" ? "outline" : "default"}
                                        className={ticket.status === "Resolved"? "border-green-500 text-green-500": ticket.status === "In Progress"? "bg-yellow-500": ""}>
                                        {ticket.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pb-3">
                                <p className="text-sm text-muted-foreground pb-2">{ticket.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground ">
                                            <Clock className="h-4 w-4" />
                                            <span>Updated {ticket.lastUpdate}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{ticket.messages.length} messages</span>
                                        </div>
                                    </div>
                                    {ticket.aiHandled && (
                                    <Badge variant="outline" className="gap-1 text-xs">
                                        <Brain className="h-3 w-3" />
                                        AI Assisted
                                    </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <div className="border-t px-6 py-5 flex justify-end ">
                                <Button className="bg-blue-500" key={ticket.id} onClick={() => handleClick(ticket)}>
                                    View Conversation
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="in-progress" className="space-y-4">
                        {tickets.filter(ticket => ticket.status === "In Progress").map((ticket, index) => (
                        <Card key={index} className="overflow-hidden pb-0 pt-6 gap-0">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            Ticket #{ticket.id} • Opened on {ticket.date}
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant={ticket.status === "Resolved" ? "outline" : "default"}
                                        className={ticket.status === "Resolved"? "border-green-500 text-green-500": ticket.status === "In Progress"? "bg-yellow-500": ""}>
                                        {ticket.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pb-3">
                                <p className="text-sm text-muted-foreground pb-2">{ticket.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground ">
                                            <Clock className="h-4 w-4" />
                                            <span>Updated {ticket.lastUpdate}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{ticket.messages.length} messages</span>
                                        </div>
                                    </div>
                                    {ticket.aiHandled && (
                                    <Badge variant="outline" className="gap-1 text-xs">
                                        <Brain className="h-3 w-3" />
                                        AI Assisted
                                    </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <div className="border-t px-6 py-5 flex justify-end ">
                                <Button className="bg-blue-500" key={ticket.id} onClick={() => handleClick(ticket)}>
                                    View Conversation
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                        ))}
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