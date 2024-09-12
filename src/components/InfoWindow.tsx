import React from "react";
import formatNumber from "../utils/formatNumber";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageComponent } from "../utils/ImageSelector";

function FeaturedImage({
  image,
  title,
  entity,
}: {
  image: Queries.ProjectsQuery["allSanityCasestudies"]["nodes"][number]["image"];
  title: Queries.ProjectsQuery["allSanityCasestudies"]["nodes"][number]["title"];
  entity: Queries.ProjectsQuery["allSanityCasestudies"]["nodes"][number]["entity"];
}) {
  if (image && image.asset && image.asset.gatsbyImageData) {
    return (
      <div className="image">
        <GatsbyImage
          image={image.asset.gatsbyImageData?.src}
          alt={title ?? "Featured Project"}
        />
      </div>
    );
  } else if (entity && entity.length > 0) {
    const sanitizeEntity = String(entity).toLowerCase().trim();
    // console.log(sanitizeEntity.includes === 'residential');
    const ImageComponent = getImageComponent(sanitizeEntity);

    return <div className="image">{ImageComponent}</div>;
  }
  return null;
}

function InfoWindow({
  project: {
    title,
    address,
    content,
    image,
    id,
    location,
    entity,
    size,
    technologies,
  },
}: {
  project: Queries.ProjectsQuery["allSanityCasestudies"]["nodes"][number];
}) {
  return (
    <div id="content">
      <div id="siteNotice">
        <div id="bodyContent">
          {(entity || image) && (
            <FeaturedImage title={title} image={image} entity={entity} />
          )}
          <div className="content">
            <div className="line-content">
              <h3>Entity Type</h3>
              <p>{entity}</p>
            </div>
            <div className="line-content">
              <h3>Financing</h3>
              <p>{`$${size && formatNumber(size)}`}</p>
            </div>
            <div className="line-content">
              <h3>Technology</h3>
              <p>{technologies?.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
