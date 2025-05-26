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

export default function Community() {

    return (
        <div className="flex flex-col min-h-screen">

            {/* Task div header */}
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

            {/* main */}
            <div className="mt-5 flex-grow bg-blue-200">

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