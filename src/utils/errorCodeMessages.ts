import { AuthErrorCodes } from 'firebase/auth'

export const CustomErrorCodes = {
  ...AuthErrorCodes,
  INVALID_NAME: 'auth/invalid-name',
  INVALID_CONFIRM_PASSWORD: 'auth/invalid-confirm-password',
  FAIL_REGISTER_USER: 'auth/fail-register-user',
  ERROR_DURING_REGISTRATION: 'auth/error-during-registration',
  ERROR_REGISTERING: 'auth/error-registering',
  INVALID_ADDRESS: 'auth/invalid-address',
  REQUIRED_FIELD: 'auth/required-field',
  REQUIRED_PREFIX: 'auth/required-prefix'
}

export const errorMessages = {
  [AuthErrorCodes.INVALID_PASSWORD]: 'Incorrect password, please try again.',
  [AuthErrorCodes.USER_DELETED]: 'User not found, please try again.',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Too many login attempts, please try later.',
  [AuthErrorCodes.EMAIL_EXISTS]:
    'This email is already in use. Please use a different email.',
  [AuthErrorCodes.INVALID_EMAIL]: 'The email is invalid, please try another.',
  [AuthErrorCodes.WEAK_PASSWORD]:
    'The password must have: at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character.',
  [AuthErrorCodes.INTERNAL_ERROR]:
    'Oops.. there was an error during authentication. Please try again.',

  [CustomErrorCodes.INVALID_NAME]:
    'Invalid format. Must contain only these letters, and have at most one space.',
  [CustomErrorCodes.REQUIRED_PREFIX]: 'Prefix is required',
  [CustomErrorCodes.INVALID_PHONE_NUMBER]: 'Invalid phone number.',
  [CustomErrorCodes.INVALID_CONFIRM_PASSWORD]: 'Passwords do not match.',
  [CustomErrorCodes.FAIL_REGISTER_USER]: 'Failed to register user.',
  [CustomErrorCodes.ERROR_DURING_REGISTRATION]: 'Error during registration.',
  [CustomErrorCodes.ERROR_REGISTERING]:
    'Unknown error occurred during registration.',
  [CustomErrorCodes.INVALID_ADDRESS]: 'Invalid format.',

  [CustomErrorCodes.REQUIRED_FIELD]: 'Required.',

  [CustomErrorCodes.REQUIRED_FIELD]: 'Input required.'
}

export const messageErrorCode = (
  code: string,
  defaultMsg: string = 'An unexpected error occurred.'
) => {
  return errorMessages[code] || defaultMsg
}
