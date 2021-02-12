import IconGitHub from "../../icons/IconGitHub";
import IconLinkedIn from "../../icons/IconLinkedIn";
import IconTwitter from "../../icons/IconTwitter";

import './Footer.css';

function Footer() {
  const SOCIAL_MEDIA = {
    GITHUB: 'https://github.com/TaylorClay',
    LINKEDIN: 'https://www.linkedin.com/in/Taylor-Clay/',
    TWITTER: 'https://twitter.com/TKtheDev',
  }

  function openSocialMedia(url) {
    return () => window.open(url, '_blank')
  }

  return (
    <footer id="Footer-wrapper">
      <button
        aria-label="Github"
        onClick={openSocialMedia(SOCIAL_MEDIA.GITHUB)}
      >
        <IconGitHub />
      </button>
      <button
        aria-label="LinkedIn"
        onClick={openSocialMedia(SOCIAL_MEDIA.LINKEDIN)}
      >
        <IconLinkedIn />
      </button>
      <button
        aria-label="Twitter"
        onClick={openSocialMedia(SOCIAL_MEDIA.TWITTER)}
      >
        <IconTwitter />
      </button>
    </footer>
  );
}

export default Footer;