import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";
const StyleBackgroundImage = styled(BackgroundImage)`
  /* height: 100vh; */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed !important;
  display: flex;
  align-items: center;
`;

export default StyleBackgroundImage;
