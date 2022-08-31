import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import sortObject from '../utils/sortObject';
import styled from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
// import Logo from './Logo';

const StyledMenu = styled.nav`
  margin: 1.75rem 0;
  font-size: 1rem;
  @media (max-width: 1080px) {
    font-size: 0.7rem;
  }
  @media (max-width: 800px) {
    &.header {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--blue);
      transform: ${({ open }) =>
        open ? 'translateX(0)' : 'translateX(-100%)'};
      height: 100vh;
      text-align: left;
      padding: 8%;
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;
      z-index: 9;
      margin: 0 !important;

      @media (max-width: 576px) {
        width: 100%;
      }

      a {
        font-size: 2rem;
        text-transform: uppercase;
        padding: 1rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: white;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
          font-size: 1.5rem;
          text-align: center;
          padding: 0 !important;
        }

        &:hover {
          color: #343078;
        }
      }
    }
    &.footer {
      margin: 3rem 0 1rem;
      ul {
        /* flex-direction: row; */
        padding-top: 1rem;
        padding-left: 0.7rem;
        /* border-top: 2px solid #00418191; */
        align-items: flex-start;

        li {
          padding-left: 0;
          /* flex: 1 auto; */
          border: none !important;
        }
      }
    }
  }
`;

const StyledMenuUl = styled.ul`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 800px) {
    justify-content: flex-end;
  }
  @media (max-width: 799px) {
    flex-direction: column;
    justify-content: center;
    /* justify-content: stretch;
    align-items: center;
    flex-flow: column wrap; */
  }

  li {
    list-style: none;
    @media (min-width: 800px) {
      padding: 0 1rem 0;
    }
    a {
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;
function Menu({ open, location, siteLocation, setOpen }) {
  const {
    navigation: { nodes },
  } = useStaticQuery(graphql`
    query {
      navigation: allSanityNavigation {
        nodes {
          name
          order
          header
          footer
          page {
            name
            id
            slug {
              current
            }
          }
          jumpLinkId
          linkType
          id
        }
      }
    }
  `);
  //   console.log('location', location);
  const navigation = sortObject(nodes);
  return (
    <StyledMenu className={siteLocation} open={open}>
      <StyledMenuUl>
        {navigation.map(
          ({ name: title, page, jumpLinkId, linkType, id, header, footer }) => {
            if (!header && siteLocation === 'header') {
              return null;
            }
            if (!footer && siteLocation === 'footer') {
              return null;
            }

            let pageLink = '';

            if (page !== null && linkType === false) {
              pageLink = page.slug.current;
            } else {
              if (location?.pathname !== '/') {
                pageLink = `/${jumpLinkId}`;
              } else {
                pageLink = jumpLinkId;
              }
            }

            return (
              <li key={id}>
                {!jumpLinkId ? (
                  <Link to={`/${pageLink}`}>{title}</Link>
                ) : (
                  <a
                    href={`${pageLink}`}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        setOpen(false);
                        scrollTo(pageLink);
                      }
                    }}
                  >
                    {title}
                  </a>
                )}
              </li>
            );
          }
        )}
      </StyledMenuUl>
    </StyledMenu>
  );
}

export default Menu;
