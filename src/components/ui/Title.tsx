import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Title ({children, ...props}:TitleProps){
    return (
        <h3 className="font-nunito font-bold text-22 text-center text-primary_800_color py-9" {...props}>
            {children}
        </h3>
    )

}