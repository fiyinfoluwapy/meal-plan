'use client'

import React, { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link' // Import Link from Next.js

gsap.registerPlugin(ScrollTrigger)

const MealCategoriesCarousel = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true) // Loading state
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  const progressBar = useRef(null)
  const sectionRef = useRef(null)

  // Fetch categories inside useEffect to ensure it only runs on the client-side
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        const data = await res.json()
        if (data?.categories) {
          const formatted = data.categories.map((cat) => ({
            name: cat.strCategory,
            image: cat.strCategoryThumb,
          }))
          setCategories(formatted)
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false) //  loading to false after fetching
      }
    }

    fetchCategories()
  }, []) // This ensures it only runs on the client

  // Animate progress bar
  useEffect(() => {
    if (!emblaApi || !progressBar.current) return

    const updateProgressBar = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      progressBar.current.style.transform = `scaleX(${progress})`
    }

    emblaApi.on('scroll', updateProgressBar)
    emblaApi.on('reInit', updateProgressBar)
    updateProgressBar()
  }, [emblaApi])

  // GSAP reveal animation
  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.category-card'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [categories])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5D5853] text-center mb-12">
          Explore Categories
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {loading ? (
              // Skeleton Loader (Placeholder for loading categories)
              <>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="category-card min-w-[200px] flex-shrink-0 bg-[#F1E7A3] rounded-2xl p-4 shadow-lg animate-pulse"
                  >
                    <div className="w-full h-32 rounded-xl bg-gray-200 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
                  </div>
                ))}
              </>
            ) : (
              // Render actual categories after loading
              categories.map((cat, index) => (
                <Link
                  key={index}
                  href={`/categories/${cat.name.toLowerCase()}`} // Link to the category page
                >
                  <div className="category-card min-w-[200px] flex-shrink-0 bg-[#F1E7A3] rounded-2xl p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-center text-lg font-semibold text-[#5D5853]">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            ref={progressBar}
            className="h-full bg-[#E89434] origin-left transition-transform"
            style={{ transform: 'scaleX(0)' }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default MealCategoriesCarousel
