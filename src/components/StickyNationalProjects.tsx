import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import NationalProjects, { CaseStudy } from "./NationalProjects";
import styled from "styled-components";
import { InViewHookResponse } from "react-intersection-observer";

const StickWrapper = styled(motion.div)`
  display: none;
  @media (min-width: 800px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

interface StickyNationalProjectsProps {
  caseStudies: CaseStudy[];
  footerRef: InViewHookResponse;
  tableOfContentsRef: InViewHookResponse;
}

export default function StickyNationalProjects({
  caseStudies,
  footerRef,
  tableOfContentsRef,
}: StickyNationalProjectsProps) {
  const controls = useAnimation();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [shouldStickyBeVisible, setShouldStickyBeVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrevScrollY(window.scrollY);

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const sectionStartY =
          tableOfContentsRef.entry?.boundingClientRect.top ?? 0;

        if (footerRef.inView) {
          // Hide when the footer is in view
          controls.start({ opacity: 0, y: "100%" });
          setShouldStickyBeVisible(false);
        } else if (currentScrollY >= sectionStartY) {
          // Show when scrolling to or past the table of contents
          controls.start({ opacity: 1, y: 0 });
          setShouldStickyBeVisible(true);
        } else {
          // Hide when scrolling above the table of contents
          controls.start({ opacity: 0, y: "100%" });
          setShouldStickyBeVisible(false);
        }

        setPrevScrollY(currentScrollY);
      };

      // Initialize visibility state based on initial scroll position
      const sectionStartY =
        tableOfContentsRef.entry?.boundingClientRect.top ?? 0;

      if (footerRef.inView || window.scrollY < sectionStartY) {
        controls.start({ opacity: 0, y: "100%" });
        setShouldStickyBeVisible(false);
      } else {
        controls.start({ opacity: 1, y: 0 });
        setShouldStickyBeVisible(true);
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [footerRef.inView, tableOfContentsRef.entry, controls]);

  return (
    <StickWrapper
      initial={{ opacity: 0, y: "100%" }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {shouldStickyBeVisible && <NationalProjects caseStudies={caseStudies} />}
    </StickWrapper>
  );
}
