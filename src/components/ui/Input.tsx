import React from 'react';
import { validateInput } from '@/components/InputValidation';

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
    const validatedValue = validateInput(name, e.target.value);
    e.target.value = validatedValue; 
    onChange(e); 
  };

  return <input {...props} type={type} name={name} value={value} className={combinedClasses} onChange={handleInputChange} />;
};
