import React from 'react';

//TODO:hover y disabled

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    extraClass?: string;
    bgColor?: 'bg-primary_color' | 'bg-red_color';
    disabled?: boolean;

}

export function Button({ children, disabled, size = 'medium', bgColor = 'bg-primary_color', extraClass, ...props }: ButtonProps) {
    const baseClasses = "text-black_color rounded-10 font-nunito font-semibold drop-shadow-lg mt-[97px]";
    const sizeClasses = {
        small: "w-[100px] h-[47px] text-sm",
        medium: "w-[144px] h-[47px] text-base",
        large: "w-[254px] h-[47px] text-lg"
    };
    // Asegúrate de que extraClass y bgColor se apliquen correctamente
    const combinedClasses = `${baseClasses} ${disabled ? 'bg-gray_color cursor-not-allowed' : ''} ${sizeClasses[size]} ${extraClass || ''} ${bgColor}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
