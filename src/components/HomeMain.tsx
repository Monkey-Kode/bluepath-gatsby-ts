import React from "react";
import sortObject from "../utils/sortObject";
import PageContent from "./PageContent";
import { CaseStudy } from "./NationalProjects";
import { graphql, useStaticQuery } from "gatsby";
import StickyNationalProjects from "./StickyNationalProjects";
import { RefObject } from "react";

// Define the type for the footerRef prop
export type FooterRefProp = {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
};

// Define the props for the HomeMain component
interface HomeMainProps {
  footerRef: FooterRefProp;
}

function HomeMain({ footerRef }: HomeMainProps) {
  const {
    allSanityHomesections: { nodes },
    allSanityCasestudies: { nodes: caseStudiesNodes },
  }: Queries.HomeMainQuery = useStaticQuery(graphql`
    query HomeMain {
      allSanityHomesections {
        nodes {
          id
          anchorId
          order
          name
          sectionContent
          sectionContentCTAjumpId
          sectionContentCTApageLink {
            slug {
              current
            }
          }
          hidetitle
          sectionContentCTAtext
          sectionContentCTAurl
          sectionHeading
          sectionHeadingPosition
          boxLocation
          background {
            asset {
              gatsbyImageData(
                width: 2000
                placeholder: BLURRED
                layout: CONSTRAINED
              )
              id
            }
          }
          backgroundColor {
            hex
          }
          contentType {
            name
            id
          }
          sectionHeading
        }
      }
      allSanityCasestudies {
        nodes {
          id
          financing
          entity
          content
          address
          image {
            asset {
              gatsbyImageData(
                width: 300
                layout: CONSTRAINED
                placeholder: BLURRED
              )
              metadata {
                lqip
              }
            }
          }
          technologies
          title
          size
          location {
            lat
            lng
            alt
            _key
          }
        }
      }
    }
  `);
  const sections = sortObject(
    nodes,
  ) as Queries.HomeMainQuery["allSanityHomesections"]["nodes"];

  const caseStudies = sortObject(caseStudiesNodes) as CaseStudy[];

  return (
    <main>
      {sections.map((content) => {
        return content ? (
          <PageContent
            key={content.id}
            content={content}
            caseStudies={caseStudies}
          />
        ) : null;
      })}
      <StickyNationalProjects caseStudies={caseStudies} footerRef={footerRef} />
    </main>
  );
}

export default HomeMain;
