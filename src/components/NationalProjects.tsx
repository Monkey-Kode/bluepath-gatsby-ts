import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "gatsby"; // Import Link from gatsby
import { getImageComponent } from "../utils/ImageSelector";
import { loader } from "../utils/loader";
const StyledNationalProjects = styled.div`
  --color-orange: hsla(34, 85%, 53%, 1);
  --border: 2px solid var(--color-orange);
  --bottom-margin: 1rem;
  background-color: white;
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
    padding-block: 0.5rem;
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
    padding-block: 0;
    margin-block: 0;
    padding-inline-end: 2rem;
    border-bottom: none;
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-block-end: 0;
  a {
    padding-block-start: 0;
  }

  @media (min-width: 769px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch; // for smoother scrolling on iOS

    & > * {
      flex: 0 0 auto;
      scroll-snap-align: start;
    }
  }
`;

const ProjectColumn = styled.div`
  --project-height: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: 0.5rem;
  position: relative; /* Ensure relative positioning */
  overflow: hidden;
  height: calc(
    var(--project-height) + 1.5rem
  ); /* Set a fixed height to avoid collapsing */
  border-bottom: var(--border);
  @media (min-width: 769px) {
    border-left: var(--border);
    border-bottom: none;
    height: var(--project-height); /* Set a fixed height to avoid collapsing */
  }
`;

const ProjectCard = styled.div`
  --font-size: 0.6rem;
  display: grid;
  grid-template-columns: 65% 35%;
  padding-block-start: 0.75rem;
  padding-block-end: 0;
  background-color: #fff;
  text-align: left;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const ProjectImage = styled.figure`
  width: 100%;
  height: auto;
  padding-inline-start: 1rem;
  display: flex;
  align-items: flex-start;
  margin: 0;
  > svg {
    height: 100%;
    max-height: 125px;
    width: 100%;
    object-fit: contain;
    transform: translateY(-5%);
    rect {
      stroke: var(--blue);
    }
  }
`;
const ProjectDetails = styled.p`
  font-size: var(--font-size);
  font-weight: 400;
  color: var(--color-blue);
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
  > * {
    margin-block-end: 0.5rem;
  }
`;
const ProjectTitle = styled.h3`
  font-size: var(--font-size);
  font-weight: 400;
  color: var(--color-blue);
  margin: 0;
  text-align: left;
  text-transform: uppercase;
  white-space: wrap;
  overflow: hidden;
  padding-block-end: 0.5rem;
  line-height: 1.25;
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
  const [stateNames, setStateNames] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const geocodeCache = useRef<{ [projectId: string]: string }>({});

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

  useEffect(() => {
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();

      currentIndices.forEach((currentIndex, columnIndex) => {
        const project = projectSets[columnIndex][currentIndex];
        const projectId = project.id;

        if (
          geocodeCache.current &&
          typeof projectId === "string" &&
          geocodeCache.current[projectId]
        ) {
          // Use cached state name
          setStateNames((prevStateNames) => {
            const newStateNames = [...prevStateNames];
            newStateNames[columnIndex] = geocodeCache.current[projectId];
            return newStateNames;
          });
        } else {
          const location = project.location;

          if (
            location &&
            typeof location.lat === "number" &&
            typeof location.lng === "number"
          ) {
            const latlng = { lat: location.lat, lng: location.lng };

            geocoder.geocode({ location: latlng }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const addressComponents = results[0].address_components;
                const stateComponent = addressComponents.find((component) =>
                  component.types.includes("administrative_area_level_1"),
                );
                const stateName = stateComponent?.long_name || null;

                if (stateName !== null) {
                  geocodeCache.current[projectId] = stateName;
                }

                setStateNames((prevStateNames) => {
                  const newStateNames = [...prevStateNames];
                  newStateNames[columnIndex] = stateName;
                  return newStateNames;
                });
              } else {
                console.error("Geocoder failed due to: " + status);
                setStateNames((prevStateNames) => {
                  const newStateNames = [...prevStateNames];
                  newStateNames[columnIndex] = null;
                  return newStateNames;
                });
              }
            });
          } else {
            console.error("Invalid location data for project:", projectId);
            setStateNames((prevStateNames) => {
              const newStateNames = [...prevStateNames];
              newStateNames[columnIndex] = null;
              return newStateNames;
            });
          }
        }
      });
    });
  }, [currentIndices, projectSets]);

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
                      left: "1.5rem",
                      right: "1.5rem",
                      bottom: 0,
                    }}
                  >
                    <ProjectCard>
                      <div>
                        <ProjectTitle>
                          {stateNames[columnIndex]
                            ? stateNames[columnIndex]
                            : "Loading..."}
                          : {projectSet[currentIndices[columnIndex]].entity}
                        </ProjectTitle>
                        <ProjectDetails>
                          <div>
                            {projectSet[
                              currentIndices[columnIndex]
                            ].technologies
                              ?.filter(Boolean)
                              .join(", ")}
                          </div>
                          <div>
                            $
                            {projectSet[
                              currentIndices[columnIndex]
                            ].size?.toLocaleString()}{" "}
                          </div>
                        </ProjectDetails>
                      </div>
                      <ProjectImage>
                        {projectSet[currentIndices[columnIndex]].entity &&
                          getImageComponent(
                            projectSet[currentIndices[columnIndex]].entity,
                          )}
                      </ProjectImage>
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
