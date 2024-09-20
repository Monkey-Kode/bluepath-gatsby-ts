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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Log the entry values to the console
      // console.log("Table of Contents Entry:", tableOfContentsRef.entry);
      // console.log("Footer Entry:", footerRef.entry);

      if (footerRef.inView) {
        controls.start({ opacity: 0, y: "100%" });
      } else if (!tableOfContentsRef.inView && currentScrollY > prevScrollY) {
        controls.start({ opacity: 1, y: 0 });
      } else {
        controls.start({ opacity: 0, y: "100%" });
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls, footerRef.inView, tableOfContentsRef.inView, prevScrollY]);

  return (
    <StickWrapper initial={{ opacity: 0, y: "100%" }} animate={controls}>
      <NationalProjects caseStudies={caseStudies} />
    </StickWrapper>
  );
}
