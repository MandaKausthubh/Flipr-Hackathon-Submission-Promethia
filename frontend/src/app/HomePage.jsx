import { useState } from "react"
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
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
import { Zap } from "lucide-react";
import { Shield } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Star } from "lucide-react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const onHandleSignUP = () => {
    navigate("/auth");
  };

  return (
    <div className="">

      {/* Top bar */}
      <div className="">
        <div className="py-4 flex justify-between px-20"> 
          <div className="flex gap-x-2 items-center">
            <div className="rounded-full h-11 w-11">
              <img src="/logo.png"/>
            </div>
            <div className="text-lg text-black font-semibold">PrometheiaAI</div>
          </div>
          <div className="flex justify-between items-center gap-x-6">
            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">Submit Complaint</div>
            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">Track Complaint</div>
            <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm cursor-pointer">Help Center</div>
          </div>
          <div className="flex justify-between items-center gap-x-6">
            <Link to="/auth">
              <div className="text-black font-semibold hover:text-gray-500 justify-center items-center text-sm">Login</div>
            </Link>
            <Button variant="outline" className="shadow-none px-3 hover:bg-black:70 text-white bg-black" onClick={onHandleSignUP}>Sign Up</Button>
            <Select>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="EN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">EN</SelectItem>
                <SelectItem value="hindi">HIN</SelectItem>
                <SelectItem value="german">GER</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex px-20 items-center">
        <div className="flex flex-col justify-center gap-y-4 pr-14">
          <div className="inline-flex rounded-4xl bg-blue-100 items-center px-4 py-2 text-sm font-medium text-blue-600 w-[200px]">
            <Zap className="mr-2 h-4 w-4" />
            Powered by NatashaAI
          </div>
          <div className="text-6xl font-bold text-left">
              <div className="text-black pb-1">We're here to listen and help.</div>
              <div className="text-blue-700 pb-1">Got a question?</div>
              <div className="text-black pb-1">We're just a click away!</div>
          </div>
          <div className="text-base text-gray-500 text-left pt-2">
            <p>Your feedback matters. Submit a complaint and our smart AI system—resolving 94% of issues</p> 
            <p>instantly—will jump into action. And if you ever need more help, our friendly support agents</p>
            <p>are always here for you.</p>
          </div>
          <div className="flex gap-x-4 pt-1">
            <Button variant="outline" className="bg-blue-500 text-white text-sm py-5 items-center rounded-lg">
              <Icon icon="hugeicons:complaint" width="80" height="80"  style={{color: "#fdfcfc"}} className="hover:text-black"/>
              Submit a Complaint
            </Button>
            <Button variant="outline" className="bg-black text-white text-sm py-5 items-center rounded-lg flex gap-x-2">
              <Icon icon="grommet-icons:map-location" width="64" height="64"  style={{color: "#fdfcfc"}} className="hover:text-black"/>
              Track Existing Complaint
            </Button>
          </div>
        </div>
        <div className="relative w-[800px] h-[800px]">
          <div className="absolute w-[750px] h-[750px] bg-blue-50 rounded-full z-0 left-16 top-14"></div>
          <img src={customerAgent} alt="Team photo" className="w-[800px] h-[800px] relative z-1"/>
        </div>
      </div>

      <div className="relative z-2 px-20">
        <div className="flex items-center">
          <img src={customerAgent2} alt="Team photo 1" className="w-[900px] h-[800px] pr-32"/>
          <div className="flex flex-col gap-y-4">
            <div className="text-6xl font-bold text-left">Transform your<p>Enterprise customer service</p></div>
            <div className="text-base text-left text-gray-500 pt-3">
              <p>Unlock the full potential of your customer service operations with our advanced</p>
              <p>software. Streamline processes, enhance communication, and deliver</p>
              <p>exceptional experiences that show your customers they truly matter.</p>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="bg-blue-500 text-white text-sm py-5 items-center rounded-lg">Get Started</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 px-20">
        <div className="font-bold text-xl flex justify-center items-center text-blue-500 mb-0.5">To Customers</div>
        <div className="font-bold text-4xl flex justify-center items-center mb-10">We Offer Best Services</div>

        <div className="flex justify-between">
        
          <div className="shadow-lg rounded-xl items-center px-14 py-14 border-1 border-green-100 bg-green-50 ">
            <div className="w-full flex justify-center">
              <div className="flex justify-center items-center bg-green-600 w-12 h-12 rounded-lg">
                <Icon icon="tdesign:task-checked-1" width="28" height="28"  className="text-white"/>
              </div>
            </div>
            <div className="flex text-2xl font-semibold justify-center items-center py-2">Easy Submission</div>
            <div className="text-gray-500 text-center text-base">
              <p>Our streamlined process makes it simple to</p>
              <p>submit your complaint with all necessary</p>
              <p>details.</p>
            </div>
          </div>

          <div className="shadow-lg rounded-xl items-center px-14 py-14 border-1 border-gray-100">
            <div className="flex justify-center items-center rounded-lg">
              <Icon icon="material-symbols-light:media-output-outline-rounded" width="40" height="40"  style={{color: "#2ca5ff"}} className="rounded-lg"/>
            </div>
            <div className="flex text-2xl font-semibold justify-center items-center py-2">Rich Media Support</div>
            <div className="text-gray-500 text-center text-base">
              <p>Add images, voice, recordings, and detailed</p>
              <p>descriptions to help us understand your</p>
              <p>issue better</p>
            </div>
          </div>

          <div className="shadow-lg rounded-xl items-center px-14 py-14 border-1 border-gray-100">
            <div className="flex justify-center items-center">
              <Icon icon="svg-spinners:clock" width="32" height="32"  style={{color: "#2ca5ff"}} />
            </div>
            <div className="flex text-2xl font-semibold justify-center items-center py-2">Fast Resolution</div>
            <div className="text-gray-500 text-center text-base">
              <p>Track your complaint status in real-time and</p>
              <p>receive timely updates as we work to resolve</p>
              <p>your issue.</p>
            </div>
          </div>

          <div className="shadow-lg rounded-xl items-center px-14 py-14 border-1 border-gray-100">
            <div className="flex justify-center items-center">
              <Icon icon="mdi:sun-moon-stars" width="36" height="36"  style={{color: "#2ca5ff"}} />
            </div>
            <div className="flex text-2xl font-semibold justify-center items-center py-2">24/7 Support</div>
            <div className="text-gray-500 text-center text-base">
              <p>Our AI and support team are always</p>
              <p>available—day or night—to help you</p>
              <p>whenever you need assistance.</p>
            </div>
          </div>

        </div>

      </div>

      <section className="border-t bg-gradient-to-br from-gray-50 to-primary-50 py-16 justify-center">
        <div className="px-96">
          <div className="w-full space-y-8 justify-center">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-black">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple, AI-powered process to address your concerns efficiently
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Submit",
                  description: "Fill out our comprehensive complaint form with all relevant details",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50",
                },
                {
                  step: "2",
                  title: "Review",
                  description: "Our AI system and team carefully review your complaint and assign it to a specialist",
                  color: "from-sky-500 to-sky-600",
                  bgColor: "bg-sky-50",
                },
                {
                  step: "3",
                  title: "Investigate",
                  description: "We investigate your issue thoroughly and determine the best solution",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "bg-orange-50",
                },
                {
                  step: "4",
                  title: "Resolve",
                  description: "We implement the solution and follow up to ensure your satisfaction",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50",
                },
              ].map((step, index) => (
                <div key={index} className="group relative text-center">
                  <div
                    className={`relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-xl font-bold text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}
                  >
                    {step.step}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 animate-pulse-glow`}
                    ></div>
                  </div>
                  <div className={`rounded-lg ${step.bgColor} p-4 border border-opacity-20`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="w-full px-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  <Shield className="mr-2 h-4 w-4" />
                  Trusted by 10,000+ customers
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-black">
                  Need immediate assistance?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our AI assistant is available 24/7 to help you with any questions or issues you might have. Get
                  instant responses and personalized solutions.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat with AI Assistant
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                >
                  Request Human Agent
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Assistant Preview</h3>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-success-500 animate-pulse"></div>
                    <span className="text-xs text-success-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <p className="text-sm text-gray-700">
                      Hello! I'm your AI support assistant. How can I help you today?
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-primary-50 to-info-50 p-4 ml-auto max-w-[80%] border border-primary-100">
                    <p className="text-sm text-gray-700">I'm having trouble resetting my password.</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                    <p className="text-sm text-gray-700">
                      I can help with that! To reset your password, please follow these steps:
                      <br />
                      <span className="font-medium text-primary-700">1. Go to the login page</span>
                      <br />
                      <span className="font-medium text-primary-700">2. Click on "Forgot Password"</span>
                      <br />
                      <span className="font-medium text-primary-700">3. Enter your email address</span>
                      <br />
                      <br />
                      Would you like me to guide you through this process?
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <Button
                    size="sm"
                    className="rounded-lg h-12 w-12 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 p-3 shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
