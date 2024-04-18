import { useState } from 'react'
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from '@/utils/validationsRegex'
import { messageErrorCode } from '@/utils/errorCodeMessages'
import { FirebaseError } from 'firebase/app'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function goTo(link: string) {
    navigate(link)
  }

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (auth.currentUser) {
        goTo('/')
      } else {
        console.log('User is not logged in')
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
          const message = 'Too many attempts, try again later.'
          setError(message)
          console.log(message)
        } else {
          const message = messageErrorCode(error.code, error.message)
          setError(message)
          console.error(message)
        }
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorPassword('')
    setErrorEmail('')
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
      setErrorPassword('Password incorrect')
      return
    }
    signIn()
  }

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900"></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    // type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <a className="text-red-600 text-sm font-medium">
                    {errorEmail ? <p>{errorEmail}</p> : null}
                  </a>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  <a className="text-red-600 text-sm font-medium">
                    {errorPassword ? <p>{errorPassword}</p> : null}
                  </a>
                </div>
                <div className="flex items-center"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <a className="text-red-600 text-sm font-medium">
                  {error ? <p>{error}</p> : null}
                </a>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 justify-center"
                  onClick={() => goTo('/reset-password')}
                >
                  Forgot password?
                </a>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => goTo('/register')}
                  >
                    Create account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
