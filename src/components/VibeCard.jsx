import { useRef } from 'react'
import html2canvas from 'html2canvas'
import MoodEntity from './MoodEntity'
import styles from './VibeCard.module.css'

export default function VibeCard({ mood, resultType }) {
  const cardRef = useRef(null)

  async function handleDownload() {
    await document.fonts.ready
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#080810',
      scale: 2,
      useCORS: false,
      logging: false,
    })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `${resultType.toLowerCase()}-mood.png`
    a.click()
  }

  return (
    <div className={styles.wrap}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.entity}>
          <MoodEntity type={resultType} />
        </div>

        <p className={styles.moodLabel}>Your Mood World</p>
        <h2 className={styles.moodName}>{resultType}</h2>
        <p className={styles.desc}>{mood.desc}</p>

        <div className={styles.palette}>
          {mood.palette.map((hex, i) => (
            <div key={hex} className={styles.swatchGroup}>
              <div className={styles.swatch} style={{ background: hex }} />
              <span className={styles.swatchName}>{mood.paletteNames[i]}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.rowLabel}>Sound</span>
          <span className={styles.rowValue}>{mood.sound}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Vibe</span>
          <span className={styles.rowValue}>{mood.vibe}</span>
        </div>

        <p className={styles.brand}>Synesthetic Studio</p>
      </div>

      <button className={styles.downloadBtn} onClick={handleDownload}>
        Download Card
      </button>
    </div>
  )
}
