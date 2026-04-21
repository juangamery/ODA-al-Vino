import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "paper" | "wine" | "plum" | "olive" | "harvest";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, variant = "paper", ...props }, ref) => {
    const variants = {
      paper: "bg-paper text-wine",
      wine: "bg-wine text-paper",
      plum: "bg-plum text-paper",
      olive: "bg-olive text-paper",
      harvest: "bg-harvest text-paper",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "section-glow relative overflow-hidden py-20 md:py-24 lg:py-32",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export function Container({ 
  children, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "container mx-auto px-6 md:px-8 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
