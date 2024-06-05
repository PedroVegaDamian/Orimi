import React from 'react';

//TODO:hover y disabled

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    extraClass?: string;
    bgColor?: 'bg-primary_color' | 'bg-red_color';
    disabled?: boolean;

}

export function Button({ children, disabled, size = 'medium', bgColor = 'bg-primary_color', extraClass, ...props }: ButtonProps) {
    const baseClasses = "text-black_color rounded-10 font-nunito font-semibold drop-shadow-lg";
    const sizeClasses = {
        small: "w-[100px] h-[47px] text-sm",
        medium: "w-[144px] h-[47px] text-base",
        large: "w-[254px] h-[47px] text-lg"
    };
    const combinedClasses = `${baseClasses} ${disabled ? 'bg-gray_color cursor-not-allowed' : ''} ${sizeClasses[size]} ${extraClass || ''} ${bgColor}`;

<<<<<<< feature/cartShopping
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-primary_color text-black_color rounded-10 font-nunito font-semibold text-16 w-[144px] h-[47.44px] drop-shadow-lg mt-[97px]"
      {...props}
    >
      {children}
    </button>
  )
}
=======
    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
>>>>>>> develop
