import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { messageErrorCode } from '@/utils/errorCodeMessages'

export const signIn = async ( email: string, password: string) => {

    await signInWithEmailAndPassword(auth, email, password)
   
  }

