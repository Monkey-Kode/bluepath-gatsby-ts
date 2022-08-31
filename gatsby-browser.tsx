import React from 'react';
import { Layout } from './src/components/Layout';
import 'normalize.css';
import scrollTo from 'gatsby-plugin-smoothscroll';
import type { GatsbyBrowser } from 'gatsby';

export const onClientEntry = async () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
    console.log(`👍 IntersectionObserver is polyfilled`);
  }

  // Object-fit/Object-position polyfill for gatsby-image (IE)
  const testImg = document.createElement(`img`);
  if (
    typeof testImg.style.objectFit === `undefined` ||
    typeof testImg.style.objectPosition === `undefined`
  ) {
    await import(`object-fit-images`)();
    console.log(`👍 Object-fit/Object-position are polyfilled`);
  }
};
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location.pathname === '/' && prevLocation !== null) {
    scrollTo('#carousel');
  }
};
