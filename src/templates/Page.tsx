import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IndividualPageContent from '../components/IndividualPageContent';
import Impact from '../components/Impact';
import SEO from '../components/SEO';
import Form from '../components/Form';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Team from '../components/Team';
function innerContent(contentType, content) {
  if (contentType === 'Form') {
    return <Form content={content} />;
  } else if (contentType === 'Connect') {
    return <Contact content={content} />;
  } else if (contentType === 'Impact') {
    return <Impact content={content} />;
  } else if (contentType === 'Projects') {
    return <Projects content={content} />;
  } else if (contentType === 'Team') {
    return <Team content={content} />;
  } else {
    return <IndividualPageContent content={content} />;
  }
}
function Page({ data: { content }, location }) {
  const contentType = content?.contentType?.name;
  return (
    <div className="page">
      <SEO title={content.seotitle} />
      <Header location={location}></Header>
      {innerContent(contentType, content)}
      <Footer location={location}></Footer>
    </div>
  );
}
export const query = graphql`
  query ($slug: String!) {
    content: sanityPage(slug: { current: { eq: $slug } }) {
      _id
      contentType {
        name
        id
      }
      Heading
      sectionHeadingPosition
      background {
        asset {
          gatsbyImageData(width: 2000, layout: CONSTRAINED)
        }
      }
      mobilebackground {
        asset {
          gatsbyImageData(width: 600, placeholder: BLURRED, layout: CONSTRAINED)
          id
        }
      }
      boxLocation
      backgroundColor {
        hex
      }
      content
      richcontent {
        children {
          _key
          _type
          marks
          text
        }
        list
        style
        _type
        _key
      }
      description
      hidetitle
      id
      name
      sectionContentCTAtext
      sectionContentCTAjumpId
      sectionContentCTApageLink {
        slug {
          current
        }
      }
      sectionContentCTAurl
      seotitle
      slug {
        current
      }
    }
  }
`;

export default Page;
