import { Link } from "gatsby";
import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import intersectionObserverOptions from "../utils/intersectionObserverOptions";
import splitByNewLines from "../utils/splitByNewLines";
import classNames from "classnames";
const StyledBox = styled.div`
  padding-inline: 2rem;
  max-width: 37.5rem;
  h2 {
    border: none;
    font-size: var(--big-heading-size);
    margin: 0;
    padding-block-start: 1.5rem;
    padding-block-end: 0;
    line-height: 0.9;
    @media only screen and (max-width: 800px) {
      font-size: 5.5vw;
      text-align: center;
    }
  }
  h3 {
    font-size: var(--small-heading-size);
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
    margin: 0;
    padding-block-end: 1.5rem;
    border-bottom: var(--border-bottom);
    @media only screen and (max-width: 800px) {
      font-size: 4vw;
      line-height: 1.5;
    }
  }
  a {
    display: block;
    text-align: center;
  }
  p {
    padding-inline: 0;
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
  sectionHeading: Queries.SanityPage["Heading"];
  sectionContent: Queries.SanityPage["content"];
  sectionContentCTAjumpId: Queries.SanityPage["sectionContentCTAjumpId"];
  sectionContentCTApageLink: Queries.SanityPage["sectionContentCTApageLink"];
  sectionContentCTAtext: Queries.SanityPage["sectionContentCTAtext"];
  sectionHeadingPosition: Queries.SanityPage["sectionHeadingPosition"];
  hidetitle: Queries.SanityPage["hidetitle"];
}) {
  const { ref, inView } = useInView(intersectionObserverOptions);
  let ctaLink = "";
  if (sectionContentCTAjumpId) {
    ctaLink = `#${sectionContentCTAjumpId}`;
  } else if (sectionContentCTApageLink) {
    ctaLink = `/${sectionContentCTApageLink?.slug?.current ?? ""}`;
  }
  const headingContent = sectionHeading?.toString().split(" ") ?? [];
  const heading = headingContent.length > 0 ? headingContent[0] : null;
  const subheading =
    headingContent.length > 1 ? headingContent.slice(1).join(" ") : null;

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
      <StyledBox className={classNames("box", sectionHeading)}>
        {!sectionHeadingPosition && !hidetitle && <h2>{heading}</h2>}
        {sectionHeadingPosition && !hidetitle && (
          <h2 className="hide-for-desktop">{heading}</h2>
        )}
        {!sectionHeadingPosition && !hidetitle && <h3>{subheading}</h3>}
        {sectionHeadingPosition && !hidetitle && (
          <h3 className="hide-for-desktop">{heading}</h3>
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
