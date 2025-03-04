'use client'

import React, { useState } from 'react'
import DogImage from '@/components/DogImage'
import useDogImages from '@/hooks/useDogImages'
import useQuizState from '@/hooks/useQuizState'

export default function QuizPage () {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    dogImages,
    isLoading,
    error,
    handleReset: resetDogImages,
  } = useDogImages()
  console.log(dogImages)
  const { quizState, handleChange, resetQuiz } = useQuizState(dogImages)

  const leftImage = quizState.pool[0]
  const rightImage = quizState.pool[1]

  const currentRound = quizState.round + 1

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
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={ {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='50' font-size='50'%3E🐾%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        } }
      ></div>

      <div className="relative z-10">
        <div>
          <h1
            className="text-5xl text-center font-bold mb-4 mt-6 font-[Poppins] tracking-wide">
            Which dog image wins?
          </h1>
          <p className="text-center text-lg font-sans mb-6 tracking-wide">
            Choose your favorite!
          </p>
        </div>
        <div className="w-full mx-auto mb-6 flex flex-col items-center">
          <div
            className="relative mx-auto mb-4 w-full max-w-md bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={ { width: '30%' } }
            ></div>
            <span className="absolute -right-4 -top-3 text-3xl"
                  style={ {
                    animationDuration: '5s',
                  } }>🥺</span>
          </div>
          <p
            className="text-center text-md text-gray-500">Question { currentRound } of
            10</p>
        </div>
        { error &&
          <p className="text-center text-red-500">Error loading images.</p>
        }
        { isLoading ? (
          <>
            <p className="text-center">Loading images...</p>
            <div role="status">
              <svg aria-hidden="true"
                   className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                   viewBox="0 0 100 101" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
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


        { quizState.pool.length === 1 && (
          <div className="flex flex-col items-center justify-center mt-12">
            <h1
              className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>Winner!</span>
              <span className="text-yellow-500">🏆</span>
            </h1>
            <DogImage
              key={ quizState.pool[0] }
              imageUrl={ quizState.pool[0] }
              isSelected={ false }
              onClick={ () => {} }
              alt="Winner dog image"
            />
            <button
              onClick={ handleReset }
              className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-semibold rounded-full shadow-md transition"
            >
              Reset
            </button>
          </div>
        ) }
      </div>
    </section>
  )
}
