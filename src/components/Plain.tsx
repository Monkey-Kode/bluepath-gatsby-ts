import React from "react";
import ContentBox from "./ContentBox";
import StyleBackgroundImage from "../styles/StyleBackgroundImage";
import { useInView } from "react-intersection-observer";
import intersectionObserverOptions from "../utils/intersectionObserverOptions";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { ArrElement } from "../types";
import styled from "styled-components";

const StyledContent = styled.div`
  @media only screen and (max-width: 800px) {
    display: block;

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

function Plain({
  content,
}: {
  content: ArrElement<Queries.HomeMainQuery["allSanityHomesections"]["nodes"]>;
}) {
  // console.log(JSON.stringify(content, null, 2));
  const {
    id,
    anchorId,
    name,
    sectionContent,
    sectionContentCTAjumpId,
    sectionContentCTApageLink,
    sectionContentCTAtext,
    sectionHeadingPosition,
    background,
    backgroundColor,
    sectionHeading,
    boxLocation,
    hidetitle,
  } = content;
  const { ref } = useInView(intersectionObserverOptions);
  // console.log('inview no bg section', inView);
  // console.log(boxLocation);

  const bgColor = backgroundColor ? backgroundColor.hex : "#fff";
  let boxAlign = boxLocation || "left";

  const image = background?.asset?.gatsbyImageData
    ? getImage(background?.asset?.gatsbyImageData)
    : null;
  const bgImage = image ? convertToBgImage(image) : undefined;

  return background ? (
    <StyledContent className={boxAlign}>
      {background?.asset?.gatsbyImageData && (
        <GatsbyImage
          id=""
          alt="Background scenery"
          className={`hide-for-desktop ${anchorId || "section"}`}
          image={background.asset.gatsbyImageData}
          style={{ marginBottom: "0", display: "block" }}
        />
      )}
      {/* @ts-ignore */}
      <StyleBackgroundImage
        id={anchorId}
        Tag="section"
        backgroundColor={bgColor}
        className={`plain ${name}`}
        {...(bgImage || {})}
      >
        <div className={`${boxAlign} ${name}`}>
          <ContentBox
            hidetitle={hidetitle}
            sectionContent={sectionContent}
            sectionHeading={sectionHeading}
            sectionContentCTAjumpId={sectionContentCTAjumpId}
            sectionContentCTApageLink={
              sectionContentCTApageLink as Queries.SanityPage["sectionContentCTApageLink"]
            }
            sectionHeadingPosition={sectionHeadingPosition}
            sectionContentCTAtext={sectionContentCTAtext}
          />
        </div>
      </StyleBackgroundImage>
    </StyledContent>
  ) : (
    <section
      className={name ?? "section"}
      ref={ref}
      id={anchorId ?? `section-${id}`}
      style={{ backgroundColor: String(bgColor) }}
    >
      <div className={boxAlign}>
        <ContentBox
          hidetitle={hidetitle}
          sectionContent={sectionContent}
          sectionHeading={sectionHeading}
          sectionContentCTAjumpId={sectionContentCTAjumpId}
          sectionContentCTApageLink={
            sectionContentCTApageLink as Queries.SanityPage["sectionContentCTApageLink"]
          }
          sectionHeadingPosition={sectionHeadingPosition}
          sectionContentCTAtext={sectionContentCTAtext}
        ></ContentBox>
      </div>
    </section>
  );
}

export default Plain;
