import React from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...props }: TextAreaProps) {
  const baseStyles =
    'border-1 border-grey_color rounded-10 px-[17px] md:w-[475px] h-[100px]'
  const combinedClasses = `${baseStyles} ${className || ''}`

  return <TextArea {...props} className={combinedClasses} />
}
