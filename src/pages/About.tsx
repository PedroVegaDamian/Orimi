import { useState } from 'react';

import DefaultText from '@/components/AboutPage/DefaultText';
import CarolinaText from '@/components/AboutPage/CarolinaText';
import SilvanaText from '@/components/AboutPage/SilvanaText';
import PedroText from '@/components/AboutPage/PedroText';
import RocioText from '@/components/AboutPage/RocioText';
import PaulaText from '@/components/AboutPage/PaulaText';
import SocialLinks from '@/components/AboutPage/SocialLinks';
import ImageGrid from '@/components/AboutPage/imageGrid';

import { Button } from '@/components/ui/Button';
import IconArrow from '@/assets/icons/icon_arrow_left_black.svg';

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
    github: "https://github.com/Carolhs92",
    website: "http://carolinaherreradesigner.es/"
  },
  silvana: {
    linkedin: "https://www.linkedin.com/in/silvana-loureiro/",
    github: "https://github.com/SLouQA",
    website: ""
  },
  pedro: {
    linkedin: "https://www.linkedin.com/in/pedrovegadamian/",
    github: "https://github.com/PedroVegaDamian",
    website: "https://pedrovega.netlify.app/"
  },
  rocio: {
    linkedin: "https://www.linkedin.com/in/rocio-peralta-4396333a/",
    github: "https://github.com/rocio-peralta",
    website: ""
  },
  paula: {
    linkedin: "https://www.linkedin.com/in/paulavillegascastro/",
    github: "https://github.com/Apaulav/",
    website: ""
  }
};

const AboutPage = () => {
  const [name, setName] = useState<TextComponentKey>("default");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSetName = (name: TextComponentKey) => {
    setName(name);
    if (name === 'default') {
        setSelectedImage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const RenderedText = textComponents[name] ? textComponents[name] : DefaultText;
  const links = socialLinks[name];

  return (
    <div className="w-full mb-[100px] min-h-screen overflow-hidden">
      <div className="relative grid lg:grid-cols-3 justify-items-center">
        <section className="w-full lg:col-span-2 overflow-hidden">
          <div className="lg:hidden mt-[20px]">
            <ImageGrid setName={handleSetName} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          </div>
          <RenderedText />
          {name !== 'default' && (
            <>
              <hr className="border-grey_color w-[90%] mx-auto lg:ml-[100px]" />
              <SocialLinks linkedin={links.linkedin} github={links.github} website={links.website} />
              <div className="flex justify-center md:justify-start mb-[50px] md:ml-9 lg:ml-[100px]">
                <Button type="button" onClick={() => handleSetName('default')}>
                  <img src={IconArrow} alt="arrow icon" className="inline mr-2" />
                  About us
                </Button>
              </div>
            </>
          )}
        </section>
        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center relative h-[700px] ml-[20px]">
          <ImageGrid setName={handleSetName} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
