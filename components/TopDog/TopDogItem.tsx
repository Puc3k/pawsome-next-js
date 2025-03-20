'use client'
import { useState } from 'react'
import Image from 'next/image'
import TopDogImageSkeleton from '@/components/TopDog/TopDogImageSkeleton'

interface TopDogItemProps {
  image: { _id: string } | null
  index: number
}

const TopDogItem: React.FC<TopDogItemProps> = ({ image, index }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => setIsLoading(false)
  const handleError = () => setIsLoading(false)

  const itemData: {
    [key: number]: {
      imageStyle: string,
      textStyle: string,
      altText: string,
      titleText: string
    }
  } = {
    0: {
      imageStyle: 'w-80 h-80 border-yellow-500/50 shadow-xl',
      textStyle: 'text-xl font-bold text-yellow-600',
      altText: 'Top 1 Dog',
      titleText: '🏆 #1 Top Dog',
    },
    1: {
      imageStyle: 'w-60 h-60 border-slate-400/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 2 Dog',
      titleText: '#2 Runner Up',
    },
    2: {
      imageStyle: 'w-60 h-60 border-amber-600/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 3 Dog',
      titleText: '#3 Fan Favorite',
    },
  }

  const { imageStyle, textStyle, altText, titleText } = itemData[index]

  return (
    <div className="flex flex-col items-center relative">
        { isLoading && <TopDogImageSkeleton/> }
        <Image
          src={ image?._id || '' }
          alt={ altText }
          width="600"
          height="600"
          priority
          onLoad={ handleLoad }
          onError={ handleError }
          style={ { display: isLoading ? 'none' : 'block' } }
          className={`object-cover rounded-3xl overflow-hidden shadow-lg border-4 ${ imageStyle }`}
        />
      <p className={ `mt-4 text-lg font-mono ${ textStyle }` }>
        { titleText }
      </p>
    </div>
  )
}

export default TopDogItem