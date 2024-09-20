import React from "react";
import { ArrElement } from "../types";
import styled, { keyframes } from "styled-components";
import NationalProjects, { CaseStudy } from "./NationalProjects";
import { hardcodedSections } from "../data/tableofcontents";
import { InViewHookResponse } from "react-intersection-observer";

const StyledRoot = styled.div`
  --color-blue: #1d4483;
  --font-thin: 300;
  display: grid;
  align-items: center;
  padding-block-start: 6.793125rem;
  padding-block-end: 0;
  padding-inline: 2rem;
  min-height: 100vh;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
`;

const DiagLinesSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none"><path stroke="#1D4483" stroke-miterlimit="10" d="m1.31 1.03 33.75 33.76"/></svg>`;

const StyleLeftContent = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: scroll;
  --scrollbar-color: hsla(210.9, 90.56%, 27.9% / 0.4);
  --scrollbar-color: color(display-p3 0.1137 0.2667 0.5137 / 0.4);
  --scrollbar-width: 0.225625rem;

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

const StyleOuterBox = styled.div`
  --border-size: 2.11rem;
  --max-height: calc(18.125rem - var(--border-size));
  max-width: 18.125rem;
  max-height: var(--max-height);
  overflow: hidden;
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
  max-height: var(--max-height);
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
  display: grid;
  grid-column: 2 / -1;
`;

const panAnimation = keyframes`
  0%, 100% {
    background-position: left center;
  }
  50% {
    background-position: right center;
  }
`;

const StyledBackgroundFigure = styled.div<{ imageUrl: string }>`
  margin: 0;
  width: var(--square-size);
  height: var(--square-size);
  margin-right: 10px;
  overflow: hidden;
  mask-size: 100% 100%;
  clip-path: url("#clipPath");
  position: relative;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center; /* Ensure initial position */
  cursor: pointer;
`;

// Style the SectionItem
const SectionItem = styled.li`
  --square-size: 96.21px;
  display: grid;
  grid-template-columns: var(--square-size) 3fr;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  // Add hover state for the SectionItem
  &:hover {
    ${StyledBackgroundFigure} {
      animation: ${panAnimation} 5s linear infinite;
      animation-play-state: running;
    }
  }
`;

// Style the background image container

const SectionLink = styled.a`
  --font-thin: 100;
  text-decoration: none;
  color: var(--color-blue);
  font-size: 4.781875rem;
  font-weight: var(--font-thin);
  padding-left: 2rem;
  display: inline-block;
  transition: all 0.3s ease;
  &:hover {
    text-shadow:
      0 0 0.65px #000,
      0 0 0.65px #000;
    transform: scale(1.02);
  }
`;

const StyledNationalProjectsWrapper = styled.div`
  grid-column: 1 / -1;
`;

export default function TableOfContents({
  content,
  caseStudies,
  tableOfContentsRef,
}: {
  content: ArrElement<Queries.HomeMainQuery["allSanityHomesections"]["nodes"]>;
  caseStudies: CaseStudy[];
  tableOfContentsRef: InViewHookResponse;
}) {
  const { anchorId, sectionContent, sectionHeading } = content;
  return (
    <div ref={tableOfContentsRef.ref}>
      <StyledRoot id={anchorId ?? "tof"}>
        <TopSection>
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
                <StyledBackgroundFigure imageUrl={section.image.imageUrl} />
                <SectionLink href={`#${section.anchorId}`}>
                  {section.heading}
                </SectionLink>
              </SectionItem>
            ))}
          </SectionList>
        </TopSection>
        <StyledNationalProjectsWrapper>
          <NationalProjects caseStudies={caseStudies} />
        </StyledNationalProjectsWrapper>
      </StyledRoot>
    </div>
  );
}
