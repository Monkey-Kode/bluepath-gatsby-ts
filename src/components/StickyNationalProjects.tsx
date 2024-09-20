import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NationalProjects, { CaseStudy } from "./NationalProjects";
import styled from "styled-components";

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

export default function StickyNationalProjects({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const controls = useAnimation();
  const [footerRef, footerInView, entry] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (footerInView) {
      controls.start({ opacity: 0, y: "100%" });
    } else {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, footerInView]);

  return (
    <>
      <StickWrapper initial={{ opacity: 0, y: "100%" }} animate={controls}>
        <NationalProjects caseStudies={caseStudies} />
      </StickWrapper>
      <div
        ref={footerRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
        }}
      />
    </>
  );
}
