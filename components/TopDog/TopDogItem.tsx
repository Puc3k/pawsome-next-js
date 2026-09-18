'use client'
import { useState } from 'react'
import Image from 'next/image'
import TopDogImageSkeleton from '@/components/TopDog/TopDogImageSkeleton'
import { TopDogItemProps } from '@/types/tournament'
import logoImg from '@/assets/logo.webp'

const TopDogItem = ({ image, index }: TopDogItemProps) => {
  const [isLoading, setIsLoading] = useState(!!image?._id)
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
      sizes: '(min-width: 768px) 320px, 360px'
    },
    1: {
      imageStyle: 'w-full md:w-60 md:h-60 border-slate-400/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 2 Dog',
      titleText: '#2 Runner Up',
      order: 'order-2 md:order-[inherit]',
      sizes: '(min-width: 768px) 240px, 360px'
    },
    2: {
      imageStyle: 'w-full md:w-60 md:h-60 order:3 md:order-[inherit] border-amber-600/50 shadow-lg',
      textStyle: 'font-semibold',
      altText: 'Top 3 Dog',
      titleText: '#3 Fan Favorite',
      order: 'order-3 md:order-[inherit]',
      sizes: '(min-width: 768px) 240px, 360px'
    },
  }

  const { imageStyle, textStyle, altText, titleText, order, sizes } = itemData[index]

  const imgSrc = hasError || !image?._id ? logoImg : image._id

  const visibilityClass = isLoading
      ? 'opacity-0 scale-95'
      : hasError || !image?._id
          ? 'opacity-30'
          : 'opacity-100 scale-100'

  return (
      <div className={`flex flex-col items-center relative w-full md:w-[inherit] px-6 md:p-0 ${order}`}>
        <div className={`relative ${itemData[index].imageStyle.split(' ').filter(c => c.startsWith('w-') || c.startsWith('h-')).join(' ')} flex justify-center items-center`}>
          {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <TopDogImageSkeleton />
              </div>
          )}
          <Image
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              src={imgSrc}
              alt={altText}
              width={360}
              height={360}
              quality={60}
              sizes={sizes}
              onLoad={handleLoad}
              onError={handleError}
              className={`object-cover rounded-3xl overflow-hidden shadow-lg border-4 transition-all duration-300 ease-in-out ${imageStyle} ${visibilityClass}`}
          />
        </div>

      <p className={ `mt-4 text-lg font-mono ${ textStyle }` }>
        { titleText }
      </p>
    </div>
  )
}

export default TopDogItem