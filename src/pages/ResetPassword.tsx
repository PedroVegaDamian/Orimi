import { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { emailRegex } from '@/utils/validationsRegex'
import { sendPasswordResetEmail } from 'firebase/auth'

export const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const navigate = useNavigate()

  function goTo(link: string) {
    navigate(link)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // VALIDATE EMAIL
    if (!emailRegex.test(email)) {
      setErrorEmail('Invalid email format or the email contains spaces')
      return
    }
    resetPassword(email)
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password reset email sent')
      console.log('Password reset email sent')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message) 
      }
    }
    goTo('/login')
  }

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          ></a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Forgot password?
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
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

                <div className="flex items-center"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
