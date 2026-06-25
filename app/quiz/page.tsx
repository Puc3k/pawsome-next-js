'use client'

import { useEffect, useState } from 'react'
import useDogImages from '@/hooks/useDogImages'
import { saveWinner } from '@/lib/quiz'
import QuizContent from '@/components/Quiz/QuizContent'
import { useTournamentStore } from '@/store/tournamentStore'
import { useToastStore } from '@/store/useToastStore'

export default function QuizPage () {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const showToast = useToastStore((state) => state.showToast)

  const {
    dogImages,
    isLoading,
    error,
    handleReset: resetDogImages,
    refetch: refetchDogImages,
  } = useDogImages()

  const {
    pool,
    round,
    currentWinner,
    handleChange,
    resetQuiz,
    initPool
  } = useTournamentStore()

  const quizState = { pool, round, currentWinner }

  useEffect(() => {
    if (dogImages && dogImages.length > 0) {
      initPool(dogImages)
    }
  }, [dogImages, initPool])

  useEffect(() => {
    if (pool.length === 1) {
      saveWinner(pool[0]).catch((err) => {
        showToast("Failed to save winner, try again")
        console.error(err)
      })

      localStorage.removeItem('quizImages')
    }
  }, [pool])

  function handleImageSelected (selected: string, challenger: string) {
    setSelectedImage(null)
    handleChange(selected, challenger)
  }

  function handleReset () {
    resetQuiz()
    resetDogImages()
    setSelectedImage(null)
    void refetchDogImages()
  }

  return <QuizContent
    selectedImage={ selectedImage }
    setSelectedImage={ setSelectedImage }
    quizState={ quizState }
    isLoading={ isLoading }
    error={ error }
    handleImageSelected={ handleImageSelected }
    handleReset={ handleReset }
    dogImages={ dogImages }
  />
}

