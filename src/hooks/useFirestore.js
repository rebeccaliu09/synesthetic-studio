import { db } from '../firebase'
import { collection, addDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore'

export async function saveMoodWorld({ resultType, scores, userName, tracks, userId }) {
  const docRef = await addDoc(collection(db, 'moodWorlds'), {
    resultType,
    scores,
    userName: userName || 'Anonymous',
    tracks: tracks || [],
    userId: userId || null,
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export async function getRecentMoodWorlds(userId, limitCount = 10) {
  const constraints = [orderBy('createdAt', 'desc'), limit(limitCount)]
  if (userId) constraints.unshift(where('userId', '==', userId))
  const q = query(collection(db, 'moodWorlds'), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
