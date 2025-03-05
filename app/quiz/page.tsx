'use client'

import React, { useState } from 'react'
import useDogImages from '@/hooks/useDogImages'
import useQuizState from '@/hooks/useQuizState'
import DogImage from '@/components/DogImage'
import ProgressBar from '@/components/ProgressBar'
import WinnerDogImage from '@/components/WinnerDogImage'
import classes from './page.module.css'
import DogImageSkeleton from '@/components/DogImage/DogImageSkeleton'

export default function QuizPage () {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    dogImages,
    isLoading,
    error,
    handleReset: resetDogImages,
  } = useDogImages()

  const { quizState, handleChange, resetQuiz } = useQuizState(dogImages)

  const leftImage = quizState.pool[0]
  const rightImage = quizState.pool[1]

  const currentRound = quizState.round + 1
  const totalRounds = dogImages.length ? dogImages.length  : 10

  function handleImageSelected (selected: string, challenger: string) {
    setSelectedImage(null)
    handleChange(selected, challenger)
  }

  function handleReset () {
    resetQuiz()
    resetDogImages()
    setSelectedImage(null)
  }

  return (
    <section className="relative mx-auto pt-8 pb-16 overflow-hidden bg-gray-50">
      <div
        className={ `inset-0 opacity-3 pointer-events-none ${ classes.pawBackground }` }></div>
      <div className="relative z-10">
        { quizState.pool.length === 1 ? (
          <WinnerDogImage
            imageUrl={ quizState.pool[0] }
            onReset={ handleReset }
          />
        ) : (
          <>
            <div>
              <h1
                className="text-5xl text-center font-bold mb-4 mt-6 font-[Poppins] tracking-wide">
                Which dog image wins?
              </h1>
              <p className="text-center text-lg font-sans mb-6 tracking-wide">
                Choose your favorite!
              </p>
            </div>

            <ProgressBar current={ currentRound } total={ totalRounds }/>
          </>
        ) }

        { error &&
          <p className="text-center text-red-500">Error loading images.</p>
        }

        { isLoading ? (
          <>
            <div className="flex justify-center items-center gap-12">
              <DogImageSkeleton />
              <div className="hidden md:block relative z-20">
                <span className="text-3xl font-bold text-gray-700 font-mono">VS</span>
              </div>
              <DogImageSkeleton />
            </div>
          </>
        ) : (
          quizState.pool.length > 1 && (
            <>
              <div
                className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <DogImage
                  key={ leftImage }
                  imageUrl={ leftImage }
                  isSelected={ selectedImage === leftImage }
                  onClick={ () => setSelectedImage(leftImage) }
                  onAnimationComplete={ () => handleImageSelected(leftImage,
                    rightImage) }
                  alt="First dog image"
                />

                <div className="hidden md:block relative z-20">
                  <div
                    className="flex items-center justify-center w-20 h-20 bg-white bg-opacity-80 rounded-full shadow-md border-2 border-gray-300">
              <span
                className="text-3xl font-bold text-gray-700 font-mono">VS</span>
                  </div>
                </div>

                <DogImage
                  key={ rightImage }
                  imageUrl={ rightImage }
                  isSelected={ selectedImage === rightImage }
                  onClick={ () => setSelectedImage(rightImage) }
                  onAnimationComplete={ () => handleImageSelected(rightImage,
                    leftImage) }
                  alt="Second dog image"
                />
              </div>
              <button
                onClick={ resetQuiz }
                className="mt-6 mx-auto block px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full text-lg font-semibold shadow-md transition"
              >
                Reset
              </button>
            </> )
        )
        }
      </div>
    </section>
  )
}
