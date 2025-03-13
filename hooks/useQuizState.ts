import { useEffect, useState } from 'react'

export type QuizState = {
  round: number,
  pool: string[],
  currentWinner: string | null
}

export default function useQuizState (initialPool: string[]) {
  const [state, setState] = useState<QuizState>(() => {
    return { round: 0, pool: initialPool, currentWinner: null }
  })

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (isLoaded) {
      const stored = localStorage.getItem('quizState')

      if (stored) {
        setState(JSON.parse(stored))
      }

      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (initialPool.length > 0 &&
      state.pool.length === 0) {
      setState({
        round: 0,
        pool: initialPool,
        currentWinner: null,
      })
    }
  }, [initialPool])

  useEffect(() => {
      localStorage.setItem('quizState', JSON.stringify(state))
  }, [state])

  const handleChange = (selected: string, challenger: string) => {
    setState(prevState => {
      const newPool = prevState.pool.filter(img => img !== challenger)

      return {
        pool: newPool,
        currentWinner: selected,
        round: prevState.round + 1,
      }
    })
  }

  const resetQuiz = () => {
    localStorage.removeItem('quizState')
    setState({ pool: [], currentWinner: null, round: 0 })
  }

  const setWinner = (winner: string) => {
    setState({ pool: [winner], currentWinner: null, round: 0 })
    localStorage.setItem('quizState', JSON.stringify(state))
  }

  return { quizState: state, handleChange, resetQuiz, setWinner }
}