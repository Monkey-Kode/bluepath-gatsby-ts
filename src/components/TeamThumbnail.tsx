import { motion } from 'framer-motion';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import fluidType from '../utils/fluidTypography';
import scrollTo from 'gatsby-plugin-smoothscroll';
const StyledThumb = styled.a`
  background: var(--blue);
  display: grid;
  grid-template-rows: 150px repeat(2, 0.1fr);
  height: 100%;
  padding-top: 0;
  margin: 0 auto;
  max-width: 160px;
  /* max-height: 148px; */
  width: 160px;
  align-self: stretch;
  .gatsby-image-wrapper {
    /* min-height: 300px; */

    border-bottom: var(--border-bottom);
    img {
      object-position: top center !important;
    }
    @media only screen and (max-width: 800px) {
      /* min-height: 500px; */
    }
  }
  h3 {
    ${(props) => fluidType('375px', '1400px', '11px', '16px')}
    padding:0rem 1rem;
  }
  h3,
  p {
    color: white;
    text-align: center;
    text-transform: uppercase;
    margin: 0;
  }
  p {
    text-transform: uppercase;
    font-size: clamp(0.5rem, 0.7vw, 0.8rem);
    font-weight: 100;
    padding: 0.5rem 0.5rem 0;
    @media only screen and (max-width: 800px) {
      font-weight: 400;
    }
  }
  .content {
    height: 100%;
    padding: 1rem 0.5rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;
function TeamThumbnail({ id, name, role, image, setcurrentSlide }) {
  return (
    <motion.div>
      <StyledThumb
        key={id}
        href={`#${id}`}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          scrollTo('body');
          setcurrentSlide(id);
        }}
      >
        <GatsbyImage image={image.asset.gatsbyImageData} />

        <div className="content">
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
      </StyledThumb>
    </motion.div>
  );
}

export default TeamThumbnail;
