import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB2Ij3LQvfdBxdBa0EU6eNR07CidYUHruU',
  authDomain: 'synesthetic-studio.firebaseapp.com',
  projectId: 'synesthetic-studio',
  storageBucket: 'synesthetic-studio.firebasestorage.app',
  messagingSenderId: '65135846995',
  appId: '1:65135846995:web:4570eb7913cd1fbf3d88a6',
  measurementId: 'G-FWYEVE2MRY',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
