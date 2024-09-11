import React from "react";
import { ArrElement } from "../types";
import fundingImage from "../images/funding-image.jpg";
import partneringImage from "../images/partnering-image.jpg";
import transformingImage from "../images/transforming-image.jpg";
import solvingImge from "../images/solving-image.jpg";
import styled from "styled-components";

const StyledRoot = styled.div`
  --color-blue: #1d4483;
  display: flex;
  align-items: center;
  padding: 20px;
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
  font-weight: 300;
`;

const SectionList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
`;

const SectionImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const SectionLink = styled.a`
  text-decoration: none;
  color: var(--color-blue);
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

export default function TableOfContents({
  content,
}: {
  content: ArrElement<Queries.HomeMainQuery["allSanityHomesections"]["nodes"]>;
}) {
  // Extract the necessary data from the content prop
  const { anchorId, sectionContent, sectionHeading } = content;

  // Hard-coded sections
  const hardcodedSections = [
    {
      heading: "FUNDING",
      anchorId: "funding",
      imageUrl: fundingImage,
    },
    {
      heading: "SOLVING",
      anchorId: "solving",
      imageUrl: solvingImge,
    },
    {
      heading: "PARTNERING",
      anchorId: "partnering",
      imageUrl: partneringImage,
    },
    {
      heading: "TRANSFORMING",
      anchorId: "transforming",
      imageUrl: transformingImage,
    },
  ];

  return (
    <StyledRoot id={anchorId ?? "tof"}>
      <StyledBox>
        <Heading>{sectionHeading}</Heading>
        <Content>{sectionContent}</Content>
      </StyledBox>
      <SectionList>
        {hardcodedSections.map((section, index) => (
          <SectionItem key={index}>
            <SectionImage src={section.imageUrl} alt={section.heading} />
            <SectionLink href={`#${section.anchorId}`}>
              {section.heading}
            </SectionLink>
          </SectionItem>
        ))}
      </SectionList>
    </StyledRoot>
  );
}
