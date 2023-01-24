import React from 'react';
import { Layout } from './src/components/Layout';
import type { GatsbySSR } from 'gatsby';
import { Helmet } from 'react-helmet';

export const onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
  const helmet = Helmet.renderStatic();
  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ]);
};

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();

  headComponents.sort((x: any, y: any) => {
    if (x.props && x.props['data-react-helmet']) {
      return -1;
    } else if (y.props && y.props['data-react-helmet']) {
      return 1;
    }
    return 0;
  });

  replaceHeadComponents(headComponents);
};
export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;
