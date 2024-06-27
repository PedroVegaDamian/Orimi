import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ className, type, name, value, onChange, ...props }) => {
  const baseStyles = 'border-1 border-grey_color rounded-10 px-[17px] md:w-[475px] h-[40px]';
  const combinedClasses = `${baseStyles} ${className || ''}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (name === 'phone') {
      value = value.replace(/[^0-9]/g, '').slice(0, 15); // Solo números y máximo 15 caracteres
    }

    if (name === 'firstName' || name === 'lastName') {
      value = value.replace(/[^a-zA-ZñÑ\s]/g, ''); // Solo letras y espacios
      value = value.replace(/(^\s+|\s+$)/g, ''); // Sin espacios al inicio ni al final
      if (value.split(/\s+/).length > 4) {
        value = value.split(/\s+/).slice(0, 4).join(' '); // No más de 3 espacios no continuos
      }
    }

    if (name === 'password') {
      value = value.replace(/\s/g, ''); // Sin espacios
    }

    e.target.value = value; 
    onChange(e); 
  };

  return <input {...props} type={type} name={name} value={value} className={combinedClasses} onChange={handleInputChange} />;
};
