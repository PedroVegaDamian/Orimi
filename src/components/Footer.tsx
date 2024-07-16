import IconHeart from '@/assets/icons/icon_heart.svg'

import IconPen from '@/assets/icons/Icon_pen.svg'
import IconBug from '@/assets/icons/icon_bug.svg'
import IconKeyboard from '@/assets/icons/Icon_keyboard.svg'
import IconMedal from '@/assets/icons/icon_medal.svg'

export const Footer = () => {
  return (
    <footer className="bg-white_color py-6 text-[24px] lg:sticky fixed inset-x-0 bottom-0 shadow-block shadow-[0_0px_10px_0_rgba(0,0,0,0.15)] ">
      <div className="flex justify-center lg:order-none order-1 items-baseline">
        <img
          className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
          src={IconHeart}
          alt="Heart Icon"
        />
        <p className="lg:text-[24px] text-[16px]">Made by:</p>
      </div>
      <div className="flex justify-center items-end gap-4 order-2">
        <a
          target="_blank"
          href="https://github.com/Carolhs92"
          className="underline text-primary_tono1_color lg:text-[24px] text-[16px] flex flex-col md:flex-row flex-nowrap items-center md:items-baseline"
        >
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconPen}
            alt="Heart Icon"
          />
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconKeyboard}
            alt="Heart Icon"
          />
          Carolina
        </a>
        <a
          target="_blank"
          href="https://github.com/PedroVegaDamian"
          className="underline text-primary_tono2_color lg:text-[24px] text-[16px] flex flex-col md:flex-row flex-nowrap items-center md:items-baseline"
        >
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconMedal}
            alt="Heart Icon"
          />
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconKeyboard}
            alt="Heart Icon"
          />
          Pedro
        </a>
        <a
          target="_blank"
          href="https://github.com/rocio-peralta"
          className="underline text-primary_tono3_color lg:text-[24px] text-[16px] flex flex-col md:flex-row flex-nowrap items-center md:items-baseline"
        >
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconKeyboard}
            alt="Heart Icon"
          />
          Rocío
        </a>
        <a
          target="_blank"
          href="https://github.com/SLouQA"
          className="underline text-primary_tono4_color lg:text-[24px] text-[16px] flex flex-col md:flex-row flex-nowrap items-center md:items-baseline"
        >
          <img
            className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2"
            src={IconBug}
            alt="Heart Icon"
          />
          Silvana
        </a>
      </div>
    </footer>
  )
}
