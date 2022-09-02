import React from 'react';
import { Layout } from './src/components/Layout';
import 'normalize.css';
import scrollTo from 'gatsby-plugin-smoothscroll';
import type { GatsbyBrowser } from 'gatsby';
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location.pathname === '/' && prevLocation !== null) {
    scrollTo('#carousel');
  }
};
