import React from 'react';
import Carousel from './Carousel';
import Plain from './Plain';
import Projects from './Projects';
import Video from './Video';
import Team from './Team';

function PageContent({ content }) {
  const contentType = content.contentType.name;

  if (contentType === 'Video') {
    return <Video key={content.id} content={content}></Video>;
  } else if (contentType === 'Carousel') {
    return <Carousel key={content.id} content={content} />;
  } else if (contentType === 'Projects') {
    return <Projects key={content.id} content={content} />;
  } else if (contentType === 'Team') {
    return <Team key={content.id} content={content} />;
  } else {
    return <Plain key={content.id} content={content} />;
  }
}

export default PageContent;
