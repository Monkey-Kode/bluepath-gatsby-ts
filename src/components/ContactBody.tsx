import { graphql, useStaticQuery } from "gatsby";
import React, { useState, useEffect } from "react";
import sortObject from "../utils/sortObject";
import classNames from "classnames";
import styled from "styled-components";
import { loader } from "../utils/loader";
import splitByNewLines from "../utils/splitByNewLines";
// import BlockContent from '@sanity/block-content-to-react';
import emailLink from "../images/bluepath-email-link.png";
const StyledContentArea = styled.div`
  display: grid !important;
  grid-template-columns: 90vw;
  grid-template-rows: 150px repeat(2, 700px);
  grid-gap: 30px;
  justify-content: center;
  align-items: flex-start !important;
  width: auto;
  max-width: 100%;
  margin: 0 auto;
  a {
    color: white;
    font-weight: 700;
    text-decoration: underline;
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: auto repeat(2, 430px);
    grid-template-rows: auto;
    max-width: 80vw;
    align-items: center !important;
  }
  @media only screen and (min-width: 1129px) and (max-width: 1200px) {
    padding-top: 20%;
  }
  @media only screen and (min-width: 800px) and (max-width: 1128px) {
    padding-top: 30%;
  }
  @media only screen and (max-width: 600px) {
    padding-top: 0%;
  }
`;
const StyledColumns = styled.div`
  /* display: flex;
  flex-flow: column wrap; */
  max-width: 430px;
  max-height: 330px;
  margin: 0;

  @media only screen and (max-width: 600px) {
    /* max-width: 80vw; */
    max-width: calc(100vw - 20px);
    /* max-height: 211px; */
    max-height: calc(calc(calc(100% - 20px) * 330px) / 430px);
  }

  h3 {
    background-color: var(--blue);
    color: white;
    font-size: 2rem;
    padding: 1rem 1.5rem;
    margin-bottom: 0;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }
  p {
    color: white;
    font-weight: 100;
    font-size: 1.3rem;
    padding: 1.24rem;
    margin: 0;
    line-height: 1.3;
  }

  .details {
    opacity: 0;
    transition: opacity 0.24s ease-out;
    background-color: var(--gray);
    height: 100%;
    &.active {
      opacity: 1;
      transition: opacity 0.24s ease-out;
    }
  }
`;
const StyledMap = styled.div`
  width: 430px;
  height: 330px;
  @media only screen and (max-width: 600px) {
    /* max-width: 80vw; */
    max-width: 100%;
    /* max-height: 211px; */
    max-height: calc(calc(calc(100% - 20px) * 330px) / 430px);
  }
`;

// function generateRichContent(data, Heading, name) {
//   return (
//     <>
//       <h1>{Heading || name}</h1>
//       <BlockContent blocks={data.Page.richcontentRaw} />
//     </>
//   );
// }

// function generateContent(content, Heading, name) {
//   console.log('content', content);
//   return (
//     <>
//       <h1>{Heading || name}</h1>
//       <p>{content && splitByNewLines(content)}</p>
//     </>
//   );
// }
export const ContactBody = ({
  id,
  Heading,
  name,
  richcontent,
}: {
  id: Queries.SanityPage["id"];
  Heading: Queries.SanityPage["Heading"];
  name: Queries.SanityPage["name"];
  richcontent: Queries.SanityPage["richcontent"];
}) => {
  const {
    allSanityAddress: { nodes },
  }: Queries.ContactBodyQuery = useStaticQuery(graphql`
    query ContactBody {
      allSanityAddress {
        nodes {
          _id
          name
          location {
            lat
            lng
          }
          details
          address
          order
        }
      }
    }
  `);
  const addresses = sortObject(
    nodes,
  ) as Queries.ContactBodyQuery["allSanityAddress"]["nodes"];
  const [showInfo, setShowInfo] = useState(false);
  // const { data } = remoteContent;
  // console.log('rich content graphql', richcontent);
  // console.log('remote', data && data.Page.richcontentRaw);
  useEffect(() => {
    loader.load().then(() => {
      const googleMaps = window.google.maps;
      const map: any[] = [];

      addresses.map(({ _id, location: center, address, details }) => {
        if (googleMaps && document.getElementById(String(_id)) !== null) {
          // console.log('google', googleMaps);
          return (map[Number(_id)] = new window.google.maps.Map(
            document.getElementById(String(_id)) as HTMLElement,
            {
              center: center as any,
              zoom: 12,
            },
          ));
        } else {
          return null;
        }
      });
    });
  }, [addresses]);
  return (
    <StyledContentArea>
      <div style={{ minWidth: "255px" }}>
        {/* {data && generateRichContent(data, Heading, name)} */}
        <h1>{Heading || name}</h1>
        {richcontent?.map((content) =>
          content?.children?.map((c) => <p key={id}>{c?.text}</p>),
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            window.open("mailto:info@bluepathfinance.com");
          }}
          style={{
            transform: "translate(-13px, -30px)",
            cursor: "pointer",
            padding: "0",
            background: "none",
          }}
        >
          <img src={emailLink} alt="Bluepath contact email" />
        </button>
      </div>
      {addresses.map(({ name, _id, details, address }) => {
        return (
          <StyledColumns
            key={_id}
            onClick={() => setShowInfo(Boolean(_id))}
            onMouseEnter={() => setShowInfo(Boolean(_id))}
            onMouseLeave={() => setShowInfo(false)}
          >
            <h3>{splitByNewLines(String(address))}</h3>
            <StyledMap id={_id ?? undefined}></StyledMap>
            <div
              className={classNames("details", {
                active: showInfo === Boolean(_id),
              })}
            >
              <p>{splitByNewLines(String(details))}</p>
            </div>
          </StyledColumns>
        );
      })}
    </StyledContentArea>
  );
};
