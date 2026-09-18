'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import useDogImages from '@/hooks/useDogImages'
import { saveWinner } from '@/lib/quiz'
import { useTournamentStore } from '@/store/tournamentStore'
import { useToastStore } from '@/store/useToastStore'

const QuizContent = dynamic(() => import('@/components/Quiz/QuizContent'))

export default function QuizPage () {
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
    resetQuiz,
    initPool
  } = useTournamentStore()

  useEffect(() => {
    if (dogImages && dogImages.length > 0) {
      initPool(dogImages)
    }
  }, [dogImages, initPool])

  useEffect(() => {
    if (pool.length === 1) {
      saveWinner(pool[0]).catch((err) => {
        showToast('Failed to save winner, try again')
        console.error(err)
      })

      localStorage.removeItem('quizImages')
    }
  }, [pool])

  function handleReset () {
    resetQuiz()
    resetDogImages()
    void refetchDogImages()
  }

  return <QuizContent
    isLoading={ isLoading }
    error={ error }
    handleReset={ handleReset }
    dogImages={ dogImages }
  />
}

