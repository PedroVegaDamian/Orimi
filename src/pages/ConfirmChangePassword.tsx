import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth'
import { useState } from 'react'

const ConfirmChangePasswordPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const mode = searchParams.get('mode')
  const actionCode = searchParams.get('oobCode')
  const auth = getAuth()
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'resetPassword' && actionCode) {
      try {
        await verifyPasswordResetCode(auth, actionCode)
        await confirmPasswordReset(auth, actionCode, newPassword)
        alert('Password has been reset successfully.')
        navigate('/login')
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error resetting password:', error.message)
        } else {
          console.error('An unexpected error occurred')
        }
      }
    }
  }

  return (
    <>
      <div className=" flex justify-center items-center w-full mt-10">
        <div className="p-4 w-full max-w-md h-full">
          <div className="p-4 text-center  bg-white_color rounded-lg shadow ">
            <h1 className="text-2xl font-medium text-center text-primary_800_color pb-6">
              Reset password
            </h1>
            <form onSubmit={handleClick}>
              <input
                name="New password"
                className="border border-solid border-grey_color text-gray-900 rounded-lg focus:ring-red-500 focus:border-grey_800_color block w-full p-2.5"
                placeholder="*********"
                type="password"
                onChange={e => setNewPassword(e.target.value)}
              ></input>
              <p className="text-sm pt-5">
                The password must have: at least 6 characters, one uppercase
                letter, one lowercase letter and one number.
              </p>
              <div className="gap-3 mt-8">
                <button
                  type="submit"
                  className="w-30 bg-primary_color font-nunito text-base font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ConfirmChangePasswordPage
