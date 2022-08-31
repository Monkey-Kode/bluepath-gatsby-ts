import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import StyleBackgroundImage from '../styles/StyleBackgroundImage';
import ContentBox from './ContentBox';
import { convertToBgImage } from 'gbimage-bridge';

// import classNames from 'classnames';
const StyledContent = styled.div`
  @media only screen and (max-width: 800px) {
    display: block;
    margin-top: 119px;
    section {
      background-color: var(--blue);
      padding: 0;
      &::after,
      &::before {
        background: none !important;
      }
    }
  }
`;
function IndividualPageContent({
  content: {
    contentType,
    Heading = '',
    sectionHeadingPosition,
    description,
    hidetitle,
    content = '',
    id,
    backgroundColor,
    background,
    mobilebackground,
    name,
    sectionContentCTAtext,
    sectionContentCTAjumpId,
    sectionContentCTApageLink,
    sectionContentCTAurl,
    seotitle,
    slug,
    boxLocation,
  },
}) {
  // console.log(contentType);
  // console.log('box location', boxLocation);
  let sectionBg = background || '';
  if (typeof window !== 'undefined') {
    let mql = window.matchMedia('(max-width: 600px)');
    if (!mql.matches && background) {
      sectionBg = background;
    } else if (mql.matches && mobilebackground) {
      sectionBg = mobilebackground;
    } else {
      sectionBg = background;
    }
  }

  const bgColor = backgroundColor ? backgroundColor.hex : '#fff';
  let boxAlign = 'left';
  if (boxLocation) {
    boxAlign = boxLocation;
  }
  const image = getImage(sectionBg?.asset?.gatsbyImageData);
  const bgImage = convertToBgImage(image);
  if (background) {
    return (
      <StyledContent className={boxAlign}>
        <GatsbyImage
          id=""
          alt="Background scenery"
          className={`hide-for-desktop ${id || 'section'}`}
          image={background?.asset?.gatsbyImageData?.src}
          style={{ marginBottom: '0', display: 'block' }}
        />
        <StyleBackgroundImage
          id={id}
          Tag="section"
          backgroundColor={bgColor}
          className="individual-page"
          {...bgImage}
        >
          <ContentBox
            hidetitle={hidetitle}
            sectionContent={content}
            sectionHeading={Heading}
            sectionContentCTAjumpId={sectionContentCTAjumpId}
            sectionContentCTApageLink={sectionContentCTApageLink}
            sectionHeadingPosition={sectionHeadingPosition}
            sectionContentCTAtext={sectionContentCTAtext}
          ></ContentBox>
        </StyleBackgroundImage>
      </StyledContent>
    );
  }
  return <section id={id}></section>;
}

export default IndividualPageContent;
