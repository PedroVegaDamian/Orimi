import { useState } from 'react'
import { sendResetPasswordEmail } from '@/services/passwordReset'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await sendResetPasswordEmail(email)
    navigate('/send-reset-password-email')
  }

  return (
    <>
      <div className=" flex justify-center items-center w-full mt-10">
        <div className="p-4 w-full max-w-md h-full">
          <div className="p-4 text-center  bg-white_color rounded-lg shadow ">
            <h1 className="text-2xl font-medium text-center text-primary_800_color pb-6">
              Forgot your password?
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                id="email"
                className="border border-solid border-grey_color text-gray-900 rounded-lg focus:ring-red-500 focus:border-grey_800_color block w-full p-2.5"
                placeholder="name@company.com"
                onChange={e => setEmail(e.target.value)}
              ></input>
              <p className="text-sm pt-5">
                Enter your email address and we will send you a link to reset
                your password.
              </p>
              <div className="gap-3 mt-8">
                <button
                  type="submit"
                  className="w-30 bg-primary_color font-nunito text-base font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
