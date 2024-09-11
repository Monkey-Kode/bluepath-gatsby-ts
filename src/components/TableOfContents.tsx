import React from "react";
import { ArrElement } from "../types";
import fundingImage from "../images/funding-image.jpg";
import partneringImage from "../images/partnering-image.jpg";
import transformingImage from "../images/transforming-image.jpg";
import solvingImge from "../images/solving-image.jpg";
import styled from "styled-components";

const hardcodedSections = [
  {
    heading: "FUNDING",
    anchorId: "funding",
    image: {
      imageUrl: fundingImage,
      alt: "Funding",
      width: 215,
      height: 141,
    },
  },
  {
    heading: "SOLVING",
    anchorId: "solving",
    image: {
      imageUrl: solvingImge,
      alt: "Solving",
      width: 269,
      height: 180,
    },
  },
  {
    heading: "PARTNERING",
    anchorId: "partnering",
    image: {
      imageUrl: partneringImage,
      alt: "Partnering",
      width: 274,
      height: 154,
    },
  },
  {
    heading: "TRANSFORMING",
    anchorId: "transforming",
    image: {
      imageUrl: transformingImage,
      alt: "Transforming",
      width: 241,
      height: 161,
    },
  },
];

const StyledRoot = styled.div`
  --color-blue: #1d4483;
  --font-thin: 300;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
`;

const DiagLinesSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none"><path stroke="#1D4483" stroke-miterlimit="10" d="m1.31 1.03 33.75 33.76"/></svg>`;

const StyleLeftContent = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const StyleOuterBox = styled.div`
  --border-size: 2.11rem;
  --max-height: calc(18.125rem - var(--border-size));
  max-width: 18.125rem;
  max-height: var(--max-height);
  overflow-y: auto;
  position: relative;
  // Bottom-left corner
  &::before {
    content: url("data:image/svg+xml;base64,${btoa(DiagLinesSvg)}");
    position: absolute;
    bottom: 0;
    left: 0;
    width: 36px;
    height: 36px;
    transform: rotate(0deg);
  }

  // Bottom-right corner
  &::after {
    content: url("data:image/svg+xml;base64,${btoa(DiagLinesSvg)}");
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36px;
    height: 36px;
    transform: rotate(-90deg);
  }
`;

const StyledBox = styled.div`
  max-width: 18.125rem;
  max-height: var(--max-height);
  overflow-y: auto;
  position: relative;
  padding-inline: var(--border-size);
  // Top-left corner
  &::before {
    content: url("data:image/svg+xml;base64,${btoa(DiagLinesSvg)}");
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 36px;
    transform: rotate(90deg);
  }

  // Top-right corner
  &::after {
    content: url("data:image/svg+xml;base64,${btoa(DiagLinesSvg)}");
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    transform: rotate(180deg);
  }
`;

const ScrollableContent = styled.div`
  --scrollbar-color: hsla(210.9, 90.56%, 27.9% / 0.4);
  --scrollbar-color: color(display-p3 0.1137 0.2667 0.5137 / 0.4);
  --scrollbar-width: 0.225625rem;
  max-height: var(--max-height);
  overflow-y: scroll;

  // Custom scrollbar styles
  &::-webkit-scrollbar {
    width: var(--scrollbar-width); /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* background of the scrollbar track */
    border: solid var(--scrollbar-width) transparent; /* to ensure the background doesn’t bleed */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color); /* color of the scrollbar thumb */
    border: solid var(--scrollbar-width) transparent; /* add space around thumb */
    border-radius: 0;
  }

  // Customize the scrollbar for Firefox
  scrollbar-color: var(--scrollbar-color) transparent; /* thumb and track color */
  scrollbar-width: thin; /* width of the scrollbar */
`;

const Heading = styled.h2`
  font-size: 1.670625rem;
  margin-bottom: 20px;
  color: var(--color-blue);
  text-align: center;
  font-weight: 300;
  padding-top: 1rem;
  padding-inline: 0.5rem;
`;

const Content = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: var(--color-blue);
  font-weight: var(--font-thin);
`;

const SectionList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionItem = styled.li`
  --square-size: 96.21px;
  display: grid;
  grid-template-columns: var(--square-size) 3fr;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
`;

const StyledFigure = styled.figure`
  margin: 0;
  width: var(--square-size);
  height: var(--square-size);
  margin-right: 10px;
  overflow: hidden;
  mask-size: 100% 100%;
  clip-path: url("#clipPath");
  position: relative;
`;

const SectionImage = styled.img`
  margin-bottom: 0px;
  height: 100%;
  object-fit: cover;
`;

const SectionLink = styled.a`
  text-decoration: none;
  color: var(--color-blue);
  font-size: 4.781875rem;
  font-weight: var(--font-thin);
  padding-left: 2rem;
`;

export default function TableOfContents({
  content,
}: {
  content: ArrElement<Queries.HomeMainQuery["allSanityHomesections"]["nodes"]>;
}) {
  const { anchorId, sectionContent, sectionHeading } = content;
  return (
    <StyledRoot id={anchorId ?? "tof"}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="clipPath">
            <path d="M94.96 83.83V11.32L84.15.52H11.61L.75 11.37v72.41L11.7 94.73h72.36l10.9-10.9Z" />
          </clipPath>
        </defs>
      </svg>
      <StyleLeftContent>
        <StyleOuterBox>
          <StyledBox>
            <ScrollableContent>
              <Heading>{sectionHeading}</Heading>
              <Content>{sectionContent}</Content>
            </ScrollableContent>
          </StyledBox>
        </StyleOuterBox>
      </StyleLeftContent>
      <SectionList>
        {hardcodedSections.map((section, index) => (
          <SectionItem key={index}>
            <StyledFigure>
              <SectionImage
                src={section.image.imageUrl}
                alt={section.image.alt}
                width={section.image.width}
                height={section.image.height}
              />
            </StyledFigure>
            <SectionLink href={`#${section.anchorId}`}>
              {section.heading}
            </SectionLink>
          </SectionItem>
        ))}
      </SectionList>
    </StyledRoot>
  );
}
