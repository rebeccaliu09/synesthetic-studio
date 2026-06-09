import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate(state?.from || '/', { state: state?.resultState })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Synesthetic Studio</h1>
        <p className={styles.subtitle}>Sign in to save your mood worlds</p>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${mode === 'signin' ? styles.active : ''}`}
            onClick={() => setMode('signin')}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`${styles.toggleBtn} ${mode === 'signup' ? styles.active : ''}`}
            onClick={() => setMode('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? '...' : 'ENTER'}
          </button>
        </form>
      </div>
    </div>
  )
}
