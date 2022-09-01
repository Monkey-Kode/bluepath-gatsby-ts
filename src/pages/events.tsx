import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import EventsPreview from '../components/EventsPreview';

const StyledEvents = styled.div`
  background: rgb(57, 105, 170);
  background: linear-gradient(
    159deg,
    rgba(42, 117, 185, 1) 0%,
    rgba(78, 155, 227, 1) 24%,
    rgba(0, 65, 131, 1) 60%,
    rgba(25, 65, 129, 1) 100%
  );
  margin-top: 100px;
  .wrap {
    padding: 3em 0;
    max-width: 1400px;
  }
`;
const Events = ({
  data: {
    allSanityEvent: { nodes },
  },
  location,
}: PageProps<Queries.AllEventsQuery>) => {
  //   console.log('data', data);

  return (
    <div>
      <Header location={location} />
      <StyledEvents>
        <div className="wrap">
          <h1>Events</h1>
          {nodes.map((sanityEvent) => {
            const { id } = sanityEvent;
            return <EventsPreview sanityEvent={sanityEvent} key={id} />;
          })}
        </div>
      </StyledEvents>
      <Footer location={location} />
    </div>
  );
};
export const query = graphql`
  query AllEvents {
    allSanityEvent {
      nodes {
        name
        image {
          asset {
            gatsbyImage(width: 300, placeholder: NONE)
          }
        }
        slug {
          current
        }
        id
        eventAt
        description
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
      }
    }
  }
`;
export default Events;
