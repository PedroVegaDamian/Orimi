import { useRegister } from '@/hook/useRegister';

export function RegisterPage() {
    const { userData, handleInputChange, handleRegister, firstNameError, lastNameError,phoneError, emailError, passwordError, confirmPasswordError } = useRegister();

    return (
        <form onSubmit={handleRegister} className='text-center'>
            <h3 className='p-4'>Sign Up</h3>

            <div className="mb-3">
                <label htmlFor="firstName">First name<span className="text-red_color">*</span></label>
                <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                />
                {firstNameError && <p className="text-red_color p-2 error-message">{firstNameError}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="lastName">Last name<span className="text-red_color">*</span></label>
                <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                />
                {lastNameError && <p className="text-red_color p-2 error-message">{lastNameError}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor='phone'>Phone<span className="text-red_color">*</span></label>
                <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                />
                {phoneError && <p className="text-red_color p-2 error-message">{phoneError}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor='email'>Email address<span className="text-red_color_color">*</span></label>
                <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                />
                {emailError && <p className="text-red_color p-2 error-message">{emailError}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor='password'>Password<span className="text-red_color">*</span></label>
                <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                />
                {passwordError && <p className="text-red_color p-2 error-message">{passwordError}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password<span className="text-red_color">*</span></label>
                <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword} 
                onChange={handleInputChange}
                />
                {confirmPasswordError && <p className="text-red_color p-2 error-message">{confirmPasswordError}</p>}
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-primary bg-primary_color text-white p-4">
                Sign Up
                </button>
            </div>
        </form>
    );
}
export default RegisterPage;
