import { graphql, useStaticQuery } from "gatsby";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  SyntheticEvent,
} from "react";
import styled from "styled-components";
import sortObject from "../utils/sortObject";
import TeamCard from "./TeamCard";
import TeamThumbnail from "./TeamThumbnail";
import BackgroundImage from "gatsby-background-image";
import { convertToBgImage } from "gbimage-bridge";
import { getImage } from "gatsby-plugin-image";

const StyledTeamSection = styled(BackgroundImage)`
  background: rgb(24, 85, 140);
  background: linear-gradient(
    173deg,
    rgba(24, 85, 140, 1) 0%,
    rgba(116, 162, 195, 1) 32%,
    rgba(172, 208, 232, 1) 50%,
    rgba(116, 162, 195, 1) 70%,
    rgba(1, 65, 127, 1) 100%
  );
  background-attachment: fixed !important;
  &::before {
    background-attachment: fixed !important;
  }
  h2 {
    color: white;
    font-size: 3rem;
    /* font-size: clamp(2rem, 4.25vw, 4.25vw,); */
    @media only screen and (max-width: 800px) {
      font-size: 2rem;
    }
  }
  .team-wrapper {
    width: 100%;
    @media only screen and (min-width: 800px) {
      margin-top: 107px;
    }
    @media only screen and (max-width: 800px) {
      padding: 10% 5%;
    }
  }
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media only screen and (min-width: 800px) {
  }
`;

const StyledThumbs = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-block-end: 0.5rem;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transaparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--blue);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media only screen and (min-width: 801px) {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto;
    grid-gap: 20px;
    align-items: flex-start;
    align-items: center;
    margin: 0 auto;
    > div {
      max-width: 160px;
      margin: 0 auto;
      scroll-snap-align: start; /* Add this */
    }
  }
  @media only screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    > div {
      flex: 1 50%;
    }
  }

  @media only screen and (max-width: 800px) {
    > div {
      flex: 1 100%;
    }
  }
  > div {
    height: 100%;
    @media only screen and (max-width: 800px) {
      padding: 10% 5%;
      margin: 0 auto;
    }
  }
`;
const StyledInfos = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: 3rem;
  @media only screen and (max-width: 800px) {
    margin-bottom: 0;
  }
`;

const ScrollButton = styled.button<{ direction: "left" | "right" }>`
  background: transparent;
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "left" ? "left: -20px;" : "right: -20px;")};
  transform: translateY(-50%);
  z-index: 10;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const ThumbsContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 30px;

  @media only screen and (max-width: 800px) {
    padding: 0;
  }
`;
const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
`;
function Team({ sanityPage }: { sanityPage: Queries.SanityPage }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setcurrentSlide] = useState("");
  const checkScroll = useCallback(() => {
    const container = thumbsRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }
  }, []);

  const { name, background, backgroundColor, mobilebackground } = sanityPage;
  let sectionBg = background;
  if (typeof window !== "undefined") {
    const mql = window.matchMedia("(max-width: 600px)");
    if (!mql.matches && background) {
      sectionBg = background;
    } else if (mql.matches && mobilebackground) {
      sectionBg = mobilebackground;
    } else {
      sectionBg = background;
    }
  }

  const bgColor = backgroundColor ? backgroundColor.hex : "transparent";
  const {
    allSanityTeam: { nodes: team },
  }: Queries.TeamQuery = useStaticQuery(graphql`
    query Team {
      allSanityTeam {
        nodes {
          bio
          id
          name
          order
          role
          image {
            asset {
              gatsbyImageData(
                width: 284
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `);
  const members = sortObject(
    team,
  ) as Queries.TeamQuery["allSanityTeam"]["nodes"];

  useEffect(() => {
    const container = thumbsRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [checkScroll]);

  useEffect(() => {
    const slider = document.getElementById("team-carousel");
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    if (slider) {
      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  const image = sectionBg?.asset?.gatsbyImageData
    ? getImage(sectionBg?.asset?.gatsbyImageData)
    : null;
  const bgImage = image ? convertToBgImage(image) : null;

  const thumbsRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = thumbsRef.current;
    if (container) {
      const scrollAmount = 200; // Adjust this value based on your needs
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <StyledTeamSection
      id={name ?? undefined}
      Tag="section"
      backgroundColor={bgColor}
      onClick={(e: SyntheticEvent) => {
        setcurrentSlide("");
      }}
      {...bgImage}
    >
      <div id="teamWrapper" className="team-wrapper">
        <h2>{name}</h2>
        <StyledInfos>
          {members.map(({ id, image, name, role, bio, order }) => {
            if (currentSlide === id) {
              return (
                <TeamCard
                  // currentSlide={currentSlide}
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  role={role}
                  bio={bio}
                />
              );
            } else {
              return null;
            }
          })}
        </StyledInfos>
        <ThumbsContainer>
          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ←
          </ScrollButton>
          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            →
          </ScrollButton>
          <StyledThumbs id="team-carousel">
            {members.map(({ id, image, name, role, order }) => {
              return (
                <TeamThumbnail
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  role={role}
                  setcurrentSlide={setcurrentSlide}
                />
              );
            })}
          </StyledThumbs>
        </ThumbsContainer>
      </div>
    </StyledTeamSection>
  );
}

export default Team;
