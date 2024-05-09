export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
export const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\-'.]+(\s[A-Za-záéíóúÁÉÍÓÚñÑüÜ\-'.]+)*$/;
export const phoneRegex = /^(?:(?:\+?[0-9]{2,4})?[ ]?[6789][0-9 ]{8,13})$/;
export const addressRegex = {
    street: /^[a-zA-Z0-9\s,'-]*$/,
    city: /^[a-zA-Z\s]*$/,
    zip: /^\d{5}(-\d{4})?$/, 
    country: /^[a-zA-Z\s]*$/,
    company: /^[a-zA-Z\s]*$/,
    state: /^[a-zA-Z\s]*$/,
    notes: /^[a-zA-Z0-9\s,'-]*$/,
}
