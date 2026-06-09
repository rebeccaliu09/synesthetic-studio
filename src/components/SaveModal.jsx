import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import MoodEntityStatic from './MoodEntityStatic'
import { saveMoodWorld } from '../hooks/useFirestore'
import { useAuth } from '../hooks/useAuth'
import styles from './SaveModal.module.css'

export default function SaveModal({ resultType, scores, moodData, tracks, onClose }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState(null) // null | 'saving' | 'saved' | 'local'
  const cardRef = useRef(null)
  const user = useAuth()

  async function handleDownload() {
    setStatus('saving')

    // Save to Firestore, fall back to localStorage on failure
    try {
      await saveMoodWorld({ resultType, scores, userName: name.trim(), tracks, userId: user?.uid })
      setStatus('saved')
    } catch {
      const existing = JSON.parse(localStorage.getItem('synesthetic_saves') || '[]')
      existing.push({ type: resultType, date: new Date().toISOString(), scores })
      localStorage.setItem('synesthetic_saves', JSON.stringify(existing))
      setStatus('local')
    }

    // Generate and download the PNG
    await document.fonts.ready
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#080810',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      logging: false,
    })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `synesthetic-${resultType.toLowerCase()}-${name.trim() || 'mood'}.png`
    a.click()
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Your Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div ref={cardRef} className={styles.card}>
          <p className={styles.cardBrand}>Synesthetic Studio</p>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
            <MoodEntityStatic type={resultType} />
          </div>

          <h2 className={styles.cardName}>{resultType}</h2>
          <p className={styles.cardDesc}>{moodData.desc}</p>

          <div className={styles.cardPalette}>
            {moodData.palette.map((hex, i) => (
              <div key={hex} className={styles.swatchGroup}>
                <div className={styles.swatch} style={{ background: hex }} />
                <span className={styles.swatchName}>{moodData.paletteNames[i]}</span>
              </div>
            ))}
          </div>

          <div className={styles.cardDivider} />

          {tracks.length > 0 && (
            <>
              <p className={styles.tracksLabel}>Suggested Tracks</p>
              <div className={styles.tracksList}>
                {tracks.slice(0, 5).map((track, i) => (
                  <div key={track.id} className={styles.trackRow}>
                    <span className={styles.trackNum}>{i + 1}</span>
                    <span className={styles.trackName}>{track.name}</span>
                    <span className={styles.trackArtist}>{track.artist}</span>
                  </div>
                ))}
              </div>
              <div className={styles.cardDivider} />
            </>
          )}

          {name.trim() && (
            <p className={styles.cardSignature}>— {name.trim()}'s Mood World</p>
          )}
        </div>

        <button
          className={styles.downloadBtn}
          onClick={handleDownload}
          disabled={status === 'saving'}
        >
          {status === 'saving' ? 'Saving...' : 'Download Card'}
        </button>

        {status === 'saved' && (
          <p className={styles.statusMsg}>Saved to your mood world ✓</p>
        )}
        {status === 'local' && (
          <p className={styles.statusMsg}>Saved locally</p>
        )}
      </div>
    </div>
  )
}
