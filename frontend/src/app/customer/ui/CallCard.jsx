"use client"

import { useState, useRef, useEffect, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, X, Minus, Maximize2, User } from "lucide-react"
import Draggable from "react-draggable";

export function CallCard({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isConnecting, setIsConnecting] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const cardRef = useRef(null)

  // Simulate call connection
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 3000)

    return () => clearTimeout(connectTimer)
  }, [])

  // Call duration timer
  useEffect(() => {
    let interval
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isConnected])

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (isMinimized) return

    setIsDragging(true)
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Keep within viewport bounds
      const maxX = window.innerWidth - 320 // card width
      const maxY = window.innerHeight - 400 // card height

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleEndCall = () => {
    onClose()
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleMaximize = () => {
    setIsMinimized(false)
  }

  const nodeRef = useRef(null);
  if (isMinimized) {
    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef} className="fixed bottom-4 right-4 z-50 cursor-grab active:cursor-grabbing" style={{ transform: "none" }}>
                <Card className="w-64 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl border-0">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white/20">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Agent" />
                        <AvatarFallback className="bg-white/20 text-white">
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="font-medium text-sm">Sarah Johnson</p>
                        <p className="text-xs opacity-90">
                            {isConnecting ? "Connecting..." : isConnected ? formatDuration(callDuration) : "Call ended"}
                        </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={handleMaximize}
                        >
                        <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={handleEndCall}
                        >
                        <PhoneOff className="h-4 w-4" />
                        </Button>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>
        </Draggable>
    )
  }

  return (
    <div
      ref={cardRef}
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <Card className="w-80 bg-white shadow-2xl border-0 overflow-hidden pt-0">
        <CardHeader
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Agent" />
                <AvatarFallback className="bg-white/20 text-white">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-sm opacity-90">Customer Support Agent</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleMinimize}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 text-center">
          <div className="space-y-6">
            {/* Call Status */}
            <div className="space-y-2">
              {isConnecting ? (
                <>
                  <div className="flex justify-center">
                    <div className="animate-pulse">
                      <div className="w-4 h-4 bg-amber-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-900">Connecting...</p>
                  <p className="text-sm text-gray-500">Please wait while we connect you</p>
                </>
              ) : isConnected ? (
                <>
                  <div className="flex justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-lg font-medium text-gray-900">Connected</p>
                  <p className="text-2xl font-mono text-green-600">{formatDuration(callDuration)}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-900">Call Ended</p>
                  <p className="text-sm text-gray-500">Thank you for contacting us</p>
                </>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                size="icon"
                variant={isMuted ? "default" : "outline"}
                className={`h-12 w-12 rounded-full ${
                  isMuted
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Button
                size="icon"
                variant={isSpeakerOn ? "default" : "outline"}
                className={`h-12 w-12 rounded-full ${
                  isSpeakerOn ? "bg-blue-500 hover:bg-blue-600 text-white" : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              >
                {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>

              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>

            {/* Call Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>Call quality: Excellent</p>
              <p>This call may be recorded for quality assurance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
