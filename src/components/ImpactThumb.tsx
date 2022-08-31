import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useRef } from 'react';
import styled from 'styled-components';
import BlueBox from '../styles/BlueBox';
// import classNames from 'classnames';
// import scrollTo from 'gatsby-plugin-smoothscroll';
const StyledIcon = styled(GatsbyImage)`
  @media only screen and (max-width: 800px) {
    min-height: 60px;
    min-width: 60px;
  }
`;
const StyledWrap = styled.div``;
const StyledH2 = styled.h2`
  font-size: 1rem;
  line-height: 1.2;
  pointer-events: none;
`;
function ImpactThumb({
  className,
  firstClick,
  setFirstClick,
  activeBtn,
  setActiveBtn,
  id,
  content: { image, name, id: idInfo },
  setCurrentThumb,
  currentThumb,
}) {
  const ref = useRef();

  // console.log('id', id);
  // console.log('currentThumb', currentThumb);
  // // console.log('id', id);
  // console.log('activeBtn', activeBtn);
  // console.log('firstClick', firstClick);
  // console.log('ref', ref);
  return (
    <StyledWrap id={id} ref={ref} className={className}>
      <BlueBox
        onClick={function (e) {
          setActiveBtn(currentThumb);
          setCurrentThumb(idInfo);
          setFirstClick(false);
        }}
      >
        <StyledIcon image={image?.asset?.gatsbyImageData} />
        <StyledH2>{name}</StyledH2>
      </BlueBox>
    </StyledWrap>
  );
}

export default ImpactThumb;
