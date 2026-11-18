"use client"

import { Dithering, type DitheringProps } from "@paper-design/shaders-react"
import { cn } from "@/lib/utils"

export function DitheringShader({ className, ...props }: DitheringProps) {
  return (
    <Dithering
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    />
  )
}
