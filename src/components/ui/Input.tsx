import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function Input({ className, ...props }: InputProps){
    const baseStyles = "border-1 border-grey_color rounded-10 px-[17px] w-[475px] h-[40px]";
    const combinedClasses = `${baseStyles} ${className || ''}`;

    return (
        <input
            {...props}
            className={combinedClasses}
        />
    );
}