"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes" },
  { label: "Planner", path: "/planner" },
  { label: "Grocery List", path: "/grocery-list" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (path) =>
    `relative transition-colors font-medium ${
      pathname === path ? "text-orange-500" : "text-gray-700"
    } hover:text-orange-500 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:transition-all after:duration-300 ${
      pathname === path
        ? "after:bg-orange-500"
        : "after:bg-transparent hover:after:bg-orange-500"
    }`;

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold text-orange-500">
          MealCart
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={linkClasses(link.path)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Nav as Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute left-0 right-0 bg-white shadow-lg rounded-md mx-6 mt-2 py-4 z-40"
          >
            <div className="flex flex-col space-y-4 px-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={linkClasses(link.path)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
