import IconLinkedin from '@/assets/icons/icon_linkedin.svg'
import IconGithub from '@/assets/icons/icon_github.svg'
import IconWebsite from '@/assets/icons/icon_web.svg'

type SocialLinksProps = {
  linkedin?: string
  /* nameLinkedin?: string; */
  github?: string
  /* nameGit?: string; */
  website?: string
  /* nameWeb?: string; */
}

const SocialLinks = ({
  linkedin /* , nameLinkedin */,
  github,
  /* nameGit, */ website /* , nameWeb  */
}: SocialLinksProps) => (
  <section className="flex flex-row no-wrap justify-around my-5 text-center md:ml-[100px]">
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconLinkedin} alt="LinkedIn" />{' '}
        {/* {nameLinkedin} */}
      </a>
    )}
    {github && (
      <a href={github} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconGithub} alt="GitHub" />{' '}
        {/* {nameGit} */}
      </a>
    )}
    {website && (
      <a href={website} target="_blank" rel="noopener noreferrer">
        <img className="inline" src={IconWebsite} alt="Website" />{' '}
        {/* {nameWeb} */}
      </a>
    )}
  </section>
)

export default SocialLinks
