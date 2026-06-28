import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-rose-100 bg-white/80 px-4 text-[15px] text-rose-900",
        "placeholder:text-rose-400/50",
        "transition-colors duration-200",
        "focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-100",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
