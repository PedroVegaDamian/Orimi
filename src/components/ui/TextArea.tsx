import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  const baseStyles = 'border-1 border-grey_color rounded-10 px-[17px] md:w-[475px] h-[100px]';
  const combinedClasses = `${baseStyles} ${className || ''}`;

  return <textarea {...props} className={combinedClasses} />;
};
