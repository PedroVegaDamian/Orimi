import React from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '@/hooks/useRegister'
import { Title, Label, Input, Button, ErrorMessage } from '@/components/ui'
import { countryPrefixes } from '@/utils/prefixes'

const RegisterPage: React.FC = () => {
  const {
    userData,
    firstNameError,
    lastNameError,
    prefixError,
    phoneError,
    emailError,
    passwordError,
    confirmPasswordError,
    handleInputChange,
    handlePrefixChange,
    handleRegister
  } = useRegister()

  return (
    <div className="bg-white_color">
      <Title>Create an account</Title>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col flex-wrap items-start justify-center content-center mx-auto max-h-[330px] gap-x-[80px] gap-y-[20px]">
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
            <div style={{ height: '20px' }}>
              <ErrorMessage message={firstNameError} />
            </div>
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
            <div style={{ height: '20px' }}>
              <ErrorMessage message={lastNameError} />
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[450px]">
            <Label htmlFor="phone">
              Phone<span className="text-red_color">*</span>
            </Label>
            <div className="flex flex-row">
              <select
                id="prefix"
                name="prefix"
                onChange={handlePrefixChange}
                className="border-1 border-grey_color rounded-10 px-[17px] w-[150px] h-[40px]"
                value={userData.phonePrefix || ''}
              >
                <option value="" disabled>
                  Select prefix
                </option>
                {countryPrefixes.map(country => (
                  <option key={country.code} value={country.prefix}>
                    {country.name} ({country.prefix})
                  </option>
                ))}
              </select>
              <Input
                id="phone"
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ height: '20px', display: 'flex', gap: '41px' }}>
              <ErrorMessage message={prefixError} />
              <ErrorMessage message={phoneError} />
            </div>
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
            <div style={{ height: '20px' }}>
              <ErrorMessage message={emailError} />
            </div>
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
            <small className="text-grey_500_color">
              The password must have: at least 6 characters, one uppercase
              letter, one lowercase letter and one number.
            </small>
            <div style={{ height: '20px' }}>
              <ErrorMessage message={passwordError} />
            </div>
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
            <div style={{ height: '20px' }}>
              <ErrorMessage message={confirmPasswordError} />
            </div>
          </div>
        </div>

        <div className="text-center mt-[97px]">
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
