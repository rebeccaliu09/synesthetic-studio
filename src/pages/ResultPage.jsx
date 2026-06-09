import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOODS } from '../data/moodData'
import MoodEntity from '../components/MoodEntity'
import PaletteDisplay from '../components/PaletteDisplay'
import SoundCard from '../components/SoundCard'
import SpotifySongs from '../components/SpotifySongs'
import SaveModal from '../components/SaveModal'
import SoundToggle from '../components/SoundToggle'
import { useAuth } from '../hooks/useAuth'
import styles from './ResultPage.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

export default function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resultType, scores } = location.state || {}
  const [tracks, setTracks] = useState([])
  const [showSaveModal, setShowSaveModal] = useState(false)
  const user = useAuth()

  function handleSaveClick() {
    if (user === null) {
      navigate('/auth', { state: { from: '/result', resultState: location.state } })
    } else {
      setShowSaveModal(true)
    }
  }

  if (!resultType || !MOODS[resultType]) {
    return (
      <div className={styles.error}>
        <p>No result found.</p>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    )
  }

  const mood = MOODS[resultType]

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <motion.div className={styles.entityWrap} {...fadeUp(0.05)}>
          <MoodEntity type={resultType} />
        </motion.div>

        <motion.p className={styles.label} {...fadeUp(0.15)}>
          Your Mood World
        </motion.p>

        <motion.h1 className={styles.name} {...fadeUp(0.25)}>
          {resultType}
        </motion.h1>

        <motion.p className={styles.desc} {...fadeUp(0.35)}>
          {mood.desc}
        </motion.p>

        <motion.div {...fadeUp(0.45)}>
          <PaletteDisplay palette={mood.palette} paletteNames={mood.paletteNames} />
        </motion.div>

        <motion.div className={styles.cardsRow} {...fadeUp(0.55)}>
          <SoundCard sound={mood.sound} vibe={mood.vibe} />
        </motion.div>

        <motion.div style={{ width: '100%' }} {...fadeUp(0.65)}>
          <SpotifySongs
            moodType={resultType}
            keywords={mood.spotifyKeywords}
            onTracksLoaded={setTracks}
          />
        </motion.div>

        <motion.div {...fadeUp(0.75)}>
          <button className={styles.saveBtn} onClick={handleSaveClick}>
            Save Mood World
          </button>
        </motion.div>

        <motion.div {...fadeUp(0.85)}>
          <button className={styles.retakeBtn} onClick={() => navigate('/quiz')}>
            Retake Test
          </button>
        </motion.div>
      </div>

      <SoundToggle moodType={resultType} />

      {showSaveModal && (
        <SaveModal
          resultType={resultType}
          scores={scores}
          moodData={mood}
          tracks={tracks}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  )
}
