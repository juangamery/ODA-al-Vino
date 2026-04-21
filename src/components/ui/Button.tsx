import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-wine text-paper hover:bg-plum active:scale-95 shadow-[0_16px_40px_rgba(71,7,44,0.22)]",
      secondary: "bg-plum text-paper hover:bg-wine active:scale-95 shadow-[0_14px_36px_rgba(112,1,67,0.18)]",
      outline: "border-2 border-wine text-wine hover:bg-wine hover:text-paper active:scale-95",
      ghost: "text-wine hover:bg-wine/10 active:scale-95",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-4 text-base font-semibold",
      lg: "px-10 py-5 text-lg font-bold tracking-tight",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-[0.16em]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
