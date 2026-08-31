import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onDark?: boolean;
  className?: string;
  noTick?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  onDark = false,
  className,
  noTick = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[720px]", className)}>
      <span
        className={cn(
          "m-eyebrow",
          onDark && "on-dark",
          noTick && "no-tick"
        )}
      >
        {eyebrow}
      </span>
      <h2 className={cn("m-sec-title", onDark && "on-dark")}>{title}</h2>
      {subtitle && (
        <p className={cn("m-sec-sub", onDark && "on-dark")}>{subtitle}</p>
      )}
    </div>
  );
}
