// components/HeaderSection.jsx
"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ImageSlice from './imageslice';
import FloatingIcon from './floatingicon';
import Button from './Button';
import DraggableImages from './draggableimages';

import { UtensilsIcon, CakeIcon, BoxIcon, SaladIcon, Soup, ChefHatIcon, TimerIcon, HeartIcon } from 'lucide-react';

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

        // Animate the Split Images with more dynamic effects
        gsap.fromTo(
            '.split-image',
            { opacity: 0, x: 200, y: -200 },
            { opacity: 1, x: 0, y: 0, stagger: 0.3, duration: 1.5, ease: "power3.out" }
        );

        // Bounce Effect on Button
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
                    {/* Left Content */}
                    <div className="relative w-full md:w-1/2 z-10 mb-12 md:mb-0">
                        {/* Floating Background Icons */}
                        <div className="floating-icon absolute top-15 left-5">
                            <FloatingIcon icon={UtensilsIcon} />
                        </div>
                        <div className="floating-icon absolute top-20 left-20">
                            <FloatingIcon icon={CakeIcon} />
                        </div>
                        <div className="floating-icon absolute top-28 left-10">
                            <FloatingIcon icon={BoxIcon} />
                        </div>
                        <div className="floating-icon absolute top-40 left-40">
                            <FloatingIcon icon={SaladIcon} />
                        </div>
                        <div className="floating-icon absolute bottom-0 left-30">
                            <FloatingIcon icon={Soup} />
                        </div>
                        <div className="floating-icon absolute top-10 right-20">
                            <FloatingIcon icon={ChefHatIcon} />
                        </div>
                        <div className="floating-icon absolute bottom-40 left-20">
                            <FloatingIcon icon={TimerIcon} />
                        </div>
                        <div className="floating-icon absolute top-30 left-10">
                            <FloatingIcon icon={HeartIcon} />
                        </div>

                        {/* Main Heading */}
                        <div className="header-text">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Your weekly <br />
                                <span className="text-[#E89434]">meal plan,</span> <br />
                                simplified
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

                    {/* Right Content - Draggable Images */}
                    <DraggableImages />

                </div>
            </div>

            {/* Decorative bottom wave */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 bg-black shadow-lg"
                style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)',
                }}
            />
        </section>
    );
};

export default HeaderSection;
