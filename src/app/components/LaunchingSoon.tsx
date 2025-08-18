'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnimatedText from './AnimatedText';

const LaunchingSoon = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Initial animation setup
    gsap.set([logoRef.current, titleRef.current, subtitleRef.current], {
      opacity: 0
    });

    // Entrance animation timeline
    const tl = gsap.timeline({ ease: "power3.out" });
    
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    .to(titleRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(subtitleRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    // Subtle floating animation for logo
    gsap.to(logoRef.current, {
      y: -5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      // Cleanup animations
      gsap.killTweensOf([logoRef.current, titleRef.current, subtitleRef.current]);
    };
  }, []);

  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#1A372A] flex flex-col justify-between px-4 py-8">
      <div className="flex-1 flex flex-col justify-center">
        {/* Logo with hover effect */}
        <div 
          ref={logoRef}
          className="flex justify-center cursor-pointer transform transition-all duration-300"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <Image
            src="/assets/ysabel-logo-white.png"
            alt="Ysabel Logo"
            width={320}
            height={80}
            className="w-52 h-52 lg:w-72 lg:h-72"
            priority
          />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {/* Main Content with Animated Text */}
        <h1 
          ref={titleRef}
          className="text-3xl md:text-[40px]  font-rhiffiral text-[#BDBDB9] mb-2 tracking-wider drop-shadow-lg text-center"
        >
          <AnimatedText 
            text="Launching Soon" 
            delay={1.2}
            stagger={0.05}
          />
        </h1>
        
        {/* Subtitle with enhanced styling */}
        <p 
          ref={subtitleRef}
          className="text-xs lg:text-sm text-[#8F7B29] font-roboto tracking-wide leading-relaxed drop-shadow-md text-center"
        >
          <AnimatedText 
            text="The taste of many worlds, gathered in one society" 
            delay={1.8}
            stagger={0.03}
          />
          <br/> 
          <AnimatedText 
            text="Opening in Prishtina" 
            delay={2.2}
            stagger={0.04}
            className="text-[#8F7B29]  font-medium"
          />
        </p>
        
        {/* Simple decorative line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8F7B29] to-transparent opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default LaunchingSoon;
