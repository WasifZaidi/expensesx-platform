import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  shadow = "shadow-sm",
  inputSize = "default",
  bg = "",
  ...props
}: React.ComponentProps<"input"> & {
  shadow?: boolean | string
  inputSize?: "sm" | "default" | "lg" | string,
  bg?: boolean | string
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        `w-full min-w-0 rounded-lg border border-input ${bg ? `bg-gray-100` : ``} transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
        // inputSize variants
        inputSize === "sm" && "h-8 px-2 py-0.5 text-xs md:text-xs rounded-sm",
        inputSize === "default" && "h-9 px-2.5 py-1 text-base md:text-sm",
        inputSize === "lg" && "h-10 px-3 py-1.5 text-base md:text-base",
        typeof inputSize === "string" && !["sm", "default", "lg"].includes(inputSize) && inputSize,
        // Shadow variants
        typeof shadow === "string"
          ? shadow
          : shadow
            ? "shadow-sm"
            : "shadow-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
