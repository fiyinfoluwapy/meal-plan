'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CategoryPage = ({ params }) => {
  const { category } = params

  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        )
        const data = await res.json()
        setMeals(data.meals || [])
      } catch (err) {
        setError('Failed to fetch meals')
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [category])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-3xl font-bold text-[#5D5853] mb-8 capitalize text-center">
        {category} Dishes
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {meals.map((meal) => (
          <Link
            key={meal.idMeal}
            href={`/categories/${category}/${meal.idMeal}`}
            className="block bg-[#F1E7A3] rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#5D5853]">
                {meal.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
