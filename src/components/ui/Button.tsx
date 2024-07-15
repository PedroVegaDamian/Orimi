import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  extraClass?: string;
  bgColor?: 'bg-primary_color' | 'bg-red_color';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  bgColor = 'bg-primary_color',
  extraClass,
  ...props
}) => {
  const baseClasses = 'text-black_color rounded-10 font-nunito font-semibold drop-shadow-lg';
  const sizeClasses = {
    small: 'w-[100px] h-[47px] text-sm',
    medium: 'w-[144px] h-[47px] text-base',
    large: 'w-[254px] h-[47px] text-lg',
  };
  const combinedClasses = `${baseClasses} ${props.disabled ? 'bg-gray_color cursor-not-allowed' : ''} ${sizeClasses[size]} ${extraClass || ''} ${bgColor}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
