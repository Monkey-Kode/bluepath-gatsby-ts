import BackgroundImage from "gatsby-background-image";
import styled, { keyframes, css } from "styled-components";

const panAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const mobileAnimation = css`
  background-size: 120% auto;
  animation: ${panAnimation} 30s ease-in-out infinite;
`;

const StyleBackgroundImage = styled(BackgroundImage)`
  /* height: 100vh; */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed !important;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    &::before,
    &::after {
      ${mobileAnimation}
    }
  }
`;

export default StyleBackgroundImage;
