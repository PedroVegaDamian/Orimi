import { signInWithEmailAndPassword, Auth } from 'firebase/auth'

export const signIn = async (auth: Auth, email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      return { success: true }
    } else {
      return { success: false, message: 'User is not logged in' }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
  }
}

