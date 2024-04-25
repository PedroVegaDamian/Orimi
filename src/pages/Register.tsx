import React from 'react';
import { useRegister } from '@/hooks/useRegister';
import { Title,Label, Input, Button } from '@/components/ui';

export const RegisterPage: React.FC = () => {
    const { userData, handleInputChange, handleRegister, firstNameError, lastNameError,phoneError, emailError, passwordError, confirmPasswordError } = useRegister();

    return (
        <div className="bg-white_color">
        <Title>Create an account</Title>
        <form onSubmit={handleRegister} >
            <div className='form-flex'>
            <div className="label-flex">
                <Label htmlFor="firstName">First name<span className="text-red_color">*</span></Label>
                <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                />
                {firstNameError && <p className="text-red_color p-2 error-message text-12">{firstNameError}</p>}
            </div>

            <div className="label-flex">
                <Label htmlFor="lastName">Last name<span className="text-red_color">*</span></Label>
                <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                />
                {lastNameError && <p className="text-red_color p-2 error-message text-12">{lastNameError}</p>}
            </div>

            <div className="label-flex">
                <Label htmlFor='phone'>Phone<span className="text-red_color">*</span></Label>
                <Input
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                />
                {phoneError && <p className="text-red_color p-2 error-message text-12">{phoneError}</p>}
            </div>

            <div className="label-flex">
                <Label htmlFor='email'>Email address<span className="text-red_color">*</span></Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                {emailError && <p className="text-red_color p-2 error-message text-12">{emailError}</p>}
            </div>

            <div className="label-flex">
                <Label htmlFor='password'>Password<span className="text-red_color">*</span></Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                {passwordError && <p className="text-red_color p-2 error-message text-12">{passwordError}</p>}
            </div>

            <div className="label-flex">
                <Label htmlFor="confirmPassword">Confirm Password<span className="text-red_color">*</span></Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={userData.confirmPassword} 
                    onChange={handleInputChange}
                />
                {confirmPasswordError && <p className="text-red_color p-2 error-message text-12">{confirmPasswordError}</p>}
            </div>
            </div>

            <div className="text-center">
                <Button type="submit"> Create account</Button>
            </div>
        </form>

        </div>

    );
}
export default RegisterPage;
