import { toast as sonnerToast } from "sonner"

interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      return sonnerToast(options.title, {
        description: options.description,
        className: options.variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
      })
    },
  }
} 