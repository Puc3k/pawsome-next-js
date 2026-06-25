'use client'

import { useState } from 'react'
import { useTournamentStore } from '@/store/tournamentStore'

import DogImage from '@/components/DogImage/DogImage'
import ProgressBar from '@/components/Utils/ProgressBar'
import WinnerDogImage from '@/components/DogImage/WinnerDogImage'
import DogImageSkeleton from '@/components/DogImage/DogImageSkeleton'

import { QuizContentProps } from '@/types/tournament'
import classes from './quiz.module.css'

const renderQuizHeader = () => (
  <div>
    <h1
      className="text-xl mt-2 md:text-5xl text-center font-bold mb-4 md:mt-6 font-[Poppins] tracking-wide">
      Which dog image wins?
    </h1>
    <p className="text-center text-lg font-sans mb-6 tracking-wide">
      Choose your favorite!
    </p>
  </div>
)

const QuizContent = ({
  isLoading,
  error,
  handleReset,
  dogImages,
}: QuizContentProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { pool, round, handleChange } = useTournamentStore()

  const currentRound = round + 1
  const totalRounds = dogImages?.length || 10

  const leftImage = pool[0]
  const rightImage = pool[1]

  function handleImageSelected (selected: string, challenger: string) {
    setSelectedImage(null)
    handleChange(selected, challenger)
  }

  return (
    <section className="relative  pt-8 pb-16 px-4 md:px-0 overflow-hidden bg-gray-50 min-h-screen">
      <div
        className={ `inset-0 opacity-3 pointer-events-none ${ classes.pawBackground }` }></div>
      <div className="relative z-10">
        { isLoading && (
          <>
            { renderQuizHeader() }
            <p className="text-center mb-6">Loading images...</p>
            <div className="flex justify-center flex-col md:flex-row items-center gap-12">
              <DogImageSkeleton/>
              <div className="hidden md:block relative z-20">
                <span
                  className="text-3xl font-bold text-gray-700 font-mono">VS</span>
              </div>
              <DogImageSkeleton/>
            </div>
          </>
        ) }

        { error && (
          <>
            { renderQuizHeader() }
            <p className="text-center text-red-500">Error loading images.</p>
          </>
        ) }

        { pool.length === 1 && !isLoading && (
          <WinnerDogImage imageUrl={ pool[0] }
                          onReset={ handleReset }/>
        ) }

        { pool.length > 1 && !isLoading && !error && (
          <>
            { renderQuizHeader() }
            <ProgressBar current={ currentRound } total={ totalRounds }/>
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
              <div className="block relative z-20">
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
          </>
        ) }
      </div>
    </section>
  )
}

export default QuizContent