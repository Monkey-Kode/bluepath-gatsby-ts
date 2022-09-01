import { Link } from 'gatsby';
import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import intersectionObserverOptions from '../utils/intersectionObserverOptions';
import splitByNewLines from '../utils/splitByNewLines';
import classNames from 'classnames';
const StyledBox = styled.div`
  padding: 0 0 1rem;
  h2 {
    font-size: var(--big-heading-size);
    @media only screen and (max-width: 800px) {
      font-size: 5.5vw;
      text-align: center;
      line-height: 1.5;
    }
  }
  a {
    display: block;
    text-align: center;
  }
`;
function ContentBox({
  sectionHeading,
  sectionContent,
  sectionContentCTAjumpId,
  sectionContentCTApageLink,
  sectionContentCTAtext,
  sectionHeadingPosition,
  hidetitle,
}: {
  sectionHeading: Queries.SanityPage['Heading'];
  sectionContent: Queries.SanityPage['content'];
  sectionContentCTAjumpId: Queries.SanityPage['sectionContentCTAjumpId'];
  sectionContentCTApageLink: Queries.SanityPage['sectionContentCTApageLink'];
  sectionContentCTAtext: Queries.SanityPage['sectionContentCTAtext'];
  sectionHeadingPosition: Queries.SanityPage['sectionHeadingPosition'];
  hidetitle: Queries.SanityPage['hidetitle'];
}) {
  const { ref, inView } = useInView(intersectionObserverOptions);
  let ctaLink = '';
  if (sectionContentCTAjumpId) {
    ctaLink = `#${sectionContentCTAjumpId}`;
  } else if (sectionContentCTApageLink) {
    ctaLink = `/${sectionContentCTApageLink?.slug?.current ?? ''}`;
  }
  // console.log('hide title ', hidetitle);
  // console.log(`content box '${sectionHeading}' inview`, inView);
  return (
    <div
      ref={ref}
      className={classNames({
        active: inView,
        inactive: !inView,
      })}
    >
      <StyledBox className={classNames('box', sectionHeading)}>
        {!sectionHeadingPosition && !hidetitle && <h2>{sectionHeading}</h2>}
        {sectionHeadingPosition && !hidetitle && (
          <h2 className="hide-for-desktop">{sectionHeading}</h2>
        )}
        <div className="wrap">
          <p>{splitByNewLines(String(sectionContent))}</p>

          {ctaLink && sectionContentCTAtext && sectionContentCTAjumpId && (
            <a
              href={ctaLink}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(ctaLink);
              }}
            >
              {sectionContentCTAtext}
            </a>
          )}
          {ctaLink && sectionContentCTAtext && !sectionContentCTAjumpId && (
            <Link to={ctaLink}>{sectionContentCTAtext}</Link>
          )}
        </div>
      </StyledBox>
    </div>
  );
}

export default ContentBox;
