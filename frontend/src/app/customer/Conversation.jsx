import { useState, useEffect } from "react"
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
import { Brain, Search, Filter, Clock, MessageSquare, HelpCircle, User, ArrowRight, Send, ArrowLeft, ThumbsUp, ThumbsDown, Paperclip, Bot, FileText, CheckCircle, Zap, Phone } from "lucide-react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useParams, useLocation } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea"
import { CallCard } from "./ui/CallCard";

/*
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
    }
*/


// message={message} setMessage={setMessage} showFeedback={showFeedback} setShowFeedback={setShowFeedback}
function ConversationComponent({conversation, message, setMessage, showFeedback, setShowFeedback}) {

    const [conversationState, setConversationState] = useState(conversation); // this is to append a new message
    const [aiResponseBuffer, setAiResponseBuffer] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [socket, setSocket] = useState(null); 

    // for getting tokens from chatbot
    useEffect(() => {
        const ws = new WebSocket("wss://quickly-tough-snake.ngrok-free.app/chat/243");
        setSocket(ws);

        ws.onmessage = (event) => {
            const token = event.data;
            setAiResponseBuffer((prev) => prev + token);
        };

        return () => ws.close();
    }, []);

    // 2. Watch AI buffer and push final AI message after short delay
    useEffect(() => {
        if (!hasStarted || !aiResponseBuffer) return;

        const timeout = setTimeout(() => {
            const lastId = conversationState.messages.length > 0
                ? conversationState.messages[conversationState.messages.length - 1].id
                : 0;

            const aiMessage = {
                id: lastId + 1,
                sender: "ai",
                content: aiResponseBuffer,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setConversationState((prev) => ({
                ...prev,
                messages: [...prev.messages, aiMessage],
            }));

            setAiResponseBuffer(""); // clear buffer
            setHasStarted(false); // reset flag for next message
        }, 2000); // 2 seconds after last token

        return () => clearTimeout(timeout);
    }, [aiResponseBuffer, hasStarted]);

    // 3. Send message to WebSocket server
    const handleSend = (input) => {
        if (!input.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;
        setHasStarted(true);
        socket.send(JSON.stringify({ message: input }));
    };

    // 4. Handle "Send" click
    const handleSendMessage = () => {
        if (!message.trim()) return;

        const lastId = conversationState.messages.length > 0
            ? conversationState.messages[conversationState.messages.length - 1].id
            : 0;

        const customerMessage = {
            id: lastId + 1,
            sender: "customer",
            content: message.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setConversationState((prev) => ({
            ...prev,
            messages: [...prev.messages, customerMessage],
        }));

        setAiResponseBuffer(""); // reset buffer for new response
        handleSend(message.trim()); // send input to socket
        setMessage(""); // clear input field
    };


    return (
        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center gap-2">
            <Link href="/customer/my-tickets" className="flex items-center gap-1 text-sm text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to tickets
            </Link>
            <div className="ml-2 flex items-center gap-2">
              <h1 className="text-base font-medium">{conversation.title}</h1>
              <Badge
                variant={conversation.status === "Resolved" ? "outline" : "default"}
                className={conversation.status === "In Progress" ? "bg-yellow-500 text-white" : conversation.status === "Resolved" ? "bg-green-600 text-white": ""}
              >
                {conversation.status}
              </Badge>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pb-16">
            {conversationState.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "customer"
                    ? "justify-end"
                    : msg.sender === "system"
                      ? "justify-center"
                      : "justify-start"
                }`}
              >
                {msg.sender === "system" ? (
                  <div className="bg-muted/50 rounded-lg px-4 py-2 text-xs text-center max-w-[80%]">{msg.content}</div>
                ) : (
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === "customer" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 mt-1">
                      {msg.sender === "customer" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {msg.sender === "customer" ? "You" : "NatashaAI"}
                        </span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <Card className={`${msg.sender === "customer" ? "bg-blue/10 py-3" : "bg-muted py-0"}`}>
                        <CardContent className="p-3">
                          <p className="text-xs whitespace-pre-line">{msg.content}</p> {/* Original Message content*/}
                        </CardContent>
                      </Card>
                      {msg.sender === "ai" && !showFeedback && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Was this response helpful?</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowFeedback(true)}>
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowFeedback(true)}>
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {msg.sender === "ai" && showFeedback && (
                        <div className="text-xs text-muted-foreground">
                          Thanks for your feedback! It helps us improve.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {conversation.suggestedResponses.map((response, index) => (
                <Button key={index} variant="outline" size="sm" className="text-xs">
                  {response}
                </Button>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Paperclip className="h-4 w-4" />
              </Button>

              <Textarea placeholder="Type your message..." className="min-h-[80px] resize-none" value={message} onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={(e)=>{
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
              }}/>
              <Button size="icon" className="rounded-full h-10 w-10 mr-4 bg-blue-700" disabled={!message.trim()} onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 text-xs">
                  <Brain className="h-3 w-3" />
                  AI Powered
                </Badge>
                <span>You're chatting with our AI assistant NatashaAI</span>
              </div>
            </div>
          </div>
        </div>
    );
}

function ConversationUtilities({conversation, message, setMessage, showFeedback, setShowFeedback}) {

    const [showAgentOptions, setShowAgentOptions] = useState(false)
    const [showCallCard, setShowCallCard] = useState(false)

    const handleRequestHumanAgent = () => {
        setShowAgentOptions(true)
    }

    const handleChatAgent = () => {
        setShowAgentOptions(false)
        // Navigate to chat or open chat interface
        console.log("Opening chat with agent...")
    }

    const handleCallAgent = () => {
        setShowAgentOptions(false)
        setShowCallCard(true)
    }

    const handleCloseCall = () => {
        setShowCallCard(false)
    }

    return(
        <div className="hidden border-l md:block h-full">
            <div className="p-4 space-y-6">
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Ticket Information</h3>
                <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket ID:</span>
                    <span>{conversation.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>May 23, 2025</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                    variant={conversation.status === "Resolved" ? "outline" : "default"}
                    className={conversation.status === "In Progress" ? "bg-yellow-500 text-white" : conversation.status === "Resolved" ? "bg-green-600 text-white": "text-white"}
                    >
                    {conversation.status}
                    </Badge>
                </div>

                {/* Priority wagera is for call center guy not for normal customers */}
                {/* <div className="flex justify-between"> 
                    <span className="text-muted-foreground">Priority:</span>
                    <span>Medium</span>
                </div> */}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Related Help Articles</h3>
                <div className="space-y-3">
                {conversation.relatedArticles.map((article, index) => (
                    <div key={index} className="rounded-md border p-3">
                    <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                        <h4 className="text-sm font-medium">{article.title}</h4>
                        <p className="text-xs text-muted-foreground">{article.description}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1 text-blue-500">
                            Read article
                        </Button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Need More Help?</h3>
                <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2" onClick={handleRequestHumanAgent}>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                            <div>Request Human Agent</div>
                            <div className="text-xs text-muted-foreground">Typical response: 10-15 minutes</div>
                        </div>
                    </div>
                </Button>

                <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                            <div>Browse Help Center</div>
                            <div className="text-xs text-muted-foreground">Find answers to common questions</div>
                        </div>
                    </div>
                </Button>
                </div>
            </div>
            </div>

            {/* Agent Options Modal */}
            {showAgentOptions && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md bg-white shadow-2xl">
                    <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold text-gray-900">Contact Human Agent</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">Choose how you'd like to connect with our support team</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <Button
                        onClick={handleChatAgent}
                        className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                    >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        <div className="text-left">
                        <div className="font-medium">Start Chat</div>
                        <div className="text-xs opacity-90">Average response time: 2-3 minutes</div>
                        </div>
                    </Button>

                    <Button
                        onClick={handleCallAgent}
                        variant="outline"
                        className="w-full h-14 border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                    >
                        <Phone className="mr-3 h-5 w-5" />
                        <div className="text-left">
                        <div className="font-medium">Call Agent</div>
                        <div className="text-xs opacity-70">Connect instantly with voice support</div>
                        </div>
                    </Button>

                    <Button
                        onClick={() => setShowAgentOptions(false)}
                        variant="ghost"
                        className="w-full text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </Button>
                    </CardContent>
                </Card>
                </div>
            )}

            {/* Call Card */}
            {showCallCard && <CallCard onClose={handleCloseCall} />}
        </div>
    );
}

// Sent by user


export default function Conversation() {

    const { id } = useParams();
    const location = useLocation();

    // This is the ticket object passed from navigate()
    const ticket = location.state?.ticket;

    if (!ticket) {
        return <div>No ticket data found!</div>;
    }

    const [message, setMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">

            {/* Header div */}
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
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel className="bg-white h-[700px]">
                        <ConversationComponent conversation={ticket} message={message} setMessage={setMessage} showFeedback={showFeedback} setShowFeedback={setShowFeedback}/>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className="bg-white h-[700px]">
                        <ConversationUtilities conversation={ticket} message={message} setMessage={setMessage} showFeedback={showFeedback} setShowFeedback={setShowFeedback}/>
                    </ResizablePanel>
                </ResizablePanelGroup>
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