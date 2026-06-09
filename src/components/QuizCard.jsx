import { useState } from 'react'
import styles from './QuizCard.module.css'

export default function QuizCard({ question, onAnswer, questionIndex }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(option) {
    if (selected) return
    setSelected(option.letter)
    setTimeout(() => {
      onAnswer(option.type)
      setSelected(null)
    }, 350)
  }

  return (
    <div className={styles.card}>
      <p className={styles.counter}>
        Question {questionIndex + 1} of 8
      </p>
      <h2 className={styles.question}>{question.question}</h2>
      <ul className={styles.options}>
        {question.options.map((opt) => (
          <li key={opt.letter}>
            <button
              className={`${styles.option} ${selected === opt.letter ? styles.selected : ''}`}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
            >
              <span className={styles.letter}>{opt.letter}</span>
              <span className={styles.label}>{opt.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
