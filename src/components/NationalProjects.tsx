import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getImageComponent } from "../utils/ImageSelector";

const StyledNationalProjects = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h2`
  --color-orange: hsla(34, 85%, 53%, 1);
  font-size: 1.670625rem;
  color: var(--color-blue);
  font-weight: 300;
  margin-inline-end: 2rem;
  padding-inline-end: 2rem;
  padding-block: 2rem;
  border-right: 3.65px solid var(--color-orange);
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
`;

const ProjectDetails = styled.p`
  font-size: 0.875rem;
  color: var(--color-blue);
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const AnimatedProject = styled.div`
  animation: ${fadeInOut} 5s linear infinite;
`;

const ProjectImage = styled.figure`
  width: 100%;
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
          console.log("project", project);
          return (
            <ProjectColumn key={id}>
              <AnimatedProject>
                <ProjectImage>
                  {entity && getImageComponent(entity)}
                </ProjectImage>
                <h3>{title}</h3>
                <ProjectDetails>
                  ${size?.toLocaleString()} <br />
                  {technologies?.filter(Boolean).join(", ")}
                </ProjectDetails>
              </AnimatedProject>
            </ProjectColumn>
          );
        })}
      </ProjectContainer>
    </StyledNationalProjects>
  );
}

export default NationalProjects;
