import { useState, useEffect } from 'react'
import styles from './SpotifySongs.module.css'

export default function MusicRecommendations({ moodType, keywords, onTracksLoaded }) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!keywords) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    async function fetchTracks() {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-opus-4-5',
            max_tokens: 500,
            messages: [
              {
                role: 'user',
                content: `You are a music curator. For the mood type "${moodType}" with vibe keywords "${keywords}", recommend exactly 5 real songs. Return ONLY a raw JSON array, no markdown, no explanation:\n[{"name":"Song Title","artist":"Artist Name"}]`,
              },
            ],
          }),
        })

        const data = await response.json()
        const text = data.content[0].text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(text)

        const result = parsed.map((t) => ({
          id: `${t.name}-${t.artist}`,
          name: t.name,
          artist: t.artist,
          url: `https://music.apple.com/search?term=${encodeURIComponent(t.name + ' ' + t.artist)}`,
          art: null,
        }))

        setTracks(result)
        onTracksLoaded?.(result)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTracks()
  }, [keywords])

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Suggested Tracks · Apple Music</p>
      {loading && <p className={styles.searching}>Searching for songs...</p>}
      {!loading && error && <p className={styles.err}>Unable to load recommendations.</p>}
      {!loading && !error && tracks.length > 0 && (
        <ul className={styles.list}>
          {tracks.map((track) => (
            <li key={track.id}>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <div className={styles.trackInfo}>
                  <span className={styles.trackName}>{track.name}</span>
                  <span className={styles.artist}>{track.artist}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
