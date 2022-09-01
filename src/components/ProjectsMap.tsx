import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Map from './Map';

const ProjectsMap = () => {
  const { allSanityCasestudies }: Queries.ProjectsMapQuery =
    useStaticQuery(graphql`
      query ProjectsMap {
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

  return <Map origins={allSanityCasestudies.nodes} />;
};

export default ProjectsMap;
