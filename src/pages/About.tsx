import { useState } from 'react'

import IconArrow from '@/assets/icons/icon_arrow_left_black.svg'
import carolImage from '@/assets/img/carol.jpg'
import pedroImage from '@/assets/img/pedro.jpeg'
import rocioImage from '@/assets/img/rocio.png'
import silvanaImage from '@/assets/img/silvana.png'
import { AvatarGrid } from '@/components/AboutPage/AvatarGrid'
import { BioOfCarolina } from '@/components/AboutPage/BioOfCarolina'
import { BioOfPedro } from '@/components/AboutPage/BioOfPedro'
import { BioOfRocio } from '@/components/AboutPage/BioOfRocio'
import { BioOfSilvana } from '@/components/AboutPage/BioOfSilvana'
import { DefaultText } from '@/components/AboutPage/DefaultText'
import { SocialLinks } from '@/components/AboutPage/SocialLinks'
import { Button } from '@/components/ui/Button'

type TextComponentKey = 'default' | 'carolina' | 'silvana' | 'pedro' | 'rocio'

type BioComponents = Record<TextComponentKey, React.FC>

interface AvatarImgProps {
  src: string
  alt: string
  name: TextComponentKey
}

const bioComponents: BioComponents = {
  default: DefaultText,
  carolina: BioOfCarolina,
  silvana: BioOfSilvana,
  pedro: BioOfPedro,
  rocio: BioOfRocio
}

const socialLinks = {
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

const avatars: AvatarImgProps[] = [
  { src: carolImage, alt: 'Carolina', name: 'carolina' },
  { src: pedroImage, alt: 'Pedro', name: 'pedro' },
  { src: rocioImage, alt: 'Rocio', name: 'rocio' },
  { src: silvanaImage, alt: 'Silvana', name: 'silvana' }
]

const AboutPage = () => {
  const [nameSelected, setNameSelected] = useState<TextComponentKey>('default')

  const links = nameSelected !== 'default' && socialLinks[nameSelected]

  const BioComponentSelected = bioComponents[nameSelected] || DefaultText
  const SocialLinksComponentSelected = () => {
    if (links) {
      return (
        <div>
          <hr className="border-grey_color mx-auto" />

          <SocialLinks
            github={links.github}
            website={links.website}
            linkedin={links.linkedin}
          />

          <Button
            type="button"
            extraClass="block mx-auto md:inline-block"
            onClick={() => handleSetNameSelected('default')}
          >
            <img src={IconArrow} alt="arrow icon" className="inline mr-2" />
            About us
          </Button>
        </div>
      )
    }
  }

  const handleSetNameSelected = (name: TextComponentKey) => {
    if (name === 'default') window.scrollTo({ top: 0, behavior: 'smooth' })
    setNameSelected(name)
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col lg:flex-row-reverse">
        <AvatarGrid>
          {avatars.map(avatar => (
            <AvatarGrid.Image
              src={avatar.src}
              alt={avatar.alt}
              key={avatar.name}
              onClick={() => handleSetNameSelected(avatar.name)}
              className={
                nameSelected === avatar.name ? 'border-primary_800_color' : ''
              }
            />
          ))}
        </AvatarGrid>

        <section className="lg:w-[64%] px-4 mb-8">
          <BioComponentSelected />
          <SocialLinksComponentSelected />
        </section>
      </div>
    </div>
  )
}

export default AboutPage
