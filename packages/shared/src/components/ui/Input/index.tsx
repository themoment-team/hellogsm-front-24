import * as React from "react";

import { cn } from "shared/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width: "full" | "large" | "medium" | "small";
  icon?: React.ReactNode;
}

const WIDTH_ENUM = {
  full: "full",
  large: "[400px]",
  medium: "미정",
  small: "미정",
} as const;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, width, icon, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-${WIDTH_ENUM[width]} rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
