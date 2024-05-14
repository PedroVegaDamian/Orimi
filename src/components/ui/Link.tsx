import React from 'react'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ className, children, ...props }: LinkProps) {
  const baseStyles =
    'py-[10px] block font-nunito text-base font-bold leading-19 text-center text-primary_800_color justify-center pt-5 pb-[10px]'
  const combinedClasses = `${baseStyles} ${className || ''}`

  return (
    <a {...props} className={combinedClasses}>
      {children}
    </a>
  )
}
