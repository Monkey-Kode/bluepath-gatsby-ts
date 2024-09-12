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
  text-align: left;
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
  display: flex;
  width: 100%;
  height: 100%;
`;

const ProjectImage = styled.figure`
  width: 100px;
  height: 100px;
  margin: 0;
  margin-right: 1rem;
  display: flex;
`;

const ProjectCard = styled.div`
  display: flex;
  padding: 1rem;
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
