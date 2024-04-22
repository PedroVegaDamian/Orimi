import { useRegister } from '@/hooks/useRegister';

export function RegisterPage() {
    const { userData, handleInputChange, handleRegister, firstNameError, lastNameError,phoneError, emailError, passwordError, confirmPasswordError } = useRegister();

    return (
        <div>
        <h3 className="title-style">Create an account</h3>
        <form onSubmit={handleRegister} >
            <div className='form-flex'>
            <div className="label-flex">
                <label htmlFor="firstName" className='label-text'>First name<span className="text-red_color">*</span></label>
                <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                />
                {firstNameError && <p className="text-red_color p-2 error-message text-12">{firstNameError}</p>}
            </div>

            <div className="label-flex">
                <label htmlFor="lastName" className='label-text'>Last name<span className="text-red_color">*</span></label>
                <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                />
                {lastNameError && <p className="text-red_color p-2 error-message text-12">{lastNameError}</p>}
            </div>

            <div className="label-flex">
                <label htmlFor='phone' className='label-text'>Phone<span className="text-red_color">*</span></label>
                <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                />
                {phoneError && <p className="text-red_color p-2 error-message text-12">{phoneError}</p>}
            </div>

            <div className="label-flex">
                <label htmlFor='email' className='label-text'>Email address<span className="text-red_color_color">*</span></label>
                <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                />
                {emailError && <p className="text-red_color p-2 error-message text-12">{emailError}</p>}
            </div>

            <div className="label-flex">
                <label htmlFor='password' className='label-text'>Password<span className="text-red_color">*</span></label>
                <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                />
                {passwordError && <p className="text-red_color p-2 error-message text-12">{passwordError}</p>}
            </div>

            <div className="label-flex">
                <label htmlFor="confirmPassword" className='label-text'>Confirm Password<span className="text-red_color">*</span></label>
                <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword} 
                onChange={handleInputChange}
                />
                {confirmPasswordError && <p className="text-red_color p-2 error-message text-12">{confirmPasswordError}</p>}
            </div>
            </div>


            <div className="text-center">
                <button type="submit" className="btn_big mt-97">
                Create account
                </button>
            </div>
        </form>

        </div>

    );
}
export default RegisterPage;
