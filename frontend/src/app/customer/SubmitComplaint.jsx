import { Badge } from "@/components/ui/badge"

import React from "react"
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import {
  Brain,
  Camera,
  File,
  HelpCircle,
  ImageIcon,
  Mic,
  MicOff,
  Paperclip,
  Save,
  Send,
  Trash2,
  Upload,
  X,
  CheckCircle,
} from "lucide-react"
import { ComplaintEditor } from "./ui/ComplaintEditor";

export default function SubmitComplaint() {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(20);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    // other details to send out while raising a complaint
    const [complaintTitle, setComplaintTitle] = useState("");
    const [companyName, setCompanyName] = useState(""); // newly added
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [subCategory, setSubCategory] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [dateOfIncident, setDateOfIncident] = useState("");
    const [editorContent, setEditorContent] = useState(""); // this is our complaintDescription
    const [attemptedToSolveEarlier, setAttemptedToSolveEarlier] = useState(true);
    const [desiredOutcome, setDesiredOutcome] = useState("");
    const [recording, setRecording] = useState(null);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    // User Account Details
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmailAddress, setUserEmailAddress] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPreferredContactMethod, setUserPreferredContactMethod] = useState("");
    const [userID, setUserID] = useState(""); // newly added

    // details needed later not now
    const [messages, setMessages] = useState([]);
    const [suggestedResponses, setSuggestedResponses] = useState([]);
    const [relatedArticles, setRelatedArticles] = useState([]);

    
    const [transcription, setTranscription] = useState("");
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const audioRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const [complaintObject, setComplaintObject] = useState({
        complaintTitle: "",
        category: "",
        subCategory: "",
        ticketID: "",
        dateOfIncident: "",
        complaintDescription: "",
        attemptedToSolveEarlier: "",
        desiredOutcome: "",
        complainImages: "",
        complainVoiceRecording: "",
        complainAdditionalFiles: "",
        companyName: "",

        // These below details go from the user account
        customerFirstName: "",
        customerLastName: "",
        customerEmailAddress: "",
        customerPhoneNumber: "",
        customerPreferredContactMethod: "",
        customerUserID: "",

        // content needed later on
        messages: [],
        suggestedResponses: [],
        relatedArticles: []
    });

  // Mock categories and subcategories
  const categories = [
    { value: "product", label: "Product Issue" },
    { value: "service", label: "Service Issue" },
    { value: "billing", label: "Billing Problem" },
    { value: "delivery", label: "Delivery Problem" },
    { value: "website", label: "Website Issue" },
    { value: "staff", label: "Staff Complaint" },
    { value: "other", label: "Other" },
  ]

  const subcategories = {
    product: [
      { value: "defective", label: "Defective Product" },
      { value: "damaged", label: "Damaged on Arrival" },
      { value: "not-as-described", label: "Not as Described" },
      { value: "missing-parts", label: "Missing Parts" },
    ],
    service: [
      { value: "poor-quality", label: "Poor Quality Service" },
      { value: "delayed", label: "Delayed Service" },
      { value: "not-as-promised", label: "Not as Promised" },
      { value: "rude-staff", label: "Rude Staff" },
    ],
    billing: [
      { value: "overcharged", label: "Overcharged" },
      { value: "unauthorized-charge", label: "Unauthorized Charge" },
      { value: "refund-issue", label: "Refund Issue" },
      { value: "subscription-problem", label: "Subscription Problem" },
    ],
    delivery: [
      { value: "late", label: "Late Delivery" },
      { value: "wrong-address", label: "Wrong Address" },
      { value: "damaged-in-transit", label: "Damaged in Transit" },
      { value: "missing-item", label: "Missing Item" },
    ],
    website: [
      { value: "technical-error", label: "Technical Error" },
      { value: "payment-issue", label: "Payment Issue" },
      { value: "account-problem", label: "Account Problem" },
      { value: "usability-issue", label: "Usability Issue" },
    ],
    staff: [
      { value: "rude-behavior", label: "Rude Behavior" },
      { value: "incompetence", label: "Incompetence" },
      { value: "miscommunication", label: "Miscommunication" },
      { value: "unresponsive", label: "Unresponsive" },
    ],
    other: [
      { value: "feedback", label: "General Feedback" },
      { value: "suggestion", label: "Suggestion" },
      { value: "question", label: "Question" },
      { value: "other", label: "Other Issue" },
    ],
  }

  // Update progress when step changes
    useEffect(() => {
        const progressValues = {
            1: 25,
            2: 50,
            3: 75,
            4: 100,
        };
        setProgress(progressValues[step]);
        }, [step]);

    // Mock recording timer
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            setRecordingTime(0);
        }
        return () => clearInterval(interval);
        }, [isRecording]);

    const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files).map((file) => ({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
        toast({
            title: "Files uploaded",
            description: `${newFiles.length} file(s) successfully uploaded.`,
        });
    }
    };

    useEffect(() => {
        if (step === 4) {
            // now populate the complainObject
            setComplaintObject({
                complaintTitle: complaintTitle,
                companyName: companyName,
                category: selectedCategory,
                subCategory: subCategory,
                ticketID: ticketID,
                dateOfIncident: dateOfIncident,
                complaintDescription: editorContent,
                attemptedToSolveEarlier: attemptedToSolveEarlier,
                desiredOutcome: desiredOutcome,
                complainImages: images,
                complainVoiceRecording: recording,
                complainAdditionalFiles: files,

                // user details, i'll set it soon
                customerFirstName: "Appu"
            });
        }
    }, [step]);


    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map((file) => ({
                url: URL.createObjectURL(file),
                name: file.name,
            }));
            setImages((prev) => [...prev, ...newImages]);
            toast({
                title: "Images uploaded",
                description: `${newImages.length} image(s) successfully uploaded.`,
            });
        }
    };

    // 2
    const handleStartRecording = async () => {
        setIsRecording(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecording(audioUrl); // This URL can be used in an <audio> tag
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;

            toast({
                title: "Recording started",
                description: "Speak clearly into your microphone.",
            });
        } catch (err) {
            console.error("Error accessing microphone:", err);
            toast({
                title: "Microphone error",
                description: "Could not access your microphone.",
                variant: "destructive",
            });
        }
    };


    const handleStopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }

        toast({
            title: "Recording stopped",
            description: "Processing your audio...",
        });

        // Optional: mock transcription
        setTimeout(() => {
            setTranscription("Transcribed text goes here...");
            toast({
                title: "Transcription complete",
                description: "Your recording has been transcribed.",
            });
        }, 1500);
    };


    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveAudio = () => {
        setRecording(null);
        setTranscription("");
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        else return (bytes / 1048576).toFixed(1) + " MB";
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    // 3
    const handleSubmitComplaint = () => {
        // In a real app, this would submit the complaint data to the server
        toast.success("Complaint submitted successfully!", {
        description: "Your complaint has been received. Reference number: COMP-12345",
        action: {
            label: "View status",
            onClick: () => {
            // You can replace this with actual navigation logic
            console.log("Navigating to complaint status page...")
            },
        },
        });

        // Redirect to confirmation page
        setTimeout(() => {
            navigate("/customer/submit-complaint/confirmation");
        }, 1000);

    };

    const handleSaveDraft = () => {
        toast({
            title: "Draft saved",
            description: "Your complaint draft has been saved. You can continue later.",
        });
    };

    

    const stepTitles = [
        "Basic Information",
        "Complaint Details",
        "Supporting Evidence",
        "Contact Information",
        "Review & Submit",
    ];

    

    {/* 
        // to update fields
        setComplaintObject(prev => ({
            ...prev,
            status: "In Progress",
        }));
    */}

    useEffect(() => {
        if (audioRef.current && recording) {
            // Force audio to load the new source
            audioRef.current.load();

            const tryGetDuration = () => {
                // Only if metadata is loaded
                if (audioRef.current.readyState >= 1) {
                    const duration = audioRef.current.duration;
                    if (isFinite(duration)) {
                        console.log("Duration:", duration);
                    } else {
                        console.log("Retrying metadata load...");
                        // Try again after short delay
                        setTimeout(tryGetDuration, 200);
                    }
                } else {
                    setTimeout(tryGetDuration, 200);
                }
            };

            tryGetDuration();
        }
    }, [recording]);

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
            <div className="flex flex-1 py-8 text-center justify-center items-center">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-4xl space-y-8">
                        <div className="space-y-4 text-center">
                            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                                <CheckCircle className="mr-2 h-4 w-4" />Secure & Confidential
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                                Submit a Complaint
                            </h1>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Please provide details about your issue so we can address it properly. All information is kept
                                confidential and secure.
                            </p>
                        </div>

                        <div className="space-y-4">

                            {/* Initial line that step and save draft */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Step {step} of 4: {stepTitles[step - 1]}
                                    </p>
                                    <p className="text-xs text-gray-500">Complete all steps to submit your complaint</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSaveDraft}
                                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Draft
                                    </Button>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                        </div>

                        {step === 1 && (
                            <Card className="border-1 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="pt-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                    <Label htmlFor="complaint-title" className="text-base font-medium text-gray-900">
                                        Complaint Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="complaint-title"
                                        placeholder="Brief summary of your complaint"
                                        required
                                        className="border-gray-200 focus:border-blue-300 focus:ring-blue-100 h-12"
                                        value={complaintTitle}
                                        onChange={(e) => setComplaintTitle(e.target.value)}
                                    />
                                    <p className="text-sm text-gray-500 flex items-start">
                                        Provide a short, descriptive title for your complaint (max 100 characters)
                                    </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="complaint-category" className="text-base font-medium text-gray-900">
                                        Category <span className="text-red-500">*</span>
                                        </Label>
                                        <Select onValueChange={setSelectedCategory}>
                                            <SelectTrigger
                                                id="complaint-category"
                                                className="border-gray-200 focus:border-blue-300 h-12"
                                            >
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedCategory && (
                                        <div className="space-y-3">
                                        <Label htmlFor="complaint-subcategory" className="text-base font-medium text-gray-900">
                                            Subcategory <span className="text-red-500">*</span>
                                        </Label>
                                        <Select onValueChange={setSubCategory}>
                                            <SelectTrigger
                                            id="complaint-subcategory"
                                            className="border-gray-200 focus:border-blue-300 h-12"
                                            >
                                            <SelectValue placeholder="Select a subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {subcategories[selectedCategory]?.map((subcategory) => (
                                            <SelectItem key={subcategory.value} value={subcategory.value}>
                                                {subcategory.label}
                                            </SelectItem>
                                            ))}

                                            </SelectContent>
                                        </Select>
                                        </div>
                                    )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="order-reference" className="text-base font-medium text-gray-900">
                                        Order/Transaction Reference
                                        </Label>
                                        <Input
                                        id="order-reference"
                                        placeholder="e.g., Order #123456 or Transaction ID"
                                        className="border-gray-200 focus:border-blue-300 focus:ring-blue-100 h-12"
                                        value={ticketID}
                                        onChange={(e) => setTicketID(e.target.value)}
                                        />
                                        <p className="text-sm text-gray-500">
                                        If applicable, provide your order number or transaction reference
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="incident-date" className="text-base font-medium text-gray-900">
                                        Date of Incident <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                        id="incident-date"
                                        type="date"
                                        required
                                        className="border-gray-200 focus:border-blue-300 focus:ring-blue-100 h-12"
                                        value={dateOfIncident}
                                        onChange={(e) => setDateOfIncident(e.target.value)}
                                        />
                                    </div>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 2 && (
                            <Card className="border-1 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="pt-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="complaint-description" className="text-base font-medium text-gray-900">
                                        Complaint Description <span className="text-red-500">*</span>
                                        </Label>
                                        <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-sky-600 hover:bg-sky-50">
                                                <HelpCircle className="h-4 w-4" />
                                            </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs bg-white border border-gray-200 shadow-lg">
                                            <p>
                                                Provide a detailed description of your complaint. Include what happened, when it
                                                happened, who was involved, and how it affected you.
                                            </p>
                                            </TooltipContent>
                                        </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    <Tabs defaultValue="editor" className="space-y-4">
                                        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                                        <TabsTrigger
                                            value="editor"
                                            className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
                                        >
                                            Rich Text Editor
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="plain"
                                            className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
                                        >
                                            Plain Text
                                        </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="editor" className="border rounded-lg border-gray-200">
                                        <ComplaintEditor content={editorContent} onChange={setEditorContent} />
                                        </TabsContent>
                                        <TabsContent value="plain">
                                        <Textarea
                                            id="complaint-description"
                                            placeholder="Please describe your complaint in detail..."
                                            className="min-h-[200px] border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                                            value={editorContent ? editorContent.replace(/<[^>]*>/g, "") : ""}
                                            onChange={(e) => setEditorContent(e.target.value)}
                                        />
                                        </TabsContent>
                                    </Tabs>
                                    <p className="text-sm text-gray-500 flex items-start">
                                        Be specific and include all relevant details (min 50 characters)
                                    </p>
                                    </div>

                                    <div className="space-y-4">
                                    <Label className="text-base font-medium text-gray-900">
                                        Have you attempted to resolve this issue before submitting this complaint?
                                    </Label>
                                    <RadioGroup 
                                    value={attemptedToSolveEarlier ? "yes" : "no"}
                                    onValueChange={(val) => setAttemptedToSolveEarlier(val === "yes")} 
                                    className="space-y-3">
                                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                            <RadioGroupItem value="yes" id="previous-attempt-yes"/>
                                            <Label htmlFor="previous-attempt-yes" className="font-normal text-gray-700 cursor-pointer">
                                                Yes, I have tried to resolve this issue before
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                            <RadioGroupItem value="no" id="previous-attempt-no"/>
                                            <Label htmlFor="previous-attempt-no" className="font-normal text-gray-700 cursor-pointer">
                                                No, this is my first attempt to resolve this issue
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                    </div>

                                    <div className="space-y-3">
                                    <Label htmlFor="desired-outcome" className="text-base font-medium text-gray-900">
                                        Desired Outcome <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="desired-outcome"
                                        placeholder="What would you like us to do to resolve your complaint?"
                                        className="min-h-[120px] border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                                        required
                                        value={desiredOutcome}
                                        onChange={(e) => setDesiredOutcome(e.target.value)}
                                    />
                                    <p className="text-sm text-gray-500 flex items-start">
                                        Clearly state what you would like us to do to resolve your complaint
                                    </p>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 3 && (
                            <Card className="border-1 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="pt-8 space-y-8">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-medium text-gray-900">Images</Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => imageInputRef.current?.click()}
                                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                        >
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            Add Images
                                        </Button>
                                        <input
                                            type="file"
                                            ref={imageInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                        />
                                    </div>

                                    {images.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group">
                                            <img
                                                src={image.url || "/placeholder.svg"}
                                                alt={`Uploaded image ${index + 1}`}
                                                className="h-32 w-full object-cover rounded-lg border border-gray-200 shadow-sm"
                                            />
                                            <Button
                                                variant="red"
                                                size="icon"
                                                className="h-6 w-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-white/70"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                            <p className="text-xs mt-2 truncate text-gray-600">{image.name}</p>
                                            </div>
                                        ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-blue-50">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="rounded-full bg-gradient-to-br from-blue-500 to-sky-500 p-4">
                                            <Camera className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">
                                                Upload images related to your complaint
                                            </p>
                                            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF (max 5MB each)</p>
                                            </div>
                                            <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => imageInputRef.current?.click()}
                                            className="bg-white border border-gray-200 hover:bg-gray-50"
                                            >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Select Images
                                            </Button>
                                        </div>
                                        </div>
                                    )}
                                    </div>

                                    <Separator className="bg-gray-200" />

                                    <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-medium text-gray-900">Voice Recording</Label>
                                        {!isRecording && !recording  ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleStartRecording}
                                            className="border-green-200 text-green-700 hover:bg-green-50"
                                        >
                                            <Mic className="mr-2 h-4 w-4" />
                                            Start Recording
                                        </Button>
                                        ) : isRecording ? (
                                        <Button
                                            variant="red"
                                            size="sm"
                                            onClick={handleStopRecording}
                                            className="bg-red-500 hover:bg-red-600 animate-pulse"
                                        >
                                            <MicOff className="mr-2 h-4 w-4" />
                                            Stop Recording ({formatTime(recordingTime)})
                                        </Button>
                                        ) : null}
                                    </div>

                                    {recording  ? (
                                        <div className="space-y-4">
                                        <div className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-sky-50">
                                            <div className="flex-1">
                                                <audio ref={audioRef} controls preload="metadata" className="w-full">
                                                    <source src={recording } type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                            <Button
                                                variant="red"
                                                size="icon"
                                                onClick={handleRemoveAudio}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {transcription && (
                                            <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-medium text-gray-900">Transcription</Label>
                                                <div className="flex items-center">
                                                <Badge variant="outline" className="mr-2 border-sky-200 text-sky-700 bg-sky-50">
                                                    Auto-generated
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 p-0 text-blue-600 hover:text-blue-700"
                                                >
                                                    Edit
                                                </Button>
                                                </div>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-blue-50">
                                                <p className="text-sm text-gray-700">{transcription}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                id="use-transcription"
                                                defaultChecked
                                                className="border-blue-300 text-blue-600"
                                                />
                                                <Label htmlFor="use-transcription" className="text-sm font-normal text-gray-700">
                                                Include this transcription in my complaint
                                                </Label>
                                            </div>
                                            </div>
                                        )}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-green-50">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="rounded-full bg-gradient-to-br from-green-500 to-sky-500 p-4">
                                            <Mic className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">Record your complaint verbally</p>
                                            <p className="text-xs text-gray-500">
                                                Your recording will be transcribed automatically (max 5 minutes)
                                            </p>
                                            </div>
                                            <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleStartRecording}
                                            className="bg-white border border-gray-200 hover:bg-gray-50"
                                            >
                                            <Mic className="mr-2 h-4 w-4" />
                                            Start Recording
                                            </Button>
                                        </div>
                                        </div>
                                    )}
                                    </div>

                                    <Separator className="bg-gray-200" />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-base font-medium text-gray-900">Additional Files</Label>
                                            <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-orange-200 text-orange-700 hover:bg-orange-50"
                                            >
                                                <Paperclip className="mr-2 h-4 w-4" />
                                                Attach Files
                                                </Button>
                                            <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
                                        </div>

                                    {files.length > 0 ? (
                                        <div className="space-y-3">
                                        {files.map((file, index) => (
                                            <div
                                            key={index}
                                            className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-orange-50"
                                            >
                                            <div className="flex items-center space-x-3">
                                                <div className="rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-2">
                                                <File className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {file.size} • {file.type}
                                                </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            </div>
                                        ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-orange-50">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-4">
                                            <Paperclip className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-700">
                                                Attach additional files to support your complaint
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT (max 10MB each)
                                            </p>
                                            </div>
                                            <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-white border border-gray-200 hover:bg-gray-50"
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                Select Files
                                            </Button>
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {step === 4 && (
                            <Card className="border-1 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="pt-2 space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                                            Review Your Complaint
                                        </h3>
                                        <p className="text-gray-600">
                                            Please review all the information below before submitting your complaint.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                                        Basic Information
                                        </h4>
                                        <div className="rounded-lg border border-gray-200 p-6 bg-gradient-to-br from-white to-blue-50">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                                                    Complaint Title
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center">{complaintObject.complaintTitle}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">Category</p>
                                                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center">
                                                    {complaintObject.category} {">"} {complaintObject.subCategory}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                                                    Order Reference
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center">{complaintObject.ticketID}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                                                    Date of Incident
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center">{complaintObject.dateOfIncident}</p>
                                            </div>
                                            
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep(1)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                            Edit
                                            </Button>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                                            Complaint Details
                                        </h4>
                                        <div className="rounded-lg border border-gray-200 p-6 bg-gradient-to-br from-white to-sky-50">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">Complaint Description</p>
                                                <div className="text-sm text-gray-700 mt-2 space-y-2">
                                                <p className="text-left">
                                                    {complaintObject.complaintDescription}
                                                </p>
                                                </div>
                                            </div>
                                        <div className="mt-4">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-start">Desired Outcome</p>
                                            <p className="text-sm text-gray-700 mt-1 flex items-start">
                                            {complaintObject.desiredOutcome}
                                            </p>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep(2)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                            Edit
                                            </Button>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                                        Supporting Evidence
                                        </h4>
                                        <div className="rounded-lg border border-gray-200 p-6 bg-gradient-to-br from-white to-green-50">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                            <div className="rounded-lg bg-blue-100 p-3 inline-flex mb-2">
                                                <ImageIcon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Images</p>
                                            <p className="text-sm font-medium text-gray-900">{complaintObject.complainImages.length} image(s) uploaded</p>
                                            </div>
                                            <div className="text-center">
                                            <div className="rounded-lg bg-green-100 p-3 inline-flex mb-2">
                                                <Mic className="h-5 w-5 text-green-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Voice Recording
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {recording  ? `1 recording (5.7 sec)` : "None"}
                                            </p>
                                            </div>
                                            <div className="text-center">
                                            <div className="rounded-lg bg-orange-100 p-3 inline-flex mb-2">
                                                <Paperclip className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Additional Files
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">{complaintObject.complainAdditionalFiles.length} file(s) uploaded</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep(3)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                            Edit
                                            </Button>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-lg font-medium text-gray-900 flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                                        Contact Information
                                        </h4>
                                        <div className="rounded-lg border border-gray-200 p-6 bg-gradient-to-br from-white to-orange-50">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide text-left">Name</p>
                                                <p className="text-sm font-medium text-gray-900 mt-1 text-left">John Smith</p>
                                            </div>
                                            <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide  text-left">Email</p>
                                            <p className="text-sm font-medium text-gray-900 mt-1 text-left">john.smith@example.com</p>
                                            </div>
                                            <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide text-left">Phone</p>
                                            <p className="text-sm font-medium text-gray-900 mt-1 text-left">(555) 123-4567</p>
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Preferred Contact
                                                </p>
                                                <Badge className="mt-1 bg-blue-100 text-blue-700 border-blue-200">Email</Badge>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep(4)}
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                            Edit
                                            </Button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
                                        <Checkbox id="final-confirmation" required className="border-blue-400 text-blue-600" />
                                        <Label
                                        htmlFor="final-confirmation"
                                        className="text-sm font-normal text-gray-700 cursor-pointer"
                                        >
                                        I confirm that all the information provided is accurate and true to the best of my knowledge{" "}
                                        <span className="text-red-500">*</span>
                                        </Label>
                                    </div>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex justify-between items-center pt-6">
                            {step > 1 ? (
                                <Button variant="outline" onClick={handlePrevStep} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                Previous
                                </Button>
                            ) : (
                                <div></div>
                            )}

                            
                            {step < 4 ? (
                                <Button
                                onClick={handleNextStep}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                                >
                                Next Step
                                </Button>
                            ) : (
                                <Button onClick={handleSubmitComplaint}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                                >
                                    <Send className="mr-2 h-4 w-4" />Submit Complaint
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}