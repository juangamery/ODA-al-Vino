import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "wine" | "plum" | "olive" | "paper";
}

export function Badge({ 
  children, 
  className, 
  variant = "wine",
  ...props 
}: BadgeProps) {
  const variants = {
    wine: "bg-wine text-paper",
    plum: "bg-plum text-paper",
    olive: "bg-olive text-paper",
    paper: "bg-paper text-wine border border-wine",
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function WaxSeal({ className }: { className?: string }) {
  return (
    <div className={cn("w-20 h-20 relative shrink-0", className)}>
      <img
        src="/oda/brand/lacre_oav.svg"
        alt="Lacre OAV"
        className="w-full h-full object-contain drop-shadow-xl"
      />
    </div>
  );
}
