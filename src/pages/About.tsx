import { useState } from 'react'
import DefaultText from '../components/AboutPage/DefaultText';
import CarolinaText from '../components/AboutPage/CarolinaText';
import SilvanaText from '../components/AboutPage/SilvanaText';
import PedroText from '../components/AboutPage/PedroText';
import RocioText from '../components/AboutPage/RocioText';
import PaulaText from '../components/AboutPage/PaulaText';
import SocialLinks from '../components/AboutPage/SocialLinks';
import ImageGrid from '@/components/AboutPage/imageGrid';
 
export type TextComponentKey = 'default' | 'carolina' | 'silvana' | 'pedro' | 'rocio' | 'paula'; 


const textComponents = {
  default: DefaultText,
  carolina: CarolinaText,
  silvana: SilvanaText,
  pedro: PedroText,
  rocio: RocioText,
  paula: PaulaText, 
};

const socialLinks = {
  default: {
    linkedin: "#",
    nameLinkedin: "",
    github: "#",
    nameGit: "",
    website: "#",
    nameWeb: ""
  },
  carolina: {
    linkedin: "https://www.linkedin.com/in/carolhersant/",
    /* nameLinkedin: "Carolhersant", */
    github: "https://github.com/Carolhs92",
  /*   nameGit: "Carolhs92", */
    website: "http://carolinaherreradesigner.es/",
    /* nameWeb: "carolinaherreradesigner" */
  },
  silvana: {
    linkedin: "https://www.linkedin.com/in/silvana-loureiro/",
    /* nameLinkedin: "Silvana Loureiro Molina", */
    github: "https://github.com/SLouQA",
    /* nameGit: "SLouQA", */
    website: "",
    /* nameWeb: "" */
  },
  pedro: {
    linkedin: "https://www.linkedin.com/in/pedrovegadamian/",
    /* nameLinkedin: "Pedro Vega Damian", */
    github: "https://github.com/PedroVegaDamian",
    /* nameGit: "PedroVegaDamian", */
    website: "https://pedrovega.netlify.app/",
    /* nameWeb: "pedrovega" */
  },
  rocio: {
    linkedin: "https://www.linkedin.com/in/rocio-peralta-4396333a/",
    /* nameLinkedin: "Rocio Peralta", */
    github: "https://github.com/rocio-peralta",
    /* nameGit: "rocio-peralta", */
    website: "",
    /* nameWeb: "" */
  },
  paula: {
    linkedin: "https://www.linkedin.com/in/paulavillegascastro/",
    /* nameLinkedin: "Paula Villegas Castro", */
    github: "https://github.com/Apaulav/",
    /* nameGit: "Apaulav", */
    website: "",
    /* nameWeb: "" */
  }
};


export const AboutPage = () => {

  const [name, setName] = useState<TextComponentKey>("default")

  const RenderedText = textComponents[name] ? textComponents[name] : DefaultText;
  
  const links = socialLinks[name];

  return (
    <div className="w-full my-40">
      
      <div className="grid grid-cols-3 justify-items-center my-9">
        <section className="w-full pl-40 col-span-2 ml-80 mr-40 overflow-auto" >
          <RenderedText />
          {name !== 'default' && (
            <>
              <SocialLinks linkedin={links.linkedin} /* nameLinkedin={links.nameLinkedin} */ github={links.github} /* nameGit={links.nameGit} */ website={links.website} /* nameWeb={links.nameWeb} */ />
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="bg-primary_color text-black_color rounded-10 font-nunito font-semibold text-16 w-[144px] h-[47.44px] drop-shadow-lg "
                  onClick={() => setName('default')}
                >About us
                </button>
              </div>
            </>
          )}
        </section>

        <section className="grid grid-cols-1 gap-1">
          <div className="grid gap-1">
            <ImageGrid setName={setName} />
          </div>
        </section>

      </div>
    </div>
  )
}