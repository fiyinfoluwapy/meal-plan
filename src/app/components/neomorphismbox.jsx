import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function NeomorphicBox({ children, className = '', delay = 0, side = 'left' }) {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      {
        opacity: 0,
        x: side === 'left' ? -50 : 50,
        y: 50,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    );
  }, [delay, side]);

  return (
    <div
      ref={boxRef}
      className={`
        relative bg-white rounded-2xl p-6
        shadow-[8px_8px_16px_0px_rgba(93,88,83,0.15),-8px_-8px_16px_0px_rgba(255,255,255,0.7)]
        hover:shadow-[12px_12px_20px_0px_rgba(93,88,83,0.2),-12px_-12px_20px_0px_rgba(255,255,255,0.8)]
        transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
