import IconHeart from '@/assets/icons/icon_heart.svg'

export const Footer = () => {
  return (
    <footer className="bg-white_color py-6 text-[24px] lg:sticky fixed inset-x-0 bottom-0 shadow-block shadow-[0_0px_10px_0_rgba(0,0,0,0.15)] ">
      <div className="flex justify-center lg:order-none order-1 items-baseline">
        <img className="md:w-[31px] lg:w-[31px] w-[20px] h-[20px] mr-2" src={IconHeart} alt="Heart Icon" />
        <p className='lg:text-[24px] text-[16px]'>Made by:</p>
      </div>
      <div className='flex justify-center gap-4 order-2'>
        <a
          target="_blank"
          href="https://github.com/Carolhs92"
          className="underline text-primary_tono1_color lg:text-[24px] text-[16px]"
        >
          Carolina
        </a>
        <a
          target="_blank"
          href="https://github.com/PedroVegaDamian"
          className="underline text-primary_tono2_color lg:text-[24px] text-[16px]"
        >
          Pedro
        </a>
        <a
          target="_blank"
          href="https://github.com/rocio-peralta"
          className="underline text-primary_tono3_color lg:text-[24px] text-[16px]"
        >
          Rocío
        </a>
        <a
          target="_blank"
          href="https://github.com/SLouQA"
          className="underline text-primary_tono4_color lg:text-[24px] text-[16px]"
        >
          Silvana
        </a>
        <a
          target="_blank"
          href="https://github.com/Apaulav"
          className="underline text-primary_tono5_color lg:text-[24px] text-[16px]"
        >
          Paula
        </a>
      </div>
      
    </footer>
  )
}
