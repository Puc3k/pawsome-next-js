import { useCallback, useEffect, useState } from 'react'

const API_BASE_URL = `https://dog.ceo/api/breeds/image/random`

const IMAGES_KEY = 'quizImages'
const TOTAL_IMAGES = 10

export default function useDogImages () {
  const [dogImages, setDogImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchDogImages = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {

      const res = await fetch(API_BASE_URL + `/${ TOTAL_IMAGES }`)

      if (!res.ok) {
        setError('Failed to fetch dogImages')
      }

      const data = await res.json()

      if (data && data.errors) {
        setError('Failed to fetch dogImages')
      }
      const images = data['message']
      setDogImages(images)
      localStorage.setItem(IMAGES_KEY, JSON.stringify(images))
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const storedImages = localStorage.getItem(IMAGES_KEY)
    if (storedImages) {
      setDogImages(JSON.parse(storedImages))
    } else {
      fetchDogImages()
    }
  }, [fetchDogImages])

  const handleReset = () => {
    setDogImages([])
    localStorage.removeItem(IMAGES_KEY)
  }

  return { dogImages, isLoading, error, handleReset, refetch: fetchDogImages }
}