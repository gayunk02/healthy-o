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
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "bg-white border-2 shadow-lg backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
              "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=closed]:duration-300",
              "data-[state=open]:slide-in-from-top-full data-[state=open]:duration-300",
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
              "transition-colors",
              variant === "destructive" ? 
                "text-white/70 hover:text-white" : 
                "text-[#0B4619]/50 hover:text-[#0B4619]"
            )} />
          </Toast>
        )
      })}
      <ToastViewport 
        className="fixed top-0 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-6 w-[420px] max-w-[100vw] m-0 list-none z-[100] outline-none items-center" />
    </ToastProvider>
  )
}
