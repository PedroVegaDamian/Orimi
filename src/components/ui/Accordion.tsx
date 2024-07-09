import { useState } from 'react'
import IconArrow from '@/assets/icons/icon_arrow_right_color.svg'

interface AccordionProps {
  title: string
  content: JSX.Element
}

export const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex gap-4 p-2"
      >
        <img
          width={8}
          src={IconArrow}
          alt="icon_arrow"
          className={`inline-block transition-all ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
        <p>{title}</p>
      </div>

      <div
        className={` overflow-hidden transition-all ${
          isOpen ? 'h-[80px]' : 'h-0'
        }`}
      >
        {content}
      </div>
    </>
  )
}
