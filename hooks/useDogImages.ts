import { useCallback, useEffect, useState } from 'react'

const API_BASE_URL = `https://api.thedogapi.com/v1/images/search`
const IMAGES_KEY = 'quizImages'
const TOTAL_IMAGES = 13

export default function useDogImages () {
  const [dogImages, setDogImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchDogImages = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(API_BASE_URL + `?limit=${ TOTAL_IMAGES }`)

      if (!res.ok) {
        setError('Failed to fetch dogImages')
      }

      const data = await res.json()

      if (data && data.errors) {
        setError('Failed to fetch dogImages')
      }

      const images = data.map((item: any) => item.url)
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