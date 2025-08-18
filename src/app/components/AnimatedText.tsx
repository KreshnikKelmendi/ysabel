'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const AnimatedText = ({ text, className = "", delay = 0, stagger = 0.1 }: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      rotationX: -90
    });

    // Create animation timeline
    const tl = gsap.timeline({ delay });
    
    tl.to(chars, {
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger,
      ease: "back.out(1.7)"
    });

    // Add hover effect
    chars.forEach((char) => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          scale: 1.2,
          color: '#8F7B29',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          scale: 1,
          color: 'inherit',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      // Cleanup
      chars.forEach((char) => {
        char.removeEventListener('mouseenter', () => {});
        char.removeEventListener('mouseleave', () => {});
      });
    };
  }, [text, delay, stagger]);

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block cursor-pointer transform transition-all duration-300"
          style={{ transformOrigin: 'center' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
