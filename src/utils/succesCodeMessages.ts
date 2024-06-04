export const CustomSuccessCodes = {
    USER_REGISTERED: 'auth/user-registered', 
};

export const successMessages = {
    [CustomSuccessCodes.USER_REGISTERED]: 'User Registered Successfully!',
}
export const messageSuccessCode = (code: string, defaultMsg: string = 'A success occurred.') => {
    return successMessages[code] || defaultMsg;
}