import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "light" | "outline-light" | "ghost";
  size?: "default" | "sm";
  href?: string;
  icon?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  href,
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-[10px] cursor-pointer font-bold tracking-[.005em] transition-all duration-220 ease-[var(--m-ease-out)] whitespace-nowrap leading-none border border-transparent";
  
  const sizeClasses =
    size === "sm"
      ? "px-[18px] py-[10px] text-[var(--m-text-sm)] rounded-[var(--radius-md)]"
      : "px-[24px] py-[14px] text-[var(--m-text-base)] rounded-[var(--radius-md)]";

  const variants = {
    primary:
      "bg-[var(--m-accent)] text-[var(--m-accent-on)] hover:bg-[var(--m-accent-hover)] hover:-translate-y-[1px]",
    dark: "bg-[var(--m-ink)] text-white hover:bg-black",
    light:
      "bg-white text-[var(--m-ink)] border-[var(--m-border-strong)] hover:bg-[var(--m-gray-50)] hover:border-[var(--m-ink)]",
    "outline-light":
      "bg-white/5 text-white border-white/45 hover:bg-white/10 hover:border-white",
    ghost:
      "bg-transparent text-[var(--m-accent)] px-[4px] hover:text-[var(--m-accent-hover)] hover:gap-[14px] on-dark:text-[var(--m-accent-bright)]",
  };

  const classes = cn(baseClasses, sizeClasses, variants[variant], className);

  if (href) {
    // Determine if it's an anchor or internal link based on if it starts with #
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} {...(props as any)}>
          {children}
          {icon && <span className="[&>svg]:w-[17px] [&>svg]:h-[17px]">{icon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(props as any)}>
        {children}
        {icon && <span className="[&>svg]:w-[17px] [&>svg]:h-[17px]">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {icon && <span className="[&>svg]:w-[17px] [&>svg]:h-[17px]">{icon}</span>}
    </button>
  );
}

export function LinkArrow({
  href,
  className,
  onDark = false,
  children,
  ...props
}: { href: string; className?: string; onDark?: boolean; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(
    "inline-flex items-center gap-[8px] font-bold text-[var(--m-text-base)] transition-all duration-200 ease-[var(--m-ease-out)] hover:gap-[12px]",
    onDark
      ? "text-[var(--m-accent-bright)] hover:text-[var(--m-accent-bright)]"
      : "text-[var(--m-accent)] hover:text-[var(--m-accent-hover)]",
    className
  );
  
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        <ArrowRight className="w-[16px] h-[16px]" />
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...(props as any)}>
      {children}
      <ArrowRight className="w-[16px] h-[16px]" />
    </Link>
  );
}
