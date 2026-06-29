import { useCallback, useEffect, useState } from 'react'
import { useToastStore } from '@/store/useToastStore'
import { DogApiResponseSchema } from '@/lib/validations/quiz'

const API_BASE_URL = `https://dog.ceo/api/breeds/image/random`

const IMAGES_KEY = 'quizImages'
const TOTAL_IMAGES = 10

export default function useDogImages () {
  const [dogImages, setDogImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const showToast = useToastStore((state) => state.showToast)

  const fetchDogImages = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {

      const res = await fetch(API_BASE_URL + `/${ TOTAL_IMAGES }`)

      if (!res.ok) {
        const msg = 'Failed to fetch dog images from server.'
        setError(msg)
        showToast(msg, 'error')
        return
      }

      const rawData = await res.json()

      const validationResult = DogApiResponseSchema.safeParse(rawData)

      if (!validationResult.success) {
        const msg = 'Invalid data received from server'

        setError('msg')
        showToast(msg, 'error')

        return
      }

      const images = validationResult.data.message
      setDogImages(images)
      localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
    } catch (error: any) {
      const msg = error.message || 'Something went wrong while fetching.'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    const storedImages = localStorage.getItem(IMAGES_KEY)
    if (storedImages) {
      setDogImages(JSON.parse(storedImages))
    } else {
      void fetchDogImages()
    }
  }, [fetchDogImages])

  const handleReset = () => {
    setDogImages([])
    localStorage.removeItem(IMAGES_KEY)
  }

  return { dogImages, isLoading, error, handleReset, refetch: fetchDogImages }
}