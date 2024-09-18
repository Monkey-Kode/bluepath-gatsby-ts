import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getImageComponent } from "../utils/ImageSelector";

const StyledNationalProjects = styled.div`
  --color-orange: hsla(34, 85%, 53%, 1);
  --border: 3.65px solid var(--color-orange);
  display: grid;
  grid-template-columns: 1fr 10fr;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h2`
  font-size: 1.670625rem;
  color: var(--color-blue);
  font-weight: 300;
  padding-inline-end: 2rem;
  padding-block-start: 2rem;
  text-align: left;
  text-transform: uppercase;
`;

const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProjectColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: 1rem;
  position: relative;
  overflow: hidden;
  border-left: var(--border);
`;

const ProjectDetails = styled.p`
  font-size: 1rem;
  color: var(--color-blue);
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`;

const fadeInOut = keyframes`
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(20px); }
`;

const AnimatedProject = styled.div<{ $duration: number; $delay: number }>`
  animation: ${fadeInOut} ${(props) => props.$duration}s linear
    ${(props) => props.$delay}s infinite;
  display: flex;
  width: 100%;
  height: 100%;
`;

const ProjectCard = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  padding-block-start: 1rem;
  padding-block-end: 0;
  background-color: #fff;
  text-align: left;
  align-items: flex-start;
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
    width: 100%;
    object-fit: contain;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-blue);
  margin: 0;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
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
      <ProjectContainer>
        {projectSets.map((projectSet, index) => (
          <ProjectColumn key={index}>
            <AnimatedProject $duration={5} $delay={index}>
              <ProjectCard>
                <ProjectImage>
                  {projectSet[currentIndices[index]].entity &&
                    getImageComponent(projectSet[currentIndices[index]].entity)}
                </ProjectImage>
                <div>
                  <ProjectTitle>
                    {projectSet[currentIndices[index]].title}
                  </ProjectTitle>
                  <ProjectDetails>
                    ${projectSet[currentIndices[index]].size?.toLocaleString()}{" "}
                    <br />
                    {projectSet[currentIndices[index]].technologies
                      ?.filter(Boolean)
                      .join(", ")}
                  </ProjectDetails>
                </div>
              </ProjectCard>
            </AnimatedProject>
          </ProjectColumn>
        ))}
      </ProjectContainer>
    </StyledNationalProjects>
  );
}

export default NationalProjects;
