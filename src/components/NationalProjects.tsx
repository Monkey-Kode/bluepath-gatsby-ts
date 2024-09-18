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
  margin-inline-end: 2rem;
  padding-inline-end: 2rem;
  padding-block: 2rem;
  border-right: var(--border);
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
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
  &:not(:first-child) {
    border-left: var(--border);
  }
`;

const ProjectDetails = styled.p`
  font-size: 0.875rem;
  color: var(--color-blue);
  line-height: 1.2;
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const AnimatedProject = styled.div`
  animation: ${fadeInOut} 5s linear infinite;
  display: flex;
  width: 100%;
  height: 100%;
`;

const ProjectImage = styled.figure`
  width: 100px;
  height: 100px;
  margin-inline-end: 1rem;
  display: flex;
  align-items: flex-start;
  > svg {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  padding-block-start: 1rem;
  padding-block-end: 0;
  padding-inline: 1rem;
  background-color: #fff;
  text-align: left;
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  color: var(--color-blue);
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: left;
`;

type CaseStudy = Queries.HomeMainQuery["allSanityCasestudies"]["nodes"][number];
type NationalProjectsProps = {
  caseStudies: Queries.HomeMainQuery["allSanityCasestudies"]["nodes"];
};

function NationalProjects({ caseStudies }: NationalProjectsProps) {
  const [currentProjects, setCurrentProjects] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjects((prevProjects) => {
        const newProjects = prevProjects.map((_, index) => {
          const nextIndex = (index + 1) % caseStudies.length;
          return caseStudies[nextIndex];
        });
        return newProjects;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [caseStudies]);

  useEffect(() => {
    setCurrentProjects(caseStudies.slice(0, 4));
  }, [caseStudies]);

  return (
    <StyledNationalProjects>
      <Heading>National Projects</Heading>
      <ProjectContainer>
        {currentProjects.map((project, index) => {
          const {
            id,
            financing,
            entity,
            content,
            address,
            technologies,
            title,
            size,
            location,
          } = project;
          return (
            <ProjectColumn key={id}>
              <AnimatedProject>
                <ProjectCard>
                  <ProjectImage>
                    {entity && getImageComponent(entity)}
                  </ProjectImage>
                  <div>
                    <ProjectTitle>{title}</ProjectTitle>
                    <ProjectDetails>
                      ${size?.toLocaleString()} <br />
                      {technologies?.filter(Boolean).join(", ")}
                    </ProjectDetails>
                  </div>
                </ProjectCard>
              </AnimatedProject>
            </ProjectColumn>
          );
        })}
      </ProjectContainer>
    </StyledNationalProjects>
  );
}

export default NationalProjects;
