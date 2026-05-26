"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

interface AnimatedContentProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "style"
  > {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  style?: React.CSSProperties;
}

const easeMap: Record<string, "easeOut" | "easeIn" | "linear"> = {
  "power3.out": "easeOut",
  "power3.in": "easeIn",
  "power2.out": "easeOut",
  "power2.in": "easeIn",
  linear: "linear",
};

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [hasEntered, setHasEntered] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const offset = reverse ? -distance : distance;
  const axisKey = direction === "horizontal" ? "x" : "y";

  const initialStyle = useMemo(
    () => ({
      x: direction === "horizontal" ? offset : 0,
      y: direction === "vertical" ? offset : 0,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    }),
    [animateOpacity, direction, initialOpacity, offset, scale]
  );

  const animateStyle = useMemo(
    () => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    }),
    []
  );

  const disappearStyle = useMemo(
    () => ({
      [axisKey]: reverse ? distance : -distance,
      scale: 0.8,
      opacity: animateOpacity ? initialOpacity : 0,
    }),
    [animateOpacity, axisKey, direction, distance, initialOpacity, reverse]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let root: Element | null = null;
    if (typeof container === "string") {
      root = document.querySelector(container);
    } else if (container instanceof Element) {
      root = container;
    } else {
      root = document.getElementById("snap-main-container");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasEntered) return;
        setHasEntered(true);
      },
      {
        root,
        threshold,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [container, hasEntered, threshold]);

  useEffect(() => {
    if (!hasEntered) return;

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
      if (disappearAfter > 0) {
        const disappearTimer = window.setTimeout(() => {
          setIsDisappearing(true);
          const disappearanceCompleteTimer = window.setTimeout(() => {
            onDisappearanceComplete?.();
          }, disappearDuration * 1000);
          timersRef.current.push(disappearanceCompleteTimer);
        }, disappearAfter * 1000);
        timersRef.current.push(disappearTimer);
      }
    }, (delay + duration) * 1000);

    timersRef.current.push(completeTimer);

    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, [
    delay,
    disappearAfter,
    disappearDuration,
    duration,
    hasEntered,
    onComplete,
    onDisappearanceComplete,
  ]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialStyle}
      animate={isDisappearing ? disappearStyle : hasEntered ? animateStyle : initialStyle}
      transition={{
        duration: isDisappearing ? disappearDuration : duration,
        delay: isDisappearing ? 0 : delay,
        ease:
          easeMap[isDisappearing ? disappearEase : ease] || easeMap["power3.out"],
      }}
      style={{ visibility: "visible", ...style }}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
