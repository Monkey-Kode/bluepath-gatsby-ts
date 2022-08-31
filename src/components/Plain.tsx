import React from 'react';
import ContentBox from './ContentBox';
import StyleBackgroundImage from '../styles/StyleBackgroundImage';
import { useInView } from 'react-intersection-observer';
import intersectionObserverOptions from '../utils/intersectionObserverOptions';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';

function Plain({
  content: {
    id,
    anchorId,
    name,
    sectionContent,
    sectionContentCTAjumpId,
    sectionContentCTApageLink,
    sectionContentCTAtext,
    sectionHeadingPosition,
    background,
    mobilebackground,
    backgroundColor,
    sectionHeading,
    boxLocation,
    hidetitle,
  },
}) {
  const { ref } = useInView(intersectionObserverOptions);
  // console.log('inview no bg section', inView);
  // console.log(boxLocation);

  const bgColor = backgroundColor ? backgroundColor.hex : '#fff';
  let boxAlign = boxLocation || 'left';

  const image = getImage(background?.asset?.gatsbyImageData);
  const bgImage = convertToBgImage(image);

  if (background) {
    return (
      <>
        <GatsbyImage
          id=""
          alt="Background scenery"
          className={`hide-for-desktop ${anchorId || 'section'}`}
          image={background?.asset?.gatsbyImageData.src}
          style={{ marginBottom: '0', display: 'block' }}
        />
        <StyleBackgroundImage
          id={anchorId}
          Tag="section"
          backgroundColor={bgColor}
          className="plain"
          {...bgImage}
        >
          <div className={`${boxAlign} ${name}`}>
            <ContentBox
              hidetitle={hidetitle}
              sectionContent={sectionContent}
              sectionHeading={sectionHeading}
              sectionContentCTAjumpId={sectionContentCTAjumpId}
              sectionContentCTApageLink={sectionContentCTApageLink}
              sectionHeadingPosition={sectionHeadingPosition}
              sectionContentCTAtext={sectionContentCTAtext}
            ></ContentBox>
          </div>
        </StyleBackgroundImage>
      </>
    );
  } else {
    return (
      <section
        className={name}
        ref={ref}
        id={id}
        style={{ backgroundColor: bgColor }}
      >
        <div className={boxAlign}>
          <ContentBox
            hidetitle={hidetitle}
            sectionContent={sectionContent}
            sectionHeading={sectionHeading}
            sectionContentCTAjumpId={sectionContentCTAjumpId}
            sectionContentCTApageLink={sectionContentCTApageLink}
            sectionHeadingPosition={sectionHeadingPosition}
            sectionContentCTAtext={sectionContentCTAtext}
          ></ContentBox>
        </div>
      </section>
    );
  }
}

export default Plain;
