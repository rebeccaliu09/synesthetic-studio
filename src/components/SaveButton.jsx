import { useState } from 'react'
import styles from './SaveButton.module.css'

export default function SaveButton({ resultType, scores }) {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (saved) return
    const existing = JSON.parse(localStorage.getItem('synesthetic_saves') || '[]')
    existing.push({ type: resultType, date: new Date().toISOString(), scores })
    localStorage.setItem('synesthetic_saves', JSON.stringify(existing))
    setSaved(true)
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={handleSave} disabled={saved}>
        {saved ? 'Saved ✓' : 'Save Mood World'}
      </button>
      {saved && <p className={styles.status}>Your mood world has been saved.</p>}
    </div>
  )
}
