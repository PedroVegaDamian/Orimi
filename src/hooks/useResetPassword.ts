import { errorMessages, CustomErrorCodes } from '@/utils/errorCodeMessages'
import { passwordRegex } from '@/utils/validationsRegex'
import { useState } from 'react'

export const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  const handlePasswordValidation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}
    let isValid = true

    setPasswordError('')
    setConfirmPasswordError('')

    // Validación de la contraseña
    if (!newPassword) {
      newErrors.passwordError = errorMessages[CustomErrorCodes.REQUIRED_FIELD]
      isValid = false
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.passwordError = errorMessages[CustomErrorCodes.WEAK_PASSWORD]
      isValid = false
    }

    // Validación de confirmación de contraseña
    if (!confirmPassword) {
      newErrors.confirmPasswordError =
        errorMessages[CustomErrorCodes.REQUIRED_FIELD]
      isValid = false
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPasswordError =
        errorMessages[CustomErrorCodes.INVALID_CONFIRM_PASSWORD]
      isValid = false
    }
    setPasswordError(newErrors.passwordError || '')
    setConfirmPasswordError(newErrors.confirmPasswordError || '')

    if (!isValid) {
      return
    }
  }
  return {
    newPassword,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    setNewPassword,
    setConfirmPassword,
    handlePasswordValidation
  }
}
