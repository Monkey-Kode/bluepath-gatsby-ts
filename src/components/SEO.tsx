import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../images/1200w/logo-1200-cropped.png';
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

  const siteUrl =
    typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
      ? window.location.href
      : typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : 'https://bluepathfinance.com/';

  const seoTitle = site?.siteMetadata?.title ?? title ?? 'Bluepath Finance';
  const seoDescription = site?.siteMetadata?.description ?? description ?? '';
  const seoLogo = image ?? `${siteUrl}${logo.slice(1)}` ?? '';
  console.log('seoTitle', seoTitle);
  console.log('seoLogo', seoLogo);
  console.log('seoDescription', seoDescription);
  return (
    <Helmet titleTemplate={`${seoTitle}`}>
      <html lang="en" />
      <title>{seoTitle}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={seoDescription} />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={seoLogo} />
      <meta property="og:image:secure_url" content={seoLogo} />
      <meta property="og:image:type" content={'image/png'} />
      <meta property="og:image:width" content={'336'} />
      <meta property="og:image:height" content={'176'} />
      <meta property="og:image:alt" content={'Bluepath Finance'} />
      <meta property="og:title" content={seoTitle} key="ogtitle" />
      <meta property="og:site_name" content={seoTitle} key="ogsitename" />
      <meta property="og:description" content={seoDescription} key="ogdesc" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@BluePathFinance" />
      <meta name="twitter:creator" content="@BluePathFinance" />
      <meta name="twitter:title" content={seoTitle} key="twittertitle" />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoLogo} />
      <meta name="twitter:image:alt" content={'Bluepath Finance'} />
      <meta name="twitter:image:width" content={'336'} />
      <meta name="twitter:image:height" content={'176'} />
      {children}
    </Helmet>
  );
};
export default SEO;
