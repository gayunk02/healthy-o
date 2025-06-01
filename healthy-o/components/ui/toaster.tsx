"use client"

import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "../../hooks/use-toast"
import { cn } from "../../lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={5000}>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "bg-white border-2 shadow-lg backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
              "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full",
              "data-[state=open]:slide-in-from-top-full",
              "data-[state=closed]:duration-300 data-[state=open]:duration-500",
              variant === "destructive" ? 
                "border-red-500 bg-red-500 text-white" : 
                "border-[#0B4619]/10 text-[#0B4619]"
            )}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className={cn(
                  "font-semibold text-base",
                  variant === "destructive" ? "text-white" : "text-[#0B4619]"
                )}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={cn(
                  "text-[15px] leading-relaxed",
                  variant === "destructive" ? "text-white/95" : "text-[#0B4619]/95"
                )}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={cn(
              "absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
              variant === "destructive" ? 
                "text-white focus:ring-red-400 focus:ring-offset-red-600" : 
                "text-[#0B4619] focus:ring-[#0B4619] focus:ring-offset-[#0B4619]/10"
            )} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
