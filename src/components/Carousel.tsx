import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { convertToBgImage } from 'gbimage-bridge';
import sortObject from '../utils/sortObject';
import CarouselSlide from './CarouselSlide';
import { getImage } from 'gatsby-plugin-image';
import { ArrElement } from '../types';
const StyledBackgroundImage = styled(BackgroundImage)`
  height: 100%;
  background-attachment: fixed !important;
  &:nth-child(odd) {
    justify-content: flex-start;
  }
  &:nth-child(even) {
    justify-content: flex-end;
  }
  /* div:not(.Enabling_wrapper) {
    justify-content: flex-end !important;
  } */

  @media only screen and (max-width: 800px) {
    div[id*='_carousel'] {
      padding: 1rem;
    }
  }
`;

function Carousel({
  content,
}: {
  content: ArrElement<Queries.HomeMainQuery['allSanityHomesections']['nodes']>;
}) {
  const { allSanityCarousel }: Queries.CarouselQuery = useStaticQuery(graphql`
    query Carousel {
      allSanityCarousel {
        nodes {
          image {
            asset {
              gatsbyImageData(
                width: 2000
                layout: CONSTRAINED
                fit: FILLMAX
                placeholder: BLURRED
              )
            }
          }
          _key
          _id
          content
          firstLink
          firstLinkId
          firstLinkURL
          secondLink
          secondLinkId
          secondLinkURL
          heading
          order
          boxLocation
        }
      }
    }
  `);

  const slides = sortObject(
    allSanityCarousel.nodes
  ) as Queries.CarouselQuery['allSanityCarousel']['nodes'];
  let boxAlign = 'left';

  return (
    <div id={`${content.anchorId}`}>
      {slides &&
        slides.map((content) => {
          if (content.boxLocation) {
            boxAlign = content.boxLocation;
          }
          const image = content?.image?.asset?.gatsbyImageData
            ? getImage(content.image.asset.gatsbyImageData)
            : null;
          const bgImage = image ? convertToBgImage(image) : null;

          return (
            <StyledBackgroundImage key={`${content._id}_carousel`} {...bgImage}>
              <div className={boxAlign}>
                <CarouselSlide content={content} />
              </div>
            </StyledBackgroundImage>
          );
        })}
    </div>
  );
}

export default Carousel;
