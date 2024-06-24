import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks/useLogin'
import IconFacebook from '@/assets/icons/icon_facebook.svg'
import IconGoogle from '@/assets/icons/icon_google.svg'

const LoginPage = () => {
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
      <section className="bg-white_color">
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
                  <span className="text-red_color text-sm font-medium">
                    {errorEmail ? <p>{errorEmail}</p> : null}
                  </span>
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
                  <span className="text-red_color text-sm font-medium">
                    {errorPassword ? <p>{errorPassword}</p> : null}
                  </span>
                  <div className="flex justify-center">
                    <span className="text-red_color text-sm font-medium pt-5">
                      {error ? <p>{error}</p> : null}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p">
                  <button
                    type="submit"
                    className="block w-32 bg-primary_color font-nunito text-md font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                  >
                    Submit
                  </button>
                  <Link
                   className="block font-nunito text-base font-bold cursor-pointer leading-19 text-center text-primary_800_color justify-center pt-5 pb-10"
                   to='/reset-password'
                  >
                    Forgot password?
                  </Link>
                  <p className="font-nunito text-base font-normal leading-19 text-center">
                    Don’t have an account yet?{' '}
                    <Link
                      className="font-nunito text-base font-bold cursor-pointer leading-19 text-center text-primary_800_color hover:underline dark:text-primary-500"
                      to='/register'
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center">
          <div>
            <svg
              width="545"
              height="22"
              viewBox="0 0 545 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M275.505 16.144C274.438 16.144 273.505 15.9093 272.705 15.44C271.916 14.96 271.302 14.288 270.865 13.424C270.438 12.5493 270.225 11.5253 270.225 10.352C270.225 9.46667 270.348 8.672 270.593 7.968C270.838 7.25333 271.19 6.64533 271.649 6.144C272.108 5.632 272.662 5.24267 273.313 4.976C273.964 4.70933 274.694 4.576 275.505 4.576C276.582 4.576 277.516 4.81067 278.305 5.28C279.094 5.74933 279.702 6.416 280.129 7.28C280.566 8.144 280.785 9.16267 280.785 10.336C280.785 11.2213 280.662 12.0213 280.417 12.736C280.172 13.4507 279.814 14.064 279.345 14.576C278.886 15.088 278.332 15.4773 277.681 15.744C277.03 16.0107 276.305 16.144 275.505 16.144ZM275.505 14.704C276.252 14.704 276.886 14.5333 277.409 14.192C277.942 13.8507 278.348 13.3547 278.625 12.704C278.913 12.0533 279.057 11.2693 279.057 10.352C279.057 8.976 278.748 7.90933 278.129 7.152C277.51 6.39467 276.636 6.016 275.505 6.016C274.758 6.016 274.118 6.18667 273.585 6.528C273.062 6.85867 272.657 7.34933 272.369 8C272.092 8.65067 271.953 9.43467 271.953 10.352C271.953 11.7173 272.262 12.784 272.881 13.552C273.51 14.32 274.385 14.704 275.505 14.704Z"
                fill="#D9D9D9"
              />
              <path d="M295 10L545 10" stroke="#D9D9D9" />
              <path d="M0 10L250 10" stroke="#D9D9D9" />
            </svg>
          </div>
          <span className="block mt-5 font-nunito text-base font-bold leading-19 text-center text-primary_800_color hover:underline dark:text-primary-500">
            Or login using
          </span>
          <div className="flex justify-center items-center mt-5 space-x-20 mb-20">
            <button
              type="submit"
              className="flex flex-row space-x-10 w-48 font-nunito text-md font-semibold leading-22 text-center  hover:bg-primary-700 focus:bg-primary_500_color rounded-lg px-5 py-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              onClick={() => navigate('/')}
            >
              <img src={IconGoogle} alt="Search Icon" />
              <span className="">Google</span>
            </button>
            <button
              type="submit"
              className=" flex flex-row space-x-10 w-48 font-nunito text-md font-semibold leading-22 text-center  hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              onClick={() => navigate('/')}
            >
              <img src={IconFacebook} alt="Search Icon" />
              <span>Facebook</span>
            </button>
          </div>
        </div> */}
      </section>
    </>
  )
}

export default LoginPage