import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
// import styled from 'styled-components';
import StyleBackgroundImage from '../styles/StyleBackgroundImage';
import useRichPageData from '../utils/useRichPageData';
import { ContactBody } from './ContactBody';
import SEO from './SEO';
import { convertToBgImage } from 'gbimage-bridge';
import { SanityPage } from '../types';

function Contact({
  content: {
    _id,
    Heading,
    contentType,
    background,
    mobilebackground,
    backgroundColor,
    content,
    description,
    hidetitle,
    id,
    name,
    sectionContentCTAjumpId,
    sectionContentCTApageLink,
    sectionContentCTAtext,
    sectionContentCTAurl,
    sectionHeadingPosition,
    seotitle,
    slug,
    boxLocation,
    richcontent,
  },
}: SanityPage) {
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
  const { remoteRichContent } = useRichPageData(_id);
  const bgColor = backgroundColor ? backgroundColor.hex : '#fff';

  let boxAlign = 'left';
  if (boxLocation) {
    boxAlign = boxLocation;
  }
  const image = getImage(sectionBg?.asset?.gatsbyImageData);
  const bgImage = convertToBgImage(image);

  return (
    <>
      <SEO title={seotitle} description={description} />
      <div className={boxAlign}>
        {background && (
          <GatsbyImage
            className="hide-for-desktop alignfull image-atop"
            image={background?.asset?.gatsbyImageData}
            alt="Background Image"
          />
        )}
        {sectionBg ? (
          <StyleBackgroundImage
            id={id}
            Tag="section"
            {...bgImage}
            backgroundColor={bgColor}
          >
            <ContactBody
              id={id}
              content={content}
              richcontent={richcontent}
              remoteContent={remoteRichContent}
              heading={Heading}
              name={name}
            />
          </StyleBackgroundImage>
        ) : (
          <section id={String(id)} style={{ backgroundColor: bgColor }}>
            <ContactBody
              id={id}
              content={content}
              richcontent={richcontent}
              remoteContent={remoteRichContent}
              heading={Heading}
              name={name}
            />
          </section>
        )}
      </div>
    </>
  );
}

export default Contact;
