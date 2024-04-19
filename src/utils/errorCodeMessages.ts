import { AuthErrorCodes } from 'firebase/auth'

export const messageErrorCode = (code: string, message: string) => {
  const messages: Record<string, string> = {
    [AuthErrorCodes.INVALID_PASSWORD]:
      'Password incorrect, try again.',
    [AuthErrorCodes.USER_DELETED]:
      'User not found, try again.',
    [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
      'Too many attempts, try again later.',
    [AuthErrorCodes.EMAIL_EXISTS]:
        'The email is already in use, try another one.',
    [AuthErrorCodes.INVALID_EMAIL]:
      'The email is invalid, try again.',
    [AuthErrorCodes.WEAK_PASSWORD]:
      'The password is too weak, try again.',
    [AuthErrorCodes.INTERNAL_ERROR]:
      'Internal error, try again later.',
  }
  

  return messages[code] || message
}
