import IconGithub from '@/assets/icons/icon_github.svg'
import IconLinkedin from '@/assets/icons/icon_linkedin.svg'
import IconWebsite from '@/assets/icons/icon_web.svg'

type SocialLinksProps = {
  linkedin?: string
  github?: string
  website?: string
}

export const SocialLinks = ({
  linkedin,
  github,
  website
}: SocialLinksProps) => (
  <section className="flex justify-between my-5">
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconLinkedin} alt="LinkedIn" />{' '}
      </a>
    )}
    {github && (
      <a href={github} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconGithub} alt="GitHub" />{' '}
      </a>
    )}
    {website && (
      <a href={website} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconWebsite} alt="Website" />{' '}
      </a>
    )}
  </section>
)
