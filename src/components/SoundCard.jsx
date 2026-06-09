import styles from './SoundCard.module.css'

export default function SoundCard({ sound, vibe }) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Sound Texture</span>
        <span className={styles.rowValue}>{sound}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.row}>
        <span className={styles.rowLabel}>Playlist Vibe</span>
        <span className={styles.rowValue}>{vibe}</span>
      </div>
    </div>
  )
}
