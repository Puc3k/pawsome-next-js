import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QuizState } from '@/types/tournament'

interface QuizStore extends QuizState {
  initPool: (initialPool: string[]) => void;
  handleChange: (selected: string, challenger: string) => void;
  resetQuiz: () => void;
  setWinner: (winner: string) => void
}

export const useTournamentStore = create<QuizStore>()(
  persist(
    (set) => ( {
      round: 0,
      pool: [],
      currentWinner: null,

      initPool: (initialPool) => set((state) => {
        if (initialPool.length > 0 && state.pool.length === 0) {
          return { pool: initialPool, round: 0, currentWinner: null }
        }
        return state
      }),

      handleChange: (selected: string, challenger: string) => set(state => ( {
        pool: state.pool.filter(img => img !== challenger),
        currentWinner: selected,
        round: state.round + 1,
      } )),

      resetQuiz: () => set({ pool: [], currentWinner: null, round: 0 }),

      setWinner: (winner) => set({ pool: [winner], currentWinner: null, round: 0 }),
    } ),
    {
      name: 'quiz-storage'
    }
  )
)