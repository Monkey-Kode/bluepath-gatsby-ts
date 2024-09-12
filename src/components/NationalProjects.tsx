import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
const StyledNationalProjects = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const Heading = styled.h2`
  font-size: 1.670625rem;
  color: var(--color-blue);
  font-weight: 300;
  margin-right: 2rem;
`;

const Divider = styled.div`
  width: 2px;
  height: 100%;
  background-color: #f5a623;
  margin: 0 2rem;
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

const ProjectImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  color: var(--color-blue);
  margin-bottom: 0.5rem;
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

function NationalProjects({
  caseStudies,
}: {
  caseStudies: Queries.HomeMainQuery["allSanityCasestudies"]["nodes"];
}) {
  const [currentProjects, setCurrentProjects] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjects((prevProjects) => {
        const newProjects = prevProjects.map((project, index) => {
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
      <Divider />
      <ProjectContainer>
        {currentProjects.map((project, index) => (
          <ProjectColumn key={index}>
            <AnimatedProject>
              <ProjectImage />
              <ProjectTitle>{project.entity[0]}</ProjectTitle>
              <ProjectDetails>
                ${project.size.toLocaleString()} <br />
                {project.technologies.join(", ")}
              </ProjectDetails>
            </AnimatedProject>
          </ProjectColumn>
        ))}
      </ProjectContainer>
    </StyledNationalProjects>
  );
}

export default NationalProjects;
