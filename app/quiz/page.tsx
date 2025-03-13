'use client'

import React, { useEffect, useState } from 'react'
import useDogImages from '@/hooks/useDogImages'
import useQuizState from '@/hooks/useQuizState'
import { saveWinner } from '@/lib/quiz'
import QuizContent from '@/components/Quiz/QuizContent'

export default function QuizPage () {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    dogImages,
    isLoading,
    error,
    handleReset: resetDogImages,
    refetch: refetchDogImages,
  } = useDogImages()

  const { quizState, handleChange, resetQuiz, setWinner } = useQuizState(dogImages)

  useEffect(() => {
    if (quizState.pool.length === 1) {
      saveWinner(quizState.pool[0])

      localStorage.removeItem('quizState')
      localStorage.removeItem('quizImages')
    }
  }, [quizState.pool])

  function handleImageSelected (selected: string, challenger: string) {
    setSelectedImage(null)
    handleChange(selected, challenger)
  }

  function handleReset () {
    resetQuiz()
    resetDogImages()
    setSelectedImage(null)
    refetchDogImages()
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

