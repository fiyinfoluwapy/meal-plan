"use client"

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import {
  Facebook,
  Instagram,
  Twitter,
  MailIcon,
  ChefHatIcon,
  HeartIcon,
  UtensilsIcon,
} from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  useEffect(() => {
    gsap.fromTo(
      '.footer-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      }
    )

    gsap.fromTo(
      '.newsletter-form',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        delay: 0.8,
        duration: 1,
        ease: 'power3.out',
      }
    )

    gsap.fromTo(
      '.footer-icon',
      { opacity: 0, y: -20, x: -20 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <footer className="relative bg-black text-white py-20 px-6 md:px-10 overflow-hidden mt-20">
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 footer-icon text-[#F1E7A3] opacity-30">
        <ChefHatIcon size={40} />
      </div>
      <div className="absolute bottom-16 right-20 footer-icon text-[#E89434] opacity-30">
        <UtensilsIcon size={40} />
      </div>
      <div className="absolute bottom-5 left-16 footer-icon text-[#A1B93C] opacity-30">
        <HeartIcon size={40} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 z-10 relative">
        {/* Column 1: Logo & Description */}
        <div className="footer-item">
          <h2 className="text-3xl font-bold text-[#E89434] mb-4">MealCart</h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-sm">
            Plan meals effortlessly. Shop smart. Eat better. MealCart makes cooking and eating easy, nutritious, and enjoyable.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-item">
          <h3 className="text-xl font-semibold mb-4 text-[#F1E7A3]">Navigate</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-[#A1B93C]">Home</Link></li>
            <li><Link href="/#categories" className="hover:text-[#A1B93C]">Meal Categories</Link></li>
            <li><Link href="/about" className="hover:text-[#A1B93C]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#A1B93C]">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Newsletter & Social */}
        <div className="footer-item">
          <h3 className="text-xl font-semibold mb-4 text-[#F1E7A3]">Stay Updated</h3>
          <form className="newsletter-form flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 ring-[#A1B93C]"
            />
            <button
              type="submit"
              className="bg-[#E89434] hover:bg-[#d07c1f] text-white py-2 px-4 rounded-md transition-all"
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-5 mt-6">
            <a href="#" aria-label="Facebook" className="hover:text-[#A1B93C]">
              <Facebook size={22} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#A1B93C]">
              <Instagram size={22} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#A1B93C]">
              <Twitter size={22} />
            </a>
            <a href="mailto:support@chowcart.com" className="hover:text-[#A1B93C]">
              <MailIcon size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-14 text-center text-xs text-white/40 footer-item relative z-10">
        © {new Date().getFullYear()} MealCart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
