"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function lenisStop() {
  lenisInstance?.stop();
}

export function lenisStart() {
  lenisInstance?.start();
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoResize: true, // Forces recalculation on page zoom/resize
      respectReducedMotion: false, // Don't let OS "Reduce Motion" disable smooth wheel
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Standard high-res timestamp RAF loop
    function update(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(update);
    }

    rafId.current = requestAnimationFrame(update);

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
      } else {
        // Pass performance.now() so Lenis doesn't freeze or jump
        rafId.current = requestAnimationFrame((time) => update(time));
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}