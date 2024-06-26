import IconHeart from '@/assets/icons/icon_heart.svg'

export const Footer = () => {
  return (
    <footer className="bg-white_color py-6 flex font-inter text-[24px] justify-center gap-4 sticky bottom-0">
      <div className="flex justify-center">
        <img className="w-[31px] mr-2" src={IconHeart} alt="Heart Icon" />
        <p>Made by:</p>
      </div>
      <a
        target="_blank"
        href="https://github.com/Carolhs92"
        className="underline  text-primary_tono1_color"
      >
        Carolina
      </a>
      <a
        target="_blank"
        href="https://github.com/PedroVegaDamian"
        className="underline text-primary_tono2_color"
      >
        Pedro
      </a>
      <a
        target="_blank"
        href="https://github.com/rocio-peralta"
        className="underline text-primary_tono3_color"
      >
        Rocío
      </a>
      <a
        target="_blank"
        href="https://github.com/SLouQA"
        className="underline text-primary_tono4_color"
      >
        Silvana
      </a>
      <a
        target="_blank"
        href="https://github.com/Apaulav"
        className="underline text-primary_tono5_color"
      >
        Paula
      </a>
    </footer>
  )
}
