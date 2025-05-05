'use client'

import React, { useState, useEffect } from 'react'
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    CheckCircleIcon,
} from 'lucide-react'

export function MealQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [mealSuggestions, setMealSuggestions] = useState([])

    const questions = [
        {
            id: 1,
            question: 'What dietary preference do you have?',
            options: ['Vegetarian', 'Vegan', 'Pescatarian', 'No restrictions'],
        },
        {
            id: 2,
            question: 'Which cuisine do you prefer?',
            options: ['Italian', 'Asian', 'Mexican', 'Mediterranean'],
        },
        {
            id: 3,
            question: "What's your preferred meal time?",
            options: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        },
        {
            id: 4,
            question: 'How much time do you have for preparation?',
            options: ['Quick (15 min)', 'Medium (30 min)', 'I have time (60+ min)'],
        },
    ]

    const handleAnswer = (answer) => {
        setAnswers({
            ...answers,
            [currentQuestion]: answer,
        })
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setShowResults(true)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const resetQuiz = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
        setMealSuggestions([])
    }

    const fetchMealSuggestions = async () => {
        const diet = answers[1] // Diet preference answer
        const cuisine = answers[2] // Cuisine preference answer

        if (!diet || !cuisine) return

        const dietQuery = diet === 'Vegan' ? 'vegan' : diet.toLowerCase()
        const cuisineQuery = cuisine.toLowerCase()

        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cuisineQuery}&a=${dietQuery}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            console.log('API response:', data) // Log the API response

            if (data.meals) {
                setMealSuggestions(data.meals.slice(0, 3)) // Show 3 meals only
            } else {
                setMealSuggestions([]) // No meals found
            }
        } catch (error) {
            console.error('Error fetching meal suggestions:', error)
            setMealSuggestions([]) // Set empty array if there's an error
        }
    }


    useEffect(() => {
        if (showResults) {
            fetchMealSuggestions()
        }
    }, [showResults, answers])

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

    return (
        <div className="flex justify-center items-center min-h-screen px-4 bg-[#F1E7A3]">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 bg-[#5D5853] text-white">
                    <h2 className="text-2xl font-bold text-center">Meal Preference Quiz</h2>
                    <p className="text-center mt-2 text-[#F1E7A3]">
                        {showResults
                            ? 'Your Results'
                            : 'Find your perfect meal recommendation'}
                    </p>
                </div>

                {!showResults ? (
                    <div className="p-6">
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                            <div
                                className="bg-[#E89434] h-2.5 rounded-full"
                                style={{
                                    width: `${progressPercentage}%`,
                                }}
                            ></div>
                        </div>

                        {/* Question */}
                        <h3 className="text-xl font-semibold text-[#5D5853] mb-4">
                            {questions[currentQuestion].question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full p-4 text-left rounded-lg transition-all ${answers[currentQuestion] === option
                                            ? 'bg-[#E89434] text-white'
                                            : 'bg-[#F1E7A3] text-[#5D5853] hover:bg-[#E89434] hover:text-white'
                                        }`}
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className={`flex items-center px-4 py-2 rounded ${currentQuestion === 0
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#5D5853] text-white hover:bg-opacity-90'
                                    }`}
                            >
                                <ChevronLeftIcon size={16} className="mr-1" />
                                Previous
                            </button>

                            <div className="text-[#5D5853] font-medium">
                                Question {currentQuestion + 1} of {questions.length}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="flex items-center justify-center mb-6">
                            <CheckCircleIcon size={48} className="text-[#A1B93C]" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-[#5D5853] mb-2">
                            Based on your preferences
                        </h3>

                        <div className="bg-[#F1E7A3] p-4 rounded-lg mb-6">
                            <p className="font-medium text-[#5D5853]">You selected:</p>
                            <ul className="mt-2 space-y-1 text-[#5D5853]">
                                <li>• Dietary preference: {answers[0]}</li>
                                <li>• Cuisine: {answers[1]}</li>
                                <li>• Meal time: {answers[2]}</li>
                                <li>• Preparation time: {answers[3]}</li>
                            </ul>
                        </div>

                        <h4 className="font-semibold text-lg text-[#5D5853] mb-3">
                            Here are your meal suggestions:
                        </h4>

                        <div className="space-y-3 mb-6">
                            {mealSuggestions.length > 0 ? (
                                mealSuggestions.map((meal, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border-2 border-[#A1B93C] rounded-lg p-4 shadow-sm"
                                    >
                                        <p className="font-medium text-[#5D5853]">{meal.strMeal}</p>
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="w-full rounded-lg mt-2"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#5D5853]">No meal suggestions found.</p>
                            )}
                        </div>

                        <button
                            onClick={resetQuiz}
                            className="w-full py-3 bg-[#E89434] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
                        >
                            Take Quiz Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
