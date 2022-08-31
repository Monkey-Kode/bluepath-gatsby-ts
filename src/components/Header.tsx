import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Logo from './Logo';
import Nav from './Nav';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: -1px 4px 13px 0px rgb(0 0 0 / 20%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 1);
  transition: background-color 0.24s ease-in-out;
  z-index: 10000;
  padding-left: 7%;
  padding-right: 7%;
  @media (min-width: 800px) {
    .wrap {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row nowrap;

  > * {
    flex: 1 auto;
    max-width: 168px;
  }

  @media (max-width: 799px) {
    padding: 1rem 2rem 1rem 1.5rem;
    justify-content: flex-start;
    text-align: left;
  }
  @media (max-width: 375px) {
    padding: 1rem 0;
    a {
      max-width: 168px;
    }
  }
`;
function Header({ location }) {
  const { settings } = useStaticQuery(graphql`
    query Header {
      settings: sanitySiteSettings {
        logoDark {
          asset {
            gatsbyImageData(
              width: 400
              placeholder: BLURRED
              layout: CONSTRAINED
            )
            label
            url
          }
        }
        logoLight {
          asset {
            gatsbyImageData(
              width: 400
              placeholder: BLURRED
              layout: CONSTRAINED
            )
            label
            url
          }
        }
      }
    }
  `);

  return (
    <StyledHeader>
      <div className="wrap">
        <LogoWrap>
          <Logo className="dark-logo" image={settings.logoDark} />
          <Logo className="light-logo" image={settings.logoLight} />
        </LogoWrap>
        <Nav location={location}></Nav>
      </div>
    </StyledHeader>
  );
}

export default Header;
