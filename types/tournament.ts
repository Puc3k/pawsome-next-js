export interface QuizContentProps {
  selectedImage: string | null
  setSelectedImage: (img: string | null) => void
  quizState: { round: number; pool: string[]; currentWinner: string | null }
  isLoading: boolean
  error: any
  handleImageSelected: (selected: string, challenger: string) => void
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