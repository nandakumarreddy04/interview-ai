import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand: `
          text-white
          bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#312e81]
          hover:animate-darkGlow
          border border-[#1e293b]
          shadow-[0_0_10px_rgba(30,64,175,0.3)]
        `,
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 🌃 Dark gradient glow animation
const style = `
@keyframes darkGlow {
  0% {
    background-position: 0% 50%;
    box-shadow: 0 0 10px rgba(59,130,246,0.3);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0 0 20px rgba(147,51,234,0.5);
  }
  100% {
    background-position: 0% 50%;
    box-shadow: 0 0 10px rgba(59,130,246,0.3);
  }
}
.hover\\:animate-darkGlow:hover {
  background: linear-gradient(270deg, #0f172a, #1e3a8a, #312e81, #1e40af);
  background-size: 400% 400%;
  animation: darkGlow 3s ease infinite;
}
`

// inject style once
if (typeof document !== "undefined" && !document.getElementById("dark-glow-style")) {
  const s = document.createElement("style")
  s.id = "dark-glow-style"
  s.textContent = style
  document.head.appendChild(s)
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
