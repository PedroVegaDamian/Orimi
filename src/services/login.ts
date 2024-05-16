import { signInWithEmailAndPassword, Auth } from 'firebase/auth'

export const signIn = async (auth: Auth, email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user }
    } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
  }
}