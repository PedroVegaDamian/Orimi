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
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
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
                  className="w-full text-white bg-purple-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <a className="text-red-600 text-sm font-medium">
                  {error ? <p>{error}</p> : null}
                </a>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 justify-center"
                  onClick={() => navigate('/reset-password')}
                >
                  Forgot password?
                </a>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate('/register')}
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
