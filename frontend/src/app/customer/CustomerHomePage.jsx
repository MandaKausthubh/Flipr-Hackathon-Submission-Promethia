import { useState } from "react"
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import HelpCenter from "./HelpCenter";

export default function CustomerHomePage() {

    return (
        <div className="">
            
            <div className="py-4 flex justify-between px-20"> 
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
                    <Button variant="outline" className="shadow-none px-3 hover:bg-black text-black flex gap-x-2">
                        <Icon icon="bx:user" width="32" height="32"  style={{color: "#fff"}} />
                        My Account
                    </Button>
                    <Button variant="outline" className="shadow-none px-3 hover:bg-black text-white bg-black flex gap-x-2">
                        <Icon icon="mdi:question-mark-circle-outline" width="32" height="32"  style={{color: "#fff"}} />
                        Get Help
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-5 pt-20 pb-20 bg-blue-50/90">
                <div className="text-6xl font-bold">How can we help you today?</div>
                <div className="text-md text-gray-400">Get instant answers from Natasha our AI assistant or connect with our support team</div>
                <Input type="email" placeholder="Search for help..." className="w-lg shadow-none"/>
                <div className="text-sm text-gray-400">Popular: Password reset, returns</div>
                <div className="flex gap-x-2">
                    <Button variant="outline" className="shadow-none px-4 hover:bg-black text-black flex gap-x-2 py-2">
                        <Icon icon="bx:user" width="32" height="32"  style={{color: "#fff"}} /> Submit a Complain
                    </Button>
                    <Button variant="outline" className="shadow-none px-4 hover:bg-black text-white bg-black flex gap-x-2">
                        <Icon icon="mi:document" width="32" height="32"  style={{color: "#fff"}} /> Browse community articles
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-3 pt-10 pb-10 w-full px-20">
                <div className="text-4xl font-bold">Your recent support tickets</div>
                <div className="text-sm text-gray-400 mb-5">Track and manage your support requests</div>

                <div className="flex flex-col gap-y-2 w-full">

                    {/* 1st ticket div */}
                    <div className="group border-1 shadow-md px-10 py-4 border-gray-100 flex justify-between items-center rounded-lg w-full">
                        {/* Between shown and hidden */}
                        <div className="flex flex-col w-full items-center">
                            {/* Shown */}
                            <div className="w-full flex justify-between items-center mb-3">
                                <div className="flex flex-col">
                                    <div className="font-semibold text-base">Account access problem</div>
                                    <div className="flex gap-x-1">
                                        <div className="text-sm text-gray-400">Ticket #TKT-1234</div>
                                        <div className="text-sm text-gray-400"> • Opened on May 22, 2025</div>
                                    </div>
                                </div>

                                <div className="flex gap-x-3 items-center">
                                    <Icon icon="mdi:clock-outline" width="32" height="32"  style={{color: "#fff"}} />
                                    <div className="text-sm text-gray-400">Updated 2 days ago</div>
                                    <div className="py-1 px-2 rounded-xl text-green-500 border border-green-500 text-xs items-center justify-center">Resolved</div>
                                </div>

                                <div className="text-sm font-medium items-center cursor-pointer">
                                    View Details
                                    
                                </div>
                            </div>

                            {/* Hidden */}
                            <div className="w-full">
                                {/* Hidden details section */}
                                <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-40">
                                    <div className="text-sm text-gray-600 pt-4 border-t">
                                        <p><strong>Description:</strong> The user reported being unable to access their account due to incorrect password errors even after a reset attempt.</p>
                                        <p className="mt-2"><strong>Resolution Steps:</strong> Password reset was manually enforced by the support team and login confirmed successful.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2nd ticket div */}
                    <div className="group border-1 shadow-md px-10 py-4 border-gray-100 flex justify-between items-center rounded-lg w-full">
                        {/* Between shown and hidden */}
                        <div className="flex flex-col w-full items-center">
                            {/* Shown */}
                            <div className="w-full flex justify-between items-center mb-3">
                                <div className="flex flex-col">
                                    <div className="font-semibold text-base">Account access problem</div>
                                    <div className="flex gap-x-1">
                                        <div className="text-sm text-gray-400">Ticket #TKT-1234</div>
                                        <div className="text-sm text-gray-400"> • Opened on May 22, 2025</div>
                                    </div>
                                </div>

                                <div className="flex gap-x-3 items-center">
                                    <Icon icon="mdi:clock-outline" width="32" height="32"  style={{color: "#fff"}} />
                                    <div className="text-sm text-gray-400">Updated 2 days ago</div>
                                    <div className="py-1 px-2 rounded-xl text-green-500 border border-green-500 text-xs items-center justify-center">Resolved</div>
                                </div>

                                <div className="text-sm font-medium items-center cursor-pointer">
                                    View Details
                                    
                                </div>
                            </div>

                            {/* Hidden */}
                            <div className="w-full">
                                {/* Hidden details section */}
                                <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-40">
                                    <div className="text-sm text-gray-600 pt-4 border-t">
                                        <p><strong>Description:</strong> The user reported being unable to access their account due to incorrect password errors even after a reset attempt.</p>
                                        <p className="mt-2"><strong>Resolution Steps:</strong> Password reset was manually enforced by the support team and login confirmed successful.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* FAQ */}
                <div className=""></div>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-3 pt-5 w-full">
                <div className="text-4xl font-bold">Quick Help Topics</div>
                <div className="text-sm text-gray-400 mb-5">Find answers to common questions</div>

                <div className="flex bg-blue-50/90 w-full px-40 justify-between items-center">

                    <div className="flex flex-col gap-y-2 pt-10 pb-10">
                        <div className="font-bold text-3xl">Need immediate assistance?</div>
                        <div className="text-gray-500 text-sm pb-3.5">Our AI assistant is available 24/7 to help you with any questions or issues you might have</div>
                        <div className="flex gap-x-4">
                            <div className="cursor-pointer px-4 py-2 flex gap-x-2 justify-between items-center bg-black text-white rounded-md text-sm">
                                <Icon icon="line-md:chat" width="18" height="18"  style={{color: "#fff"}} />
                                <p>Chat with Natasha AI Assistant</p>
                            </div>
                            <div className="cursor-pointer px-4 py-2 flex gap-x-2 justify-between items-center bg-white text-black rounded-md text-sm border border-gray-200">
                                <Icon icon="mdi:customer-service" width="20" height="20"  style={{color: "#000"}} />
                                <p>Request Human Agent</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 pb-10 rounded-md">
                        <img src="/ChatAIPreview.png" className="rounded-md border border-gray-200"></img>
                    </div>
                </div>

            </div>

            <div className="flex justify-between text-gray-400 px-20 py-3 items-center">
                <div className="text-sm flex gap-x-1 items-center">
                    <Icon icon="fa6-regular:registered" width="12" height="12"  className="text-gray-200" />
                    2025 PrometheiaAI. All rights reserved.
                </div>
                <div className="flex gap-x-2 items-center">
                    <div className="text-sm">Privacy Policy</div>
                    <div className="text-sm">Terms of Service</div>
                    <div className="text-sm">Contact Us</div>
                </div>
            </div>
        </div>
    )
}