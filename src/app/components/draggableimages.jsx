'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const DraggableImages = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    Draggable.create(container, {
      type: 'x',
      bounds: container.parentElement,
      inertia: true,
      onPress() {
        container.style.cursor = 'grabbing';
      },
      onRelease() {
        container.style.cursor = 'grab';
      },
    });
  }, []);

  return (
    <div className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="flex gap-6 cursor-grab">
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Meal 1"
          className="rounded-2xl w-64 h-64 object-cover shadow-xl split-image"
        />
        <img
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Meal 2"
          className="rounded-2xl w-64 h-64 object-cover shadow-xl split-image"
        />
      </div>
    </div>
  );
};

export default DraggableImages;
