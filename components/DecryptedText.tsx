"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";

const styles = {
  wrapper: { display: "inline-block", whiteSpace: "pre-wrap" as const },
  srOnly: {
    position: "absolute" as const,
    width: "1px", height: "1px",
    padding: 0, margin: "-1px",
    overflow: "hidden", clip: "rect(0,0,0,0)", border: 0,
  },
};

interface Props {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "inViewHover" | "click";
  clickMode?: "once" | "toggle";
  [key: string]: unknown;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  ...props
}: Props) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");
  const [direction, setDirection] = useState("forward");

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
        : characters.split(""),
    [useOriginalCharsOnly, text, characters]
  );

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) =>
      originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(""),
    [availableChars]
  );

  const computeOrder = useCallback(
    (len: number) => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === "start") {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === "end") {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set<number>();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      arr.splice(idx, 1);
    }
    return new Set<number>(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set<number>();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set());
    }
    setDirection("forward");
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    } else {
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    }
    setDirection("reverse");
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const len = text.length;
      if (revealDirection === "start") return revealedSet.size;
      if (revealDirection === "end") return len - 1 - revealedSet.size;
      const middle = Math.floor(len / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex =
        revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (nextIndex >= 0 && nextIndex < len && !revealedSet.has(nextIndex))
        return nextIndex;
      for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
      return 0;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (direction === "forward") {
            if (prev.size < text.length) {
              const next = getNextIndex(prev);
              const newSet = new Set(prev);
              newSet.add(next);
              setDisplayText(shuffleText(text, newSet));
              return newSet;
            } else {
              clearInterval(intervalRef.current!);
              setIsAnimating(false);
              setIsDecrypted(true);
              return prev;
            }
          }
          if (direction === "reverse") {
            if (pointerRef.current < orderRef.current.length) {
              const idx = orderRef.current[pointerRef.current++];
              const newSet = new Set(prev);
              newSet.delete(idx);
              setDisplayText(shuffleText(text, newSet));
              if (newSet.size === 0) {
                clearInterval(intervalRef.current!);
                setIsAnimating(false);
                setIsDecrypted(false);
              }
              return newSet;
            } else {
              clearInterval(intervalRef.current!);
              setIsAnimating(false);
              setIsDecrypted(false);
              return prev;
            }
          }
        } else {
          if (direction === "forward") {
            setDisplayText(shuffleText(text, prev));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(intervalRef.current!);
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
            }
            return prev;
          }
          if (direction === "reverse") {
            let cur = prev;
            if (cur.size === 0) cur = fillAllIndices();
            const removeCount = Math.max(
              1,
              Math.ceil(text.length / Math.max(1, maxIterations))
            );
            const nextSet = removeRandomIndices(cur, removeCount);
            setDisplayText(shuffleText(text, nextSet));
            currentIteration++;
            if (nextSet.size === 0 || currentIteration >= maxIterations) {
              clearInterval(intervalRef.current!);
              setIsAnimating(false);
              setIsDecrypted(false);
              setDisplayText(shuffleText(text, new Set()));
              return new Set();
            }
            return nextSet;
          }
        }
        return prev;
      });
    }, speed);

    return () => clearInterval(intervalRef.current!);
  }, [
    isAnimating, text, speed, maxIterations, sequential, revealDirection,
    shuffleText, direction, fillAllIndices, removeRandomIndices,
  ]);

  const handleClick = () => {
    if (animateOn !== "click") return;
    if (clickMode === "once") {
      if (isDecrypted) return;
      setDirection("forward");
      triggerDecrypt();
    }
    if (clickMode === "toggle") {
      isDecrypted ? triggerReverse() : triggerDecrypt();
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current!);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click") {
      encryptInstantly();
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
    setDirection("forward");
  }, [animateOn, text, encryptInstantly]);

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === "click"
      ? { onClick: handleClick }
      : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...animateProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
