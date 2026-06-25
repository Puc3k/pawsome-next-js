export interface QuizContentProps {
  isLoading: boolean
  error: any
  handleReset: () => void
  dogImages: string[]
}

export interface TopDogItemProps {
  image: { _id: string } | null
  index: number
}

export type ProgressBarProps = {
  current: number;
  total: number;
};

export type FloatingProps = {
  items: string[]
}

export type QuizState = {
  round: number,
  pool: string[],
  currentWinner: string | null
}