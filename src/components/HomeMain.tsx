import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import sortObject from '../utils/sortObject';
import PageContent from './PageContent';

function HomeMain() {
  const {
    sections: { nodes },
  } = useStaticQuery(graphql`
    query {
      sections: allSanityHomesections {
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
    }
  `);
  const sections = sortObject(nodes);
  //   console.log(sections);
  return (
    <main>
      {sections.map((content) => {
        return <PageContent key={content.id} content={content} />;
      })}
    </main>
  );
}

export default HomeMain;
