import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/useLogin'

export const LoginPage = () => {
  const navigate = useNavigate()

  const {
    setEmail,
    setPassword,
    errorEmail,
    errorPassword,
    error,
    handleSubmit
  } = useLogin()

  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-md ">
            <div className="p-6 space-y-4 ">
              <h1 className="font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
                Sign in
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mt-10">
                  <label className="block font-nunito text-sm font-semibold leading-19 text-left text-black_color mb-2">
                    Your email
                  </label>
                  <input
                    name="email"
                    id="email"
                    className="border border-solid border-grey_color text-gray-900 rounded-lg focus:ring-red-500 focus:border-grey_800_color block w-full p-2.5"
                    placeholder="name@company.com"
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <a className="text-red_color text-sm font-medium">
                    {errorEmail ? <p>{errorEmail}</p> : null}
                  </a>
                </div>
                <div>
                  <label className="block font-nunito text-sm font-semibold leading-19 text-left text-black_color mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border border-solid border-grey_color text-gray-900 rounded-lg focus:ring-red-500 focus:border-grey_800_color block w-full p-2.5"
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  <a className="text-red_color text-sm font-medium">
                    {errorPassword ? <p>{errorPassword}</p> : null}
                  </a>
                  <div className="flex justify-center">
                    <a className="text-red_color text-sm font-medium pt-5">
                      {error ? <p>{error}</p> : null}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p">
                  <button
                    type="submit"
                    className="block w-32 bg-primary_color font-nunito text-md font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                  >
                    Submit
                  </button>
                  <a
                    className="block font-nunito text-base font-semibold leading-19 text-center text-primary_800_color justify-center pt-5 pb-10"
                    onClick={() => navigate('/reset-password')}
                  >
                    Forgot password?
                  </a>
                  <p className="font-nunito text-base font-normal leading-19 text-center">
                    Don’t have an account yet?{' '}
                    <a
                      className="font-nunito text-base font-semibold leading-19 text-center text-primary_800_color hover:underline dark:text-primary-500"
                      onClick={() => navigate('/register')}
                    >
                      Create account
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
