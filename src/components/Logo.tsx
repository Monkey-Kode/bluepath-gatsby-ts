import { Link } from "gatsby";
import React from "react";
import DarkLogo from "../images/dark-logo336.svg";
import LightLogo from "../images/light-logo.svg";

interface LogoProps {
  image: Queries.SanityImage;
  className: "light-logo" | "dark-logo";
}

function Logo({ image, className }: LogoProps) {
  if (!image) {
    return null;
  }

  const LogoComponent = className === "light-logo" ? LightLogo : DarkLogo;

  return (
    <Link className={className} to="/#tof">
      <LogoComponent className="no-pixel" />
    </Link>
  );
}

export default Logo;
