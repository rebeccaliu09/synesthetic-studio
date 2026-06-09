import styles from './PaletteDisplay.module.css'

export default function PaletteDisplay({ palette, paletteNames }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Color Palette</p>
      <div className={styles.swatches}>
        {palette.map((hex, i) => (
          <div key={hex} className={styles.swatch}>
            <div className={styles.circle} style={{ background: hex }} />
            <span className={styles.name}>{paletteNames[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
