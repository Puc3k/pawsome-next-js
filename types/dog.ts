import { StaticImageData } from 'next/image'

export interface WinnerDogImageProps {
  imageUrl: string,
  onReset: () => void
}

export interface DogImageProps {
  imageUrl: string | StaticImageData,
  alt: string,
  isSelected: boolean,
  onClick: () => void,
  onAnimationComplete?: () => void,
}