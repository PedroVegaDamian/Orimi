import { AuthErrorCodes } from 'firebase/auth'

export const messageErrorCode = (code: string, message: string) => {
  const messages: Record<string, string> = {
    [AuthErrorCodes.INVALID_PASSWORD]:
      'Password incorrecto, por favor intentelo nuevamente.',
    [AuthErrorCodes.USER_DELETED]:
      'Usuario no encontrado, por favor intente nuevamente.',
    [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
      'Hizo muchos intentos de iniciar sesión, intente más tarde.',
    [AuthErrorCodes.EMAIL_EXISTS]:
      'El correo ya está en uso, pruebe con otro por favor.',
    [AuthErrorCodes.INVALID_EMAIL]:
      'El correo es inválido, pruebe con otro por favor.',
    [AuthErrorCodes.WEAK_PASSWORD]:
      'La contraseña debe de tener al menos 6 caractéres.',
    [AuthErrorCodes.INTERNAL_ERROR]:
      'Upss.. ocuründ un error al autenticarse. Intentelo nuevamente.'
  }

  return messages[code] || message
}
