// @ts-nocheck
import React from 'react';
import Housing from '../images/housing.svg';
import Industrial from '../images/industrial.svg';
import School from '../images/school.svg';
import Office from '../images/office.svg';
import University from '../images/university.svg';
import Government from '../images/government.svg';
import Hospital from '../images/hospital.svg';
import formatNumber from '../utils/formatNumber';
import { GatsbyImage } from 'gatsby-plugin-image';

function FeaturedImage({ image, title, entity }) {
  if (image) {
    return (
      <div className="image">
        <GatsbyImage image={image.asset.gatsbyImageData?.src} alt={title} />
      </div>
    );
  } else if (entity.length > 0) {
    const sanitizeEntity = String(entity).toLowerCase().trim();
    // console.log(sanitizeEntity.includes === 'residential');
    if (sanitizeEntity.includes('residential')) {
      return (
        <div className="image">
          <Housing />
        </div>
      );
    } else if (sanitizeEntity.includes('commercial')) {
      return (
        <div className="image">
          <Office />
        </div>
      );
    } else if (
      sanitizeEntity.includes('school') ||
      sanitizeEntity.includes('education')
    ) {
      return (
        <div className="image">
          <School />
        </div>
      );
    } else if (
      sanitizeEntity.includes('industrial') ||
      sanitizeEntity.includes('agricultural')
    ) {
      return (
        <div className="image">
          <Industrial />
        </div>
      );
    } else if (sanitizeEntity.includes('university')) {
      return (
        <div className="image">
          <University />
        </div>
      );
    } else if (sanitizeEntity.includes('municipal')) {
      return (
        <div className="image">
          <Government />
        </div>
      );
    } else if (sanitizeEntity.includes('hospital')) {
      return (
        <div className="image">
          <Hospital />
        </div>
      );
    }
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
              <p>{`$${formatNumber(size)}`}</p>
            </div>
            <div className="line-content">
              <h3>Technology</h3>
              <p>{technologies.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
