'use client'
import { useState } from 'react'
import Image from 'next/image'
import TopDogImageSkeleton from '@/components/TopDog/TopDogImageSkeleton'
import { TopDogItemProps } from '@/types/tournament'
import logoImg from '@/assets/logo.webp'

const TopDogItem = ({ image, index }: TopDogItemProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleLoad = () => setIsLoading(false)
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const itemData: {
    [key: number]: {
      imageStyle: string,
      textStyle: string,
      altText: string,
      titleText: string,
      order: string,
      sizes: string,
    }
  } = {
    0: {
      imageStyle: 'w-full md:w-80 md:h-80 border-yellow-500/50 shadow-xl',
      textStyle: 'text-xl font-bold text-yellow-600',
      altText: 'Top 1 Dog',
      titleText: '🏆 #1 Top Dog',
      order: 'order-1 md:order-[inherit]',
      sizes: '(max-width: 768px) 100vw, 240px'
    },
    1: {
      imageStyle: 'w-full md:w-60 md:h-60 border-slate-400/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 2 Dog',
      titleText: '#2 Runner Up',
      order: 'order-2 md:order-[inherit]',
      sizes: '(max-width: 768px) 100vw, 240px'
    },
    2: {
      imageStyle: 'w-full md:w-60 md:h-60 order:3 md:order-[inherit] border-amber-600/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 3 Dog',
      titleText: '#3 Fan Favorite',
      order: 'order-3 md:order-[inherit]',
      sizes: '(max-width: 768px) 100vw, 240px'
    },
  }

  const { imageStyle, textStyle, altText, titleText, order, sizes } = itemData[index]

  const imgSrc = hasError ? logoImg : image?._id || logoImg
  return (
    <div className={`flex flex-col items-center relative w-full md:w-[inherit] px-6 md:p-0 ${ order }`}>
        { isLoading && <TopDogImageSkeleton/> }
        <Image
          priority
          src={ imgSrc}
          alt={ altText }
          width="600"
          height="600"
          sizes={ sizes }
          onLoad={ handleLoad }
          onError={ handleError }
          style={ {
            display: isLoading ? 'none' : 'block',
            opacity: hasError ? 0.3 : 1
          } }
          className={`object-cover rounded-3xl overflow-hidden shadow-lg border-4 ${ imageStyle }`}
        />
      <p className={ `mt-4 text-lg font-mono ${ textStyle }` }>
        { titleText }
      </p>
    </div>
  )
}

export default TopDogItem