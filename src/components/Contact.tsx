import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
// import styled from 'styled-components';
import StyleBackgroundImage from '../styles/StyleBackgroundImage';
import useRichPageData from '../utils/useRichPageData';
import { ContactBody } from './ContactBody';
import SEO from './SEO';
import { convertToBgImage } from 'gbimage-bridge';

function Contact({ sanityPage }: { sanityPage: Queries.SanityPage }) {
  const {
    _id,
    Heading,
    background,
    mobilebackground,
    backgroundColor,
    content,
    description,
    id,
    name,
    seotitle,
    boxLocation,
    richcontent,
  } = sanityPage;
  console.log(content);

  let sectionBg = background;
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
  const image = sectionBg?.asset?.gatsbyImageData
    ? getImage(sectionBg?.asset?.gatsbyImageData)
    : null;
  const bgImage = image ? convertToBgImage(image) : null;

  return (
    <>
      <SEO title={String(seotitle)} description={String(description)} />
      <div className={boxAlign}>
        {background?.asset?.gatsbyImageData && (
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
          <section id={String(id)} style={{ backgroundColor: String(bgColor) }}>
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
