import { useState } from 'react'

import DefaultText from '@/components/AboutPage/DefaultText'
import CarolinaText from '@/components/AboutPage/CarolinaText'
import SilvanaText from '@/components/AboutPage/SilvanaText'
import PedroText from '@/components/AboutPage/PedroText'
import RocioText from '@/components/AboutPage/RocioText'
import SocialLinks from '@/components/AboutPage/SocialLinks'
import ImageGrid from '@/components/AboutPage/imageGrid'

import { Button } from '@/components/ui/Button'
import IconArrow from '@/assets/icons/icon_arrow_left_black.svg'

export type TextComponentKey =
  | 'default'
  | 'carolina'
  | 'silvana'
  | 'pedro'
  | 'rocio'

const textComponents = {
  default: DefaultText,
  carolina: CarolinaText,
  silvana: SilvanaText,
  pedro: PedroText,
  rocio: RocioText
}

const socialLinks = {
  default: {
    linkedin: '#',
    nameLinkedin: '',
    github: '#',
    nameGit: '',
    website: '#',
    nameWeb: ''
  },
  carolina: {
    linkedin: 'https://www.linkedin.com/in/carolhersant/',
    github: 'https://github.com/Carolhs92',
    website: 'http://carolinaherreradesigner.es/'
  },
  silvana: {
    linkedin: 'https://www.linkedin.com/in/silvana-loureiro/',
    github: 'https://github.com/SLouQA',
    website: ''
  },
  pedro: {
    linkedin: 'https://www.linkedin.com/in/pedrovegadamian/',
    github: 'https://github.com/PedroVegaDamian',
    website: 'https://pedrovega.netlify.app/'
  },
  rocio: {
    linkedin: 'https://www.linkedin.com/in/rocio-peralta-4396333a/',
    github: 'https://github.com/rocio-peralta',
    website: ''
  }
}

const AboutPage = () => {
  const [name, setName] = useState<TextComponentKey>('default')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleSetName = (name: TextComponentKey) => {
    setName(name)
    if (name === 'default') {
      setSelectedImage(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const RenderedText = textComponents[name] ? textComponents[name] : DefaultText
  const links = socialLinks[name]

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto">
      <div className="flex flex-col-reverse lg:flex-row">
        <section className="w-full pr-10 mb-[100px] lg:mb-0 lg:w-[64%] lg:col-span-2">
          <RenderedText />
          {name !== 'default' && (
            <>
              <hr className="border-grey_color w-[90%] mx-auto lg:ml-[100px]" />
              <SocialLinks
                linkedin={links.linkedin}
                github={links.github}
                website={links.website}
              />
              <div className="flex justify-center md:justify-start mb-[50px] md:ml-9 lg:ml-[100px]">
                <Button type="button" onClick={() => handleSetName('default')}>
                  <img
                    src={IconArrow}
                    alt="arrow icon"
                    className="inline mr-2"
                  />
                  About us
                </Button>
              </div>
            </>
          )}
        </section>

        <ImageGrid
          setName={handleSetName}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </main>
  )
}

export default AboutPage
