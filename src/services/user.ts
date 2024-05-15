import { auth, db } from '@/firebase'
import { UserPrimaryData } from '@/models/user'
import { doc, getDoc } from 'firebase/firestore'
import { User, onAuthStateChanged } from 'firebase/auth'

export const getUserById = async (userId: string) => {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as UserPrimaryData
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}
