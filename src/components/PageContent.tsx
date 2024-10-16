import React from "react";
import Carousel from "./Carousel";
import Plain from "./Plain";
import Projects from "./Projects";
import Video from "./Video";
import Team from "./Team";
import { ArrElement } from "../types";

function PageContent({
  content,
}: {
  content: ArrElement<Queries.HomeMainQuery["allSanityHomesections"]["nodes"]>;
}) {
  const contentType = content?.contentType?.name;
  if (contentType === "TOF" || !contentType) return null;
  if (contentType === "Video") {
    return <Video key={content.id} content={content} />;
  } else if (contentType === "Carousel") {
    return <Carousel key={content.id} content={content} />;
  } else if (contentType === "Projects") {
    return <Projects key={content.id} sanityPage={content} />;
  } else if (contentType === "Team") {
    // @ts-ignore
    return <Team key={content.id} sanityPage={content} />;
  } else {
    return <Plain key={content.id} content={content} />;
  }
}

export default PageContent;
