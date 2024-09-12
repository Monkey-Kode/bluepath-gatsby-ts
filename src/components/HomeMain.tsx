import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import sortObject from "../utils/sortObject";
import PageContent from "./PageContent";

function HomeMain() {
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
  //   console.log(sections);

  const caseStudies = sortObject(
    caseStudiesNodes,
  ) as Queries.HomeMainQuery["allSanityCasestudies"]["nodes"];

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
    </main>
  );
}

export default HomeMain;
