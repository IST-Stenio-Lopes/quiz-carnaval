"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface AutoConfettiProps {
  isActive: boolean;
}

export function AutoConfetti({ isActive }: AutoConfettiProps) {
  useEffect(() => {
    if (!isActive) return;

    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount: 50,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250); 

    return () => clearInterval(interval);
  }, [isActive]);

  return null;
}