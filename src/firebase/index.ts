import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAKZ5RHRXseDPmifFGup2zMWit9_Hu7EGQ',
  authDomain: 'orimi-project.firebaseapp.com',
  projectId: 'orimi-project',
  storageBucket: 'orimi-project.appspot.com',
  messagingSenderId: '387946953520',
  appId: '1:387946953520:web:1f97f50c01c25167e366f5'
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore()
export const auth = getAuth()
