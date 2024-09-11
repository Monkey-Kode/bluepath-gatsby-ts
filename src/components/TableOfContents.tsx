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
  padding: 20px;
`;

const StyleLeftContent = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  max-width: 18.125rem;
  max-height: 18.125rem;
  overflow-y: scroll;
`;

const Heading = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: var(--color-blue);
  text-align: center;
  font-weight: 300;
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
`;

const SectionImage = styled.img`
  margin-bottom: 0px;
  height: 100%;
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
      <StyleLeftContent>
        <StyledBox>
          <Heading>{sectionHeading}</Heading>
          <Content>{sectionContent}</Content>
        </StyledBox>
      </StyleLeftContent>
      <SectionList>
        {hardcodedSections.map((section, index) => (
          <SectionItem key={index}>
            <StyledFigure>
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id="clipPath">
                    <path d="M94.96 83.83V11.3199L84.1499 0.52002H11.6099L0.75 11.37V83.78L11.7002 94.73H84.0601L94.96 83.83Z" />
                  </clipPath>
                </defs>
              </svg>
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
