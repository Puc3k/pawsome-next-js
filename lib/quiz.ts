export async function saveWinner (winnerUrl: string) {
  const res = await fetch('/api/winner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winnerUrl }),
  })
  return await res.json()
}

export async function fetchWinners () {
  const res = await fetch('/api/winner', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  return await res.json()
}

export function saveWinnerLocal (winnerUrl: string) {
  localStorage.setItem('winnerDogImage', winnerUrl)
}

export function getWinnerLocal () {
  return localStorage.getItem('winnerDogImage')
}

export function clearWinnerLocal () {
  localStorage.removeItem('winnerDogImage')
}