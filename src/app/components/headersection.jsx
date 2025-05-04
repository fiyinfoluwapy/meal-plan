"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import FloatingIcon from './floatingicon';
import Button from './button';

import {
  UtensilsIcon,
  CakeIcon,
  BoxIcon,
  SaladIcon,
  Soup,
  ChefHatIcon,
  TimerIcon,
  HeartIcon,
} from 'lucide-react';

const HeaderSection = () => {
  useEffect(() => {
    // Animate Floating Icons
    gsap.fromTo(
      '.floating-icon',
      { opacity: 0, x: -100, y: -100 },
      { opacity: 1, x: 0, y: 0, stagger: 0.3, duration: 1.5 }
    );

    // Animate the Main Heading
    gsap.fromTo(
      '.header-text',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    );

    // Keep staircase layout for images
    const images = gsap.utils.toArray('.split-image');
    images.forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, x: index % 2 === 0 ? 100 : -100, y: -100 },
        {
          opacity: 1,
          x: 0,
          y: index * 16, // 16px step — adjust to taste
          duration: 1.2,
          delay: index * 0.2,
          ease: 'power3.out'
        }
      );
    });

    // Button bounce
    gsap.fromTo(
      '.jump-button',
      { scale: 1 },
      { scale: 1.1, repeat: -1, yoyo: true, duration: 0.5, ease: 'ease.inOut' }
    );
  }, []);

  return (
    <section className="relative bg-black min-h-[90vh] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content (Text) */}
          <div className="w-full md:w-1/2 z-10 mb-12 md:mb-0">
            <div className="header-text">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your weekly <br />
                <span className="text-[#E89434]">meal plan,</span> <br />
                simplified<span className="text-[#E89434]">...</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
                Search recipes, plan your meals, and generate smart grocery lists—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="primary" className="jump-button">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Images + Background Icons */}
          <div className="relative w-full md:w-1/2 flex flex-wrap justify-center gap-6 z-20">
            {/* Floating Icons (now above the images but still decorative) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div className="floating-icon absolute top-4 left-6 md:top-2 md:left-4">
                <FloatingIcon icon={UtensilsIcon} />
              </div>
              <div className="floating-icon absolute bottom-36 right-24 md:bottom-48 md:right-32">
                <FloatingIcon icon={CakeIcon} />
              </div>
              <div className="floating-icon absolute top-24 right-6 md:top-20 md:right-10">
                <FloatingIcon icon={ChefHatIcon} />
              </div>
              <div className="floating-icon absolute bottom-20 right-2 md:bottom-28 md:right-10">
                <FloatingIcon icon={TimerIcon} />
              </div>
              <div className="floating-icon absolute bottom-8 left-10 md:bottom-12 md:left-16">
                <FloatingIcon icon={HeartIcon} />
              </div>
            </div>


            {/* Staggered Images */}
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Meal 1"
              className="split-image rounded-2xl w-36 h-36 md:w-64 md:h-64 object-cover shadow-xl"
            />
            <img
              src="https://i.pinimg.com/736x/7d/36/31/7d3631839cbfee43fdfa4d39ee2c5211.jpg"
              alt="Meal 2"
              className="split-image rounded-2xl w-36 h-36 md:w-64 md:h-64 object-cover shadow-xl"
            />
            <img
              src="https://i.pinimg.com/736x/c1/43/97/c143978f59376a1727fbc5c50836b598.jpg"
              alt="Meal 3"
              className="split-image rounded-2xl w-36 h-36 md:w-64 md:h-64 object-cover shadow-xl"
            />
            <img
              src="https://i.pinimg.com/736x/0d/7a/f5/0d7af5b457b0184234124aae8a40f56e.jpg"
              alt="Meal 4"
              className="split-image rounded-2xl w-36 h-36 md:w-64 md:h-64 object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-black shadow-lg"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}
      />
    </section>
  );
};

export default HeaderSection;
