import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import NationalProjects, { CaseStudy } from "./NationalProjects";
import styled from "styled-components";
import { FooterRefProp } from "./HomeMain";
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

  useEffect(() => {
    console.log("entry", footerRef.entry);
    if (footerRef.inView) {
      controls.start({ opacity: 0, y: "100%" });
    } else {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, footerRef.inView]);

  return (
    <StickWrapper initial={{ opacity: 0, y: "100%" }} animate={controls}>
      <NationalProjects caseStudies={caseStudies} />
    </StickWrapper>
  );
}
