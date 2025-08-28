'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import AnimatedText from './AnimatedText';

const LaunchingSoon = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

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

    // Show modal after 3000ms
    const modalTimer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => {
      // Cleanup animations and timer
      gsap.killTweensOf([logoRef.current, titleRef.current, subtitleRef.current]);
      clearTimeout(modalTimer);
    };
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      // Modal entrance animation
      gsap.fromTo(modalRef.current, 
        {
          opacity: 0,
          scale: 0.8,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [showModal]);

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

  const handleApplyNow = () => {
    // Open Etsy link in new tab
    window.open('https://docs.google.com/forms/u/0/d/e/1FAIpQLSe53IDY9m1fSS6ZOJVmtopRkHB7sWiMdxAlfnNie9pGXA0GQw/viewform?pli=1', '_blank');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#1A372A] flex flex-col justify-between px-4 py-0 relative">
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
            className="w-56 h-56 lg:w-72 lg:h-72 mt-[-5px] lg:mt-0"
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
            delay={0.4}
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
            delay={1.2}
            stagger={0.03}
          />
          <br/> 
          <AnimatedText 
            text="Opening in Prishtina" 
            delay={1.8}
            stagger={0.04}
            className="text-[#8F7B29] font-medium"
          />
        </p>
        
        {/* Simple decorative line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8F7B29] to-transparent opacity-60"></div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 mt-24 flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-black/50 p-4 lg:p-8 mx-10 max-w-md lg:max-w-xl w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-2 cursor-pointer text-[#BDBDB9] hover:text-white transition-colors duration-200 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-rhiffiral text-[#8F7B29] mb-4 tracking-wider">
                Join the Ysabel Team
              </h2>
              <p className="text-[#BDBDB9] font-roboto mb-4 leading-relaxed">
                Now Hiring! Explore our open positions.
              </p>
              <button
                onClick={handleApplyNow}
                className="bg-gradient-to-r w-full from-[#8F7B29] font-bold font-roboto to-[#D2BF53] text-[#1A372A] uppercase px-8 py-2 hover:from-[#BDBDB9] hover:to-[#8F7B29] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchingSoon;
