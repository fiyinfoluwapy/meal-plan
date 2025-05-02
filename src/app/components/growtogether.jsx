"use client"
import React, { useEffect, useRef, useState } from 'react';
import NeomorphicBox from './neomorphismbox';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BrainIcon,
  LeafIcon,
  SparklesIcon,
  HeartPulseIcon,
  FlameIcon,
  GaugeIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colors = ['#E89434', '#A1B93C', '#5D5853'];

const GrowingTogetherSection = () => {
  const dividerRef = useRef(null);
  const headingRef = useRef(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false); // ✅ For hydration-safe updates

  const iconRefs = useRef([]);
  iconRefs.current = [];

  const addToRefs = (el) => {
    if (el && !iconRefs.current.includes(el)) {
      iconRefs.current.push(el);
    }
  };

  useEffect(() => {
    setHasMounted(true); // ✅ Ensures we're on the client before updating dynamic state

    gsap.fromTo(
      dividerRef.current,
      { height: '0%' },
      {
        height: '100%',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 5000);

    iconRefs.current.forEach((icon, index) => {
      gsap.fromTo(
        icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          delay: index * 0.15,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    return () => clearInterval(interval);
  }, []);

  const IconWrap = ({ Icon, color }) => (
    <div
      className={`p-3 rounded-xl`}
      style={{ backgroundColor: `${color}1A` }}
      ref={addToRefs}
    >
      <Icon className="h-6 w-6" style={{ color }} />
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-[#5D5853] text-center mb-16"
        >
          Growing Together
        </h2>
        <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-16">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            <NeomorphicBox delay={0.2}>
              <div className="flex items-start gap-4">
                <IconWrap Icon={BrainIcon} color="#E89434" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Smart Planning
                  </h3>
                  <p className="text-[#5D5853]/70">
                    AI-powered meal suggestions based on your preferences and dietary needs
                  </p>
                </div>
              </div>
            </NeomorphicBox>

            <NeomorphicBox delay={0.4}>
              <div className="flex items-start gap-4">
                <IconWrap Icon={LeafIcon} color="#A1B93C" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Sustainable Choices
                  </h3>
                  <p className="text-[#5D5853]/70">
                    Reduce food waste with smart portion planning and seasonal ingredients
                  </p>
                </div>
              </div>
            </NeomorphicBox>

            <NeomorphicBox delay={0.6}>
              <div className="flex items-start gap-4">
                <IconWrap Icon={SparklesIcon} color="#E89434" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Personalized Experience
                  </h3>
                  <p className="text-[#5D5853]/70">
                    Customized recommendations that adapt to your cooking style
                  </p>
                </div>
              </div>
            </NeomorphicBox>
          </div>

          {/* Divider */}
          <div className="relative flex-shrink-0 w-1 md:mx-8">
            <div
              ref={dividerRef}
              className="absolute inset-0 w-1 rounded-full"
              style={{
                backgroundColor: hasMounted ? colors[colorIndex] : colors[0], // ✅ hydration-safe
                transition: 'background-color 1s ease-in-out',
              }}
            />
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-8">
            <NeomorphicBox delay={0.3} side="right">
              <div className="flex items-start gap-4">
                <IconWrap Icon={HeartPulseIcon} color="#A1B93C" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Health Focused
                  </h3>
                  <p className="text-[#5D5853]/70">
                    Balance your nutrition with varied and wholesome meal options
                  </p>
                </div>
              </div>
            </NeomorphicBox>

            <NeomorphicBox delay={0.5} side="right">
              <div className="flex items-start gap-4">
                <IconWrap Icon={FlameIcon} color="#E89434" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Time Saving
                  </h3>
                  <p className="text-[#5D5853]/70">
                    Efficient meal prep with smart scheduling and quick recipes
                  </p>
                </div>
              </div>
            </NeomorphicBox>

            <NeomorphicBox delay={0.7} side="right">
              <div className="flex items-start gap-4">
                <IconWrap Icon={GaugeIcon} color="#A1B93C" />
                <div>
                  <h3 className="text-xl font-bold text-[#5D5853] mb-2">
                    Progress Tracking
                  </h3>
                  <p className="text-[#5D5853]/70">
                    Monitor your cooking journey and celebrate achievements
                  </p>
                </div>
              </div>
            </NeomorphicBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowingTogetherSection;

