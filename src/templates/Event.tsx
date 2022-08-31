import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { PortableText } from '@portabletext/react';

const StyledMain = styled.main`
  margin-top: 119px;
  .event-content {
    margin: 0 auto;
  }
`;
function Event({ data: { content }, location }) {
  return (
    <div className="event">
      <SEO title={content.description} />
      <Header location={location}></Header>
      <StyledMain>
        <div className="wrap">
          <PortableText block={content.content} />
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
        children {
          text
        }
      }
      description
      eventAt
      image {
        asset {
          gatsbyImageData(width: 2000, layout: CONSTRAINED)
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
