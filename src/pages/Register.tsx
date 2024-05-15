import React from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '@/hooks/useRegister'
import { Title, Label, Input, Button, ErrorMessage } from '@/components/ui'

export const RegisterPage: React.FC = () => {
  const {
    userData,
    handleInputChange,
    handleRegister,
    firstNameError,
    lastNameError,
    phoneError,
    emailError,
    passwordError,
    confirmPasswordError
  } = useRegister()

  return (
    <div className="bg-white_color">
      <Title>Create an account</Title>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col flex-wrap items-start justify-center content-center mx-auto max-h-[303px] gap-x-[80px] gap-y-[20px]">
          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="firstName">
              First name<span className="text-red_color">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <ErrorMessage message={firstNameError} />
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="lastName">
              Last name<span className="text-red_color">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <ErrorMessage message={lastNameError} />
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="phone">
              Phone<span className="text-red_color">*</span>
            </Label>
            <Input
              id="phone"
              type="text"
              placeholder="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
            <ErrorMessage message={phoneError} />
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="email">
              Email address<span className="text-red_color">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <ErrorMessage message={emailError} />
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="password">
              Password<span className="text-red_color">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <ErrorMessage message={passwordError} />
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="confirmPassword">
              Confirm Password<span className="text-red_color">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
            />
            <ErrorMessage message={confirmPasswordError} />
          </div>
        </div>

        <div className="text-center">
          <Button type="submit"> Create account</Button>
        </div>
      </form>

      <Link
        className="py-[10px] block font-nunito text-base font-bold leading-19 text-center text-primary_800_color justify-center pt-5 pb-[10px]"
        to="/login"
      >
        Sign in
      </Link>
    </div>
  )
}
export default RegisterPage
