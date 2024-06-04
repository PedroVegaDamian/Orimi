import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    extraClass?: string; 
}

export function Title ({className, textAlignment = 'center', children, ...props}: TitleProps & { textAlignment?: string }){
    const baseStyles = `font-nunito font-bold text-22 text-primary_800_color py-[36px] text-${textAlignment}`;
    const combinedClasses = `${baseStyles} ${className || ''}`;
    return (
        <h3 {...props} className={combinedClasses}>
            {children}
        </h3>
    );
}