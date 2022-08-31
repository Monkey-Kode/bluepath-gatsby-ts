import { Link } from 'gatsby';
import React from 'react';
import DarkLogo from '../images/dark-logo336.svg';
import LightLogo from '../images/light-logo.svg';
function Logo({ image, className }) {
  // console.log(image);
  if (!image) {
    return null;
  }

  if (className === 'light-logo') {
    return (
      <Link className={className} to="/#carousel">
        <LightLogo className="no-pixel"></LightLogo>
      </Link>
    );
  } else if (className === 'dark-logo') {
    return (
      <Link className={className} to="/#carousel">
        <DarkLogo className="no-pixel"></DarkLogo>
      </Link>
    );
  }
}

export default Logo;
