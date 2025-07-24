"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} style={{ position: 'relative', zIndex: 0, height: '300vh' }}>
      <div
        style={{
          position: 'sticky',
          top: '20vh',
          display: 'flex',
          height: '60vh',
          width: '100%',
          alignItems: 'flex-start',
          background: 'transparent',
          padding: '0 40px'
        }}
      >
        <span
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '1400px',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: 'rgba(0, 0, 0, 0.2)',
            fontFamily: 'Nugros, sans-serif',
            lineHeight: 1.4,
            letterSpacing: '-0.03em'
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span style={{ position: 'relative', marginLeft: '0.4rem', marginRight: '0.4rem' }}>
      <span style={{ position: 'absolute', opacity: 0.2 }}>{children}</span>
      <motion.span
        style={{ 
          opacity: opacity,
          color: '#151515',
          fontWeight: 700
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};