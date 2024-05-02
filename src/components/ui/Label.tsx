import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
    const baseStyles =
        'font-nunito font-semibold text-14 text-start text-black_color'
    const combinedClasses = `${baseStyles} ${className || ''}`

    return (
        <label {...props} className={combinedClasses}>
            {children}
        </label>
    ) 
}
