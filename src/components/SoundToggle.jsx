import useAmbientSound from '../hooks/useAmbientSound'
import styles from './SoundToggle.module.css'

export default function SoundToggle({ moodType }) {
  const { isPlaying, toggle, isSupported } = useAmbientSound(moodType)

  if (!isSupported) return null

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.btn} ${isPlaying ? styles.playing : ''}`}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <rect x="2" y="1" width="3.5" height="12" />
            <rect x="8.5" y="1" width="3.5" height="12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <polygon points="2,1 13,7 2,13" />
          </svg>
        )}
      </button>
      <span className={styles.label}>ambient</span>
    </div>
  )
}
