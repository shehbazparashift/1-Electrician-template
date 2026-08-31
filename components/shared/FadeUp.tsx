"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface FadeUpProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  delay?: number;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function FadeUp({
  delay = 0,
  duration = 0.6,
  className,
  children,
  ...props
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [skipEntrance, setSkipEntrance] = useState(false);

  // If the element is already on-screen the moment it mounts (e.g. it's
  // near the top of the page on a fresh load), skip the fade-up entirely
  // so it doesn't visibly animate in — only content revealed by scrolling
  // down should play the reveal animation.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const isAlreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyInView) setSkipEntrance(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={skipEntrance ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
