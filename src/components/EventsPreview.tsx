import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { ArrElement } from '../types';
const StyledEventsPreview = styled.div`
  margin-top: 2em;
  .card {
    display: flex;
    align-items: center;
    /* border-top: 3px solid var(--orange); */
    border-top: 1px solid var(--white);
    /* border-bottom: 1px solid var(--white); */
    /* border-radius: 0.5rem; */
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 400;
  }
  .button {
    background-color: var(--orange);
    border: none;
    padding: 0.5rem 1.3rem;
    color: black;
    display: inline-block;
  }
  small {
    /* color: var(--gray2); */
    color: var(--white);
    padding-bottom: 0.5rem;
    display: block;
    font-style: italic;
  }
`;

const EventsPreview = ({
  sanityEvent,
}: {
  sanityEvent: ArrElement<Queries.AllEventsQuery['allSanityEvent']['nodes']>;
}) => {
  return (
    <StyledEventsPreview>
      <div className="card">
        <div className="card-image">
          <figure>
            {sanityEvent?.image?.asset?.gatsbyImage && (
              <GatsbyImage
                image={sanityEvent.image.asset.gatsbyImage}
                alt="Event Image"
              />
            )}
          </figure>
        </div>
        <div className="card-content">
          <small>
            {new Date(
              String(sanityEvent?.eventAt?.split('-'))
            ).toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </small>
          <h2>{sanityEvent?.name}</h2>
          <p>{sanityEvent.description}</p>
          {sanityEvent.slug?.current && (
            <a className="button" href={`/event/${sanityEvent.slug?.current}`}>
              View Event Info
            </a>
          )}
        </div>
      </div>
    </StyledEventsPreview>
  );
};
export default EventsPreview;
