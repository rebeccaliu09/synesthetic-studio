import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../hooks/useAuth'
import styles from './IntroPage.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function IntroPage() {
  const navigate = useNavigate()
  const user = useAuth()

  return (
    <div className={styles.page}>
      <div className={styles.authCorner}>
        {user === null && (
          <Link to="/auth" className={styles.signInLink}>Sign In</Link>
        )}
        {user && (
          <>
            <span className={styles.userEmail}>{user.email}</span>
            <button className={styles.signOutBtn} onClick={() => signOut(auth)}>
              Sign Out
            </button>
          </>
        )}
      </div>

      <div className={styles.inner}>
        <motion.p className={styles.subtitle} {...fadeUp(0.1)}>
          Aesthetic Mood Test
        </motion.p>
        <motion.h1 className={styles.title} {...fadeUp(0.25)}>
          Synesthetic Studio
        </motion.h1>
        <motion.p className={styles.description} {...fadeUp(0.45)}>
          Answer eight questions about texture, light, sound, and space.
          <br />
          Discover your personal mood world.
        </motion.p>
        <motion.div {...fadeUp(0.65)}>
          <button className={styles.btn} onClick={() => navigate('/quiz')}>
            Begin the Test
          </button>
        </motion.div>
      </div>
    </div>
  )
}
