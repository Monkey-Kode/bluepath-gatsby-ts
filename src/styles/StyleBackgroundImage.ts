import BackgroundImage from "gatsby-background-image";
import styled, { keyframes, css } from "styled-components";
const StyleBackgroundImage = styled(BackgroundImage)`
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed !important;
  display: flex;
  align-items: center;
  background-size: cover;
`;

export default StyleBackgroundImage;
