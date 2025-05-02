// components/ServicesCarousel.jsx
"use client";

import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { UtensilsIcon, ChefHatIcon, TimerIcon, ShoppingCartIcon, SaladIcon, Soup } from "lucide-react";

const services = [
  {
    icon: <UtensilsIcon size={64} />, // responsive, large icons
    title: "Browse Recipes",
    desc: "Discover diverse meal ideas tailored to your preferences."
  },
  {
    icon: <ChefHatIcon size={64} />,
    title: "Select Your Meals",
    desc: "Pick meals that suit your weekly plan and lifestyle."
  },
  {
    icon: <TimerIcon size={64} />,
    title: "Set Time & Portions",
    desc: "Customize for portion size, days, and dietary needs."
  },
  {
    icon: <ShoppingCartIcon size={64} />,
    title: "Generate Grocery List",
    desc: "Get a complete grocery list from your selected meals."
  },
  {
    icon: <SaladIcon size={64} />,
    title: "Shop Smart",
    desc: "Shop efficiently with categorized, optimized lists."
  },
  {
    icon: <Soup size={64} />,
    title: "Enjoy & Repeat",
    desc: "Prepare meals with ease and enjoy your week."
  }
];

const ServicesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#5D5853]">How <span className="text-[#E89434]">MealCart</span> Works</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Our simple process makes meal planning and grocery shopping effortless.
        </p>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {services.map((service, index) => (
              <div
                className="embla__slide min-w-[250px] max-w-[300px] bg-[#F1E7A3] p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105"
                key={index}
              >
                <div className="text-[#E89434] mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#5D5853] mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
