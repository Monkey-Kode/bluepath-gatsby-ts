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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // // Log the entry values to the console
    // console.log("Table of Contents Entry:", tableOfContentsRef.entry);
    // console.log("Footer Entry:", footerRef.entry);

    if (footerRef.inView) {
      // Hide when the footer is in view
      controls.start({ opacity: 0, y: "100%" });
      setShouldStickyBeVisible(false);
    } else if (!tableOfContentsRef.inView) {
      if (currentScrollY > prevScrollY) {
        // Show when scrolling down and the Table of Contents is out of view
        controls.start({ opacity: 1, y: 0 });
        setShouldStickyBeVisible(true);
      } else {
        // When scrolling up, check if we're above the table of contents
        if (
          tableOfContentsRef.entry &&
          currentScrollY < tableOfContentsRef.entry.boundingClientRect.top
        ) {
          controls.start({ opacity: 0, y: "100%" });
          setShouldStickyBeVisible(false);
        } else {
          // Keep visible when scrolling up but still below the table of contents
          controls.start({ opacity: 1, y: 0 });
          setShouldStickyBeVisible(true);
        }
      }
    } else {
      // Hide when the Table of Contents is in view
      controls.start({ opacity: 0, y: "100%" });
      setShouldStickyBeVisible(false);
    }

    setPrevScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    controls,
    footerRef.inView,
    tableOfContentsRef.inView,
    prevScrollY,
    tableOfContentsRef.entry,
  ]);

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
