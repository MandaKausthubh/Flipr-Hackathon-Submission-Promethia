import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, CheckCircle, Clock, FileText, MessageSquare } from "lucide-react"
import { Icon } from "@iconify/react";

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-blue-400/10 p-3">
                <CheckCircle className="h-12 w-12 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Complaint Submitted Successfully!</h1>
                <p className="text-muted-foreground">
                  Thank you for bringing this to our attention. We've received your complaint and will begin working on
                  it right away.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
                <CardDescription>Reference information for your records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Complaint Reference</p>
                      <p className="text-xl font-bold">COMP-12345</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Submission Date</p>
                      <p className="text-lg">May 23, 2025</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <p>Received</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">What happens next?</p>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Review</p>
                        <p className="text-sm text-muted-foreground">
                          Our team will review your complaint within 24 hours
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Investigation</p>
                        <p className="text-sm text-muted-foreground">
                          We'll investigate your issue and may contact you for additional information
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Resolution</p>
                        <p className="text-sm text-muted-foreground">
                          We'll work to resolve your complaint and keep you updated on our progress
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="rounded-md bg-muted/50 p-4 w-full">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Estimated Response Time</p>
                      <p className="text-sm text-muted-foreground">
                        You should receive an initial response within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  A confirmation email has been sent to john.smith@example.com with these details.
                </p>
              </CardFooter>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-500" asChild>
                <Link href="/track-complaint">
                  <FileText className="mr-2 h-4 w-4" />
                  Track Your Complaint
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/submit-complaint">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Another Complaint
                </Link>
              </Button>
            </div>

            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-lg font-medium">Need Immediate Assistance?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If your issue requires urgent attention, you can contact our support team directly.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
                <Button variant="outline">Call Support: (800) 123-4567</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

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
  )
}
