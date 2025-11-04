import * as React from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none px-4 py-2"

  const variants = {
    default: "bg-primary text-black hover:bg-yellow-500",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
