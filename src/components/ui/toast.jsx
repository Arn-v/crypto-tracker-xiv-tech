import * as React from "react"
import { cn } from "@/lib/utils"

export function Toast({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ToastAction({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-transparent bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ToastClose({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ToastDescription({ className, children, ...props }) {
  return (
    <div
      className={cn("text-sm opacity-90", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ToastProvider({ children }) {
  return <>{children}</>
}

export function ToastTitle({ className, children, ...props }) {
  return (
    <div
      className={cn("text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ToastViewport({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
