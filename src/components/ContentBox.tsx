import { Link } from "gatsby";
import React, { useState, useEffect, useRef } from "react";
import scrollTo from "gatsby-plugin-smoothscroll";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import intersectionObserverOptions from "../utils/intersectionObserverOptions";
import splitByNewLines from "../utils/splitByNewLines";
import classNames from "classnames";
import useIsMobile from "../utils/useIsMobile";

const Container = styled(motion.div)`
  padding-inline: 2rem;
  max-width: 38.5rem;
  overflow: hidden; /* Ensure content doesn't overflow during animation */
  @media (max-width: 1024px) {
    padding-inline: 1.5rem;
  }
`;

const Header = styled.div`
  /* Container Query Example: Fallback for non-supported browsers simulating container-based font sizing */
  h2 {
    border: none !important;
    margin: 0;
    padding-block-start: 1.5rem;
    padding-block-end: 0.5rem;
    line-height: 0.9;
    max-width: 100%; /* Ensures h2 does not exceed the container's width */
    overflow-wrap: break-word; /* Forces text to wrap within the container */
    --big-heading-size: 3.75rem;

    @media only screen and (max-width: 800px) {
      text-align: center;
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: calc(1.875rem + 0.5vw); /* Adjusts based on viewport width */
    font-style: italic;
    text-align: center;
    text-transform: lowercase;
    margin: 0;
    padding-block-end: 1.5rem;
    @media only screen and (max-width: 800px) {
      line-height: 1.5;
    }
  }
`;

const Content = styled.div`
  a {
    display: block;
    text-align: center;
  }

  p {
    padding-inline: 0;
  }
`;

const Divider = styled(motion.hr)`
  border-bottom: var(--border-bottom);
  margin-block-start: 0;
  margin-block-end: 0;
  transform-origin: left;
`;

// Define animation variants
const containerVariants = (headerHeight: number, contentHeight: number) => ({
  hidden: { height: headerHeight },
  visible: { height: headerHeight + contentHeight },
});

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function ContentBox({
  sectionHeading,
  sectionContent,
  sectionContentCTAjumpId,
  sectionContentCTApageLink,
  sectionContentCTAtext,
  sectionHeadingPosition,
  hidetitle,
}: {
  sectionHeading: Queries.SanityPage["Heading"];
  sectionContent: Queries.SanityPage["content"];
  sectionContentCTAjumpId: Queries.SanityPage["sectionContentCTAjumpId"];
  sectionContentCTApageLink: Queries.SanityPage["sectionContentCTApageLink"];
  sectionContentCTAtext: Queries.SanityPage["sectionContentCTAtext"];
  sectionHeadingPosition: Queries.SanityPage["sectionHeadingPosition"];
  hidetitle: Queries.SanityPage["hidetitle"];
}) {
  const { ref, inView } = useInView(intersectionObserverOptions);
  const isMobile = useIsMobile();
  console.log({ isMobile });

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  let ctaLink = "";
  if (sectionContentCTAjumpId) {
    ctaLink = `#${sectionContentCTAjumpId}`;
  } else if (sectionContentCTApageLink) {
    ctaLink = `/${sectionContentCTApageLink?.slug?.current ?? ""}`;
  }
  const headingContent = sectionHeading?.toString().split(" ") ?? [];
  const heading = headingContent.length > 0 ? headingContent[0] : null;
  const subheading =
    headingContent.length > 1 ? headingContent.slice(1).join(" ") : null;

  return (
    <div
      ref={ref}
      className={classNames({
        active: inView,
        inactive: !inView,
      })}
    >
      <Container
        className={classNames("box", sectionHeading)}
        initial={isMobile ? "visible" : "hidden"}
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerVariants(headerHeight, contentHeight)}
        transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.5 }}
      >
        <Header ref={headerRef}>
          {!sectionHeadingPosition && !hidetitle && (
            <motion.h2
              initial={isMobile ? "visible" : "hidden"}
              animate={hasAnimated ? "visible" : "hidden"}
              variants={headerVariants}
              transition={isMobile ? { duration: 0 } : { duration: 0.5 }}
            >
              {heading}
            </motion.h2>
          )}
          {sectionHeadingPosition && !hidetitle && (
            <motion.h2
              className="hide-for-desktop"
              initial={isMobile ? "visible" : "hidden"}
              animate={hasAnimated ? "visible" : "hidden"}
              variants={headerVariants}
              transition={isMobile ? { duration: 0 } : { duration: 0.5 }}
            >
              {heading}
            </motion.h2>
          )}
          {!sectionHeadingPosition && !hidetitle && (
            <motion.h3
              initial={isMobile ? "visible" : "hidden"}
              animate={hasAnimated ? "visible" : "hidden"}
              variants={headerVariants}
              transition={
                isMobile ? { duration: 0 } : { duration: 0.5, delay: 0.5 }
              }
            >
              {subheading}
            </motion.h3>
          )}
          {sectionHeadingPosition && !hidetitle && (
            <motion.h3
              className="hide-for-desktop"
              initial={isMobile ? "visible" : "hidden"}
              animate={hasAnimated ? "visible" : "hidden"}
              variants={headerVariants}
              transition={
                isMobile ? { duration: 0 } : { duration: 0.5, delay: 0.5 }
              }
            >
              {subheading}
            </motion.h3>
          )}
        </Header>
        <Divider
          initial={isMobile ? "visible" : "hidden"}
          animate={hasAnimated ? "visible" : "hidden"}
          variants={dividerVariants}
          transition={isMobile ? { duration: 0 } : { duration: 0.5, delay: 1 }}
        />
        <Content ref={contentRef}>
          <motion.div
            className="wrap"
            initial={isMobile ? "visible" : "hidden"}
            animate={hasAnimated ? "visible" : "hidden"}
            variants={contentVariants}
            transition={
              isMobile ? { duration: 0 } : { duration: 0.5, delay: 1.5 }
            }
          >
            <p>{splitByNewLines(String(sectionContent))}</p>
            {ctaLink && sectionContentCTAtext && sectionContentCTAjumpId && (
              <a
                href={ctaLink}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(ctaLink);
                }}
              >
                {sectionContentCTAtext}
              </a>
            )}
            {ctaLink && sectionContentCTAtext && !sectionContentCTAjumpId && (
              <Link to={ctaLink}>{sectionContentCTAtext}</Link>
            )}
          </motion.div>
        </Content>
      </Container>
    </div>
  );
}

export default ContentBox;
