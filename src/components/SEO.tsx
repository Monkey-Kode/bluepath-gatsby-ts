import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  location?: Location;
  children?: JSX.Element;
}
const SEO: FC<SEOProps> = ({
  children,
  location,
  description,
  title,
  image,
}) => {
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:imge" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
    </Helmet>
  );
};
export default SEO;
