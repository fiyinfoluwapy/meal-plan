// src/app/categories/[category]/[mealId]/page.js
import React from 'react'

const MealDetailsPage = async ({ params }) => {
  const { mealId } = params

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  )
  const data = await res.json()
  const meal = data.meals?.[0]

  if (!meal) {
    return <p className="text-center mt-12 text-[#5D5853]">Meal not found.</p>
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#5D5853] mb-8">
        {meal.strMeal}
      </h1>

      <div className="max-w-4xl mx-auto bg-[#F1E7A3] rounded-xl shadow-lg overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#5D5853]">Instructions</h2>
          <p className="text-[#5D5853] leading-relaxed whitespace-pre-line">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealDetailsPage
