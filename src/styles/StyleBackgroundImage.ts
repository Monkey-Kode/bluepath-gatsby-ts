import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';
const StyleBackgroundImage = styled(BackgroundImage)`
  /* height: 100vh; */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed !important;

  @media only screen and (max-width: 800px) {
    &.plain {
      background-image: none !important;
      min-height: auto !important;
      padding-bottom: 0;
      padding-top: 0;
      &::before,
      &::after {
        background-color: var(--blue);
        background-image: none !important;
      }
    }
  }
`;

export default StyleBackgroundImage;
