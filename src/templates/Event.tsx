import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';
import { SanityEvent } from '../types';
import { GatsbyImage } from 'gatsby-plugin-image';

const StyledMain = styled.main`
  background: rgb(57, 105, 170);
  background: linear-gradient(
    159deg,
    rgba(42, 117, 185, 1) 0%,
    rgba(78, 155, 227, 1) 24%,
    rgba(0, 65, 131, 1) 60%,
    rgba(25, 65, 129, 1) 100%
  );
  color: black;
  margin-top: 100px;
  .event-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    > div {
      padding: 0 2em 2em 2em;
    }
  }
`;
function Event({
  data: { content },
  location,
}: {
  data: SanityEvent;
  location: string;
}) {
  return (
    <div className="event">
      <SEO title={content.description} />
      <Header location={location}></Header>
      <StyledMain>
        <div className="wrap event-content">
          <div>
            <GatsbyImage
              image={content?.image?.asset?.gatsbyImageData}
              alt="Event Image"
            />
          </div>
          <div>
            <PortableText value={content.content} />
          </div>
        </div>
      </StyledMain>
      <Footer location={location}></Footer>
    </div>
  );
}

export const query = graphql`
  query ($slug: String!) {
    content: sanityEvent(slug: { current: { eq: $slug } }) {
      content {
        _key
        style
        list
        _type
        _rawChildren
        __typename
        children {
          _key
          _type
          __typename
          marks
          text
        }
      }
      description
      eventAt
      image {
        asset {
          gatsbyImageData(width: 2000, layout: CONSTRAINED, placeholder: NONE)
        }
      }
      name
      slug {
        current
      }
    }
  }
`;

export default Event;
