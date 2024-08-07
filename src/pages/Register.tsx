import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useRegister';
import { Title, Label, Input, Button, ErrorMessage } from '@/components/ui';
import { countryPrefixes } from '@/utils/prefixes';

const RegisterPage: React.FC = () => {
  const {
    userData,
    errors,
    handleInputChange,
    handlePrefixChange,
    handleRegister
  } = useRegister();

  return (
    <div className="bg-white_color">
      <Title>Create an account</Title>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col flex-wrap items-center lg:items-start justify-center content-center mx-auto lg:max-h-[330px] lg:gap-x-[80px] lg:gap-y-[20px]">
          <div className="flex flex-col lg:flex-col lg:flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0">
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
              <ErrorMessage message={errors.firstName || ''} />
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0">
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
              <ErrorMessage message={errors.lastName || ''} />
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center max-w-[475px] lg:max-w-[500px]">
            <Label htmlFor="phone">
              Phone<span className="text-red_color">*</span>
            </Label>
            <div className="flex flex-col lg:flex-row">
              <select
                id="prefix"
                name="prefix"
                onChange={handlePrefixChange}
                className="border-1 border-grey_color rounded-10 px-[17px] lg:w-[150px] h-[40px]"
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
              <div className='h-[25px] lg:hidden'>
                <ErrorMessage message={errors.phonePrefix || ''} />
              </div>
              <Input
                id="phone"
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className='lg:ml-[20px] lg:max-w-[300px]'
              />
            </div>
            <div className='h-[25px] lg:h-auto lg:flex lg:flex-row lg:gap-[41px]'>
              <ErrorMessage message={errors.phonePrefix || ''} />
              <div className='hidden lg:block'>
                <ErrorMessage message={errors.phone || ''} />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0">
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
              <ErrorMessage message={errors.email || ''} />
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center sm:max-w-[217px] mb-2 lg:mb-0 md:max-w-[475px]">
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
              className="sm:w-full sm:max-w-[217px] md:max-w-[475px]"
            />
            {!errors.password && (
              <small className="text-grey_500_color text-[10px] max-w-[217px] md:max-w-[475px] block">
                The password must have: at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character.
              </small>
            )}
            <div style={{ height: '20px' }}>
              <ErrorMessage message={errors.password || ''} />
            </div>
          </div>

          <div className="flex flex-col flex-nowrap justify-center content-center lg:max-w-[450px] mb-2 lg:mb-0">
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
              <ErrorMessage message={errors.confirmPassword || ''} />
            </div>
          </div>
        </div>

        <div className="text-center mt-4 lg:mt-[97px]">
          <Button type="submit">Create account</Button>
        </div>
      </form>

      <Link
        className="py-[10px] block font-nunito text-base font-bold leading-19 text-center text-primary_800_color justify-center lg:pt-5 pb-[10px] mb-[100px] lg:mb-0"
        to="/login"
      >
        Sign in
      </Link>
    </div>
  );
}

export default RegisterPage;
