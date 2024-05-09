import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

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
