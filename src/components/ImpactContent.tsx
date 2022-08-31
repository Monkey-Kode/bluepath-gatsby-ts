import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import formatNumber from '../utils/formatNumber';
const StyledContentBoxes = styled.div`
  background: var(--blue);
  padding: 1rem;
  transition: opacity 0.4s ease-out;
  margin: 3rem auto;
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    max-width: 80vw;

    button {
      flex: 1 50%;
      max-width: calc(50% - 0.5em);
      margin-bottom: 1em;
      p {
        font-size: 3.5vw;
      }
    }

    div:first-child {
      p {
        text-align: center;
      }
    }
  }
  @media only screen and (min-width: 801px) {
    display: grid;
    grid-auto-flow: column;
    max-width: 800px;
    grid-gap: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  h3 {
    margin: 0;
    font-weight: 100;
  }
  p {
    margin: 0;
    line-height: 1.3;
    font-weight: 100;
  }
  @media only screen and (max-width: 800px) {
    > div {
      padding: 1rem;
    }
  }
`;

function boxHeading(heading) {
  if (heading && Number(heading)) {
    return <h3>{formatNumber(heading)}</h3>;
  } else if (heading) {
    return <h3>{heading}</h3>;
  }
  return null;
}
function ImpactContent({
  content: {
    content1,
    contentheading1,
    content2,
    contentheading2,
    content3,
    contentheading3,
    content4,
    contentheading4,
  },
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: '110%',
      }}
      animate={{
        opacity: 1,
        y: '0%',
      }}
      exit={{
        opacity: 0,
      }}
    >
      <StyledContentBoxes id="impact-boxes">
        <div css={{ textTransform: 'capitalize' }}>
          {boxHeading(contentheading1)}
          {content1 && (
            <p css={{ fontWeight: '800 !important', textAlign: 'right' }}>
              {content1}
            </p>
          )}
        </div>
        <div>
          {boxHeading(contentheading2)}
          {content2 && <p>{content2}</p>}
        </div>
        <div>
          {boxHeading(contentheading3)}
          {content2 && <p>{content3}</p>}
        </div>
        <div>
          {boxHeading(contentheading4)}
          {content4 && <p>{content4}</p>}
        </div>
      </StyledContentBoxes>
    </motion.div>
  );
}

export default ImpactContent;
