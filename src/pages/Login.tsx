import { useState } from 'react'
import { signInWithEmailAndPassword, AuthErrorCodes} from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  // const bears = useStore(state => state.bears)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } 
    catch (error:Error) {
        console.log("error.code " + error.code);
        const errorCode = error.code.replace('auth/', '');
    setError(errorCode);
        // switch (error.code) {
        //   case AuthErrorCodes.INVALID_EMAIL:
        //     setError('User not found');
        //   //   break;
        //   // case AuthErrorCodes.in:
        //     setError('Incorrect password');
        //     break;
        //   default:
        //     setError('An error occurred');
        //     break;
        // }
    }
    }
  function goTo(link: string) {
    navigate(link)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
    signIn()
    if (auth.currentUser) {
      console.log('this is error '+ errorCode);
      goTo('/');
    } else {
      console.log('User is not logged in');
    }
   
  }


  

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <a className="text-red-600 text-sm font-medium">
                 {error ? <p className="login-error">{error}</p> : null}
                  </a>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  {error ? <p className="login-error">{error}</p> : null}
                  {/* <a className="text-red-600 text-sm font-medium">
                    * Incorrect password{' '}
                  </a> */}
                </div>
                <div className="flex items-center"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 justify-center"
                >
                  Forgot password?
                </a>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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

