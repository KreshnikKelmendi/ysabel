'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create animated circles
    const circles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      opacity: number;
    }> = [];

    const colors = ['#8F7B29', '#BDBDB9', '#4A6B5A', '#2A4A3A'];
    
    // Initialize circles
    for (let i = 0; i < 8; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      circles.forEach((circle, index) => {
        // Update position
        circle.y -= circle.speed;
        if (circle.y < -circle.radius) {
          circle.y = canvas.height + circle.radius;
          circle.x = Math.random() * canvas.width;
        }

        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.globalAlpha = circle.opacity;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations for container elements
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 2, 
          ease: "power2.out" 
        }
      );
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Animated geometric overlays */}
      <div 
        ref={containerRef}
        className="absolute inset-0"
      >
        {/* Floating triangles */}
        <div className="absolute top-1/4 left-1/6 w-16 h-16 border border-[#8F7B29] opacity-5 rotate-45 transform origin-center">
          <div className="w-full h-full border border-[#8F7B29] opacity-20 rotate-45 transform origin-center"></div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/6 w-20 h-20 border border-[#BDBDB9] opacity-5 -rotate-12 transform origin-center">
          <div className="w-full h-full border border-[#BDBDB9] opacity-20 -rotate-12 transform origin-center"></div>
        </div>
        
        {/* Animated lines */}
        <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#4A6B5A] to-transparent opacity-20 transform -rotate-45 origin-left"></div>
        <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-l from-transparent via-[#8F7B29] to-transparent opacity-20 transform rotate-45 origin-right"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
