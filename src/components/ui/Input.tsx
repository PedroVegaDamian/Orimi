import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseStyles = 'border-1 border-grey_color rounded-10 px-[17px] md:w-[475px] h-[40px]';
  const combinedClasses = `${baseStyles} ${className || ''}`;

  return <input {...props} className={combinedClasses} />;
};
