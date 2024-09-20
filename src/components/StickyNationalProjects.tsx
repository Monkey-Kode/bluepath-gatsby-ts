import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import NationalProjects, { CaseStudy } from "./NationalProjects";
import styled from "styled-components";
import { RefObject } from "react";

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

type FooterRefProp = {
  ref: RefObject<HTMLDivElement>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
};

interface StickyNationalProjectsProps {
  caseStudies: CaseStudy[];
  footerRef: FooterRefProp;
}

export default function StickyNationalProjects({
  caseStudies,
  footerRef,
}: StickyNationalProjectsProps) {
  const controls = useAnimation();

  useEffect(() => {
    console.log("entry", footerRef.entry);
    if (footerRef.inView) {
      controls.start({ opacity: 0, y: "100%" });
    }
  }, [controls, footerRef.inView]);

  return (
    <StickWrapper initial={{ opacity: 0, y: "100%" }} animate={controls}>
      <NationalProjects caseStudies={caseStudies} />
    </StickWrapper>
  );
}
