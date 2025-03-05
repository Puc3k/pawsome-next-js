export async function saveWinner (winnerUrl: string) {
  const res = await fetch('/api/winner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winnerUrl }),
  })
  return await res.json()
}