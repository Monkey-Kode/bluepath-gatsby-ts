import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "gatsby"; // Import Link from gatsby
import { getImageComponent } from "../utils/ImageSelector";

const StyledNationalProjects = styled.div`
  --color-orange: hsla(34, 85%, 53%, 1);
  --border: 2px solid var(--color-orange);
  display: flex;
  flex-direction: column;
  color: var(--blue);
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 10fr;
    width: 100%;
    align-items: center;
    padding-block: 0;
    padding-inline: 2rem;
    background-color: white;
  }
`;

const Heading = styled.h2`
  font-size: 1.670625rem;
  color: var(--color-blue);
  font-weight: 300;
  padding-block-start: 2rem;
  text-align: left;
  text-transform: uppercase;
  padding-inline: 0;
  display: flex;
  justify-content: center;
  padding-block-end: 1.5rem;
  border-bottom: var(--border);
  @media (min-width: 769px) {
    padding-inline-end: 2rem;
    border-bottom: none;
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  a {
    padding-block-start: 0;
  }
  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const ProjectColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: 1rem;
  padding-inline-start: 1.5rem; /* Add more padding to the left */
  padding-inline-end: 1.5rem; /* Add more padding to the right */
  position: relative; /* Ensure relative positioning */
  overflow: hidden;
  height: calc(150px + 1.5rem); /* Set a fixed height to avoid collapsing */

  border-bottom: var(--border);
  @media (min-width: 769px) {
    border-left: var(--border);
    border-bottom: none;
    height: 150px; /* Set a fixed height to avoid collapsing */
  }
`;

const ProjectDetails = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-blue);
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
  > :first-child {
    padding-block-end: 0.5rem;
    margin: 0;
  }
`;

const ProjectCard = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  padding-block-start: 1rem;
  padding-block-end: 0;
  background-color: #fff;
  text-align: left;
  align-items: flex-start;
  width: 100%;
`;

const ProjectImage = styled.figure`
  width: 100%;
  height: auto;
  padding-inline-end: 1rem;
  display: flex;
  align-items: flex-start;
  margin: 0;
  > svg {
    height: 100%;
    max-height: 125px;
    width: 100%;
    object-fit: contain;
    transform: translateY(-5%);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-blue);
  margin: 0;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
  padding-block-end: 0.5rem;
`;

export type CaseStudy =
  Queries.HomeMainQuery["allSanityCasestudies"]["nodes"][number];
type NationalProjectsProps = {
  caseStudies: CaseStudy[];
};

// Helper function to chunk the projects into 4 sets.
const chunkProjects = (projects: CaseStudy[], numSets: number) => {
  const sets: CaseStudy[][] = Array.from({ length: numSets }, () => []);
  projects.forEach((project, index) => {
    sets[index % numSets].push(project);
  });
  return sets;
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const animationVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function NationalProjects({ caseStudies }: NationalProjectsProps) {
  const [projectSets, setProjectSets] = useState<CaseStudy[][]>(() =>
    chunkProjects(caseStudies, 4),
  );
  const [currentIndices, setCurrentIndices] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices((prevIndices) => {
        return prevIndices.map(
          (index, i) => (index + 1) % projectSets[i].length,
        );
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [projectSets]);

  return (
    <StyledNationalProjects>
      <Heading>National Projects</Heading>
      <ProjectContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectSets.map((projectSet, columnIndex) => (
          <Link
            to="/projects"
            key={columnIndex}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              width: "100%",
            }}
          >
            <ProjectColumn>
              <AnimatePresence>
                {projectSet[currentIndices[columnIndex]] && (
                  <motion.div
                    key={projectSet[currentIndices[columnIndex]].title}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animationVariants}
                    transition={{ duration: 1, delay: columnIndex * 0.5 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "1.5rem" /* Adjust left and right for padding space */,
                      right: "1.5rem",
                      bottom: 0,
                    }}
                  >
                    <ProjectCard>
                      <ProjectImage>
                        {projectSet[currentIndices[columnIndex]].entity &&
                          getImageComponent(
                            projectSet[currentIndices[columnIndex]].entity,
                          )}
                      </ProjectImage>
                      <div>
                        <ProjectTitle>
                          {projectSet[currentIndices[columnIndex]].entity}
                        </ProjectTitle>
                        <ProjectDetails>
                          <div>
                            $
                            {projectSet[
                              currentIndices[columnIndex]
                            ].size?.toLocaleString()}{" "}
                          </div>
                          {projectSet[currentIndices[columnIndex]].technologies
                            ?.filter(Boolean)
                            .join(", ")}
                        </ProjectDetails>
                      </div>
                    </ProjectCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </ProjectColumn>
          </Link>
        ))}
      </ProjectContainer>
    </StyledNationalProjects>
  );
}

export default NationalProjects;
