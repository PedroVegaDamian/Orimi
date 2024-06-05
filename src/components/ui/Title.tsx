import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Title({ className, children, ...props }: TitleProps) {
  const baseStyles =
    'font-nunito font-bold text-22 text-center text-primary_800_color py-[36px]'
  const combinedClasses = `${baseStyles} ${className || ''}`
  return (
    <h3 className={combinedClasses} {...props}>
      {children}
    </h3>
  )
}
