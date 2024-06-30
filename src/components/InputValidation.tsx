export const validateInput = (name: string, value: string): string => {
    let validatedValue = value;
    
        if (name === 'phone') {
        validatedValue = validatedValue.replace(/[^0-9]/g, '').slice(0, 15); // Solo números y máximo 15 caracteres
        }
    
        if (name === 'firstName' || name === 'lastName') {
        validatedValue = validatedValue.replace(/[^a-zA-ZñÑ\s]/g, ''); // Solo letras y espacios
        validatedValue = validatedValue.replace(/(^\s+|\s+$)/g, ''); // Sin espacios al inicio ni al final
        if (validatedValue.split(/\s+/).length > 4) {
            validatedValue = validatedValue.split(/\s+/).slice(0, 4).join(' '); // No más de 3 espacios no continuos
        }
        }
    
        if (name === 'password') {
        validatedValue = validatedValue.replace(/\s/g, ''); // Sin espacios
        }
    
        return validatedValue;
};