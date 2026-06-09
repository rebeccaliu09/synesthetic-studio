import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS } from '../data/moodData'
import QuizCard from '../components/QuizCard'
import styles from './QuizPage.module.css'

export default function QuizPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [direction, setDirection] = useState(1)

  function handleAnswer(type) {
    const newScores = { ...scores, [type]: (scores[type] || 0) + 1 }
    setScores(newScores)

    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    } else {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
      navigate('/result', { state: { resultType: winner, scores: newScores } })
    }
  }

  const progressPct = (currentIndex / QUESTIONS.length) * 100

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className={styles.page}>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
      <div className={styles.inner}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <QuizCard
              question={QUESTIONS[currentIndex]}
              onAnswer={handleAnswer}
              questionIndex={currentIndex}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
