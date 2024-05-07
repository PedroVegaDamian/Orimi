import { useState } from 'react'
import { signIn } from '@/services/login'
import { emailRegex, passwordRegex } from '@/utils/validationsRegex'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/firebase'

export const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorPassword('')
    setErrorEmail('')
    setError('')
    if (!email && !password) {
      setErrorEmail('* Required')
      setErrorPassword('* Required')
      return
    }
    if (!email) {
      setErrorEmail('* Required')
      return
    }
    if (!password) {
      setErrorPassword('* Required')
      return
    }
    // VALIDATE EMAIL
    if (!emailRegex.test(email)) {
      setErrorEmail('Invalid email format.')
      return
    }
    // VALIDATE PASSWORD
    if (!passwordRegex.test(password)) {
      setError('The password must have: at least 6 characters, one uppercase letter, one lowercase letter and one number.Please try again.')
      return
    }
    const result = await signIn(auth, email, password)
    if (result?.success) {
      navigate('/')
    } else {
      setError('Invalid email or password. Please try again.')
      console.error(result?.message)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorEmail,
    errorPassword,
    error,
    handleSubmit
  }
}