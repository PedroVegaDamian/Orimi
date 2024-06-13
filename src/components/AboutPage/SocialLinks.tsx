type SocialLinksProps = {
    linkedin?: string;
    /* nameLinkedin?: string; */
    github?: string;
    /* nameGit?: string; */
    website?: string;
    /* nameWeb?: string; */
};



const SocialLinks = ({ linkedin/* , nameLinkedin */, github, /* nameGit, */ website/* , nameWeb  */}: SocialLinksProps) => (
    <section className='flex flex-row no-wrap justify-around my-5 text-center md:ml-[100px]'>
        {linkedin && (
            <a className="flex-1" href={linkedin} target="_blank" rel="noopener noreferrer">
                <img className='inline' src="../src/assets/icons/icon_linkedin.svg" alt="LinkedIn" /> {/* {nameLinkedin} */}
            </a>
        )}
        {github && (
            <a className="flex-1" href={github} target="_blank" rel="noopener noreferrer">
                <img className='inline' src="../src/assets/icons/icon_github.svg" alt="GitHub" /> {/* {nameGit} */}
            </a>
        )}
        {website && (
            <a className="flex-1" href={website} target="_blank" rel="noopener noreferrer">
                <img className='inline' src="../src/assets/icons/icon_web.svg" alt="Website" /> {/* {nameWeb} */}
            </a>
        )}
    </section>
);

export default SocialLinks;