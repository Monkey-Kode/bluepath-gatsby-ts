import type { BuildArgs, GatsbyNode, ParentSpanPluginArgs } from 'gatsby';
// const path = require('path');
import { resolve } from 'path';
import { SanityEventResponse, SanityPageResponse } from './src/types';

const getPages = async ({ graphql, actions }: BuildArgs) => {
  const pageTemplate = resolve('./src/templates/Page.tsx');
  const { data } = (await graphql(`
    query GetPages {
      allSanityPage {
        nodes {
          description
          hidetitle
          id
          name
          slug {
            current
          }
          boxLocation
          background {
            asset {
              gatsbyImageData(
                width: 2000
                layout: CONSTRAINED
                placeholder: BLURRED
              )
              label
              metadata {
                lqip
              }
              url
            }
            crop {
              bottom
              left
              right
              top
            }
            hotspot {
              x
              y
              width
              height
            }
          }
        }
      }
    }
  `)) as SanityPageResponse;
  data?.allSanityPage.nodes.forEach((page) => {
    actions.createPage({
      path: `${page.slug.current}`,
      component: pageTemplate,
      context: {
        slug: page.slug.current,
      },
    });
  });
};

async function getEvents({ graphql, actions }: BuildArgs) {
  const pageTemplate = resolve('./src/templates/Event.tsx');
  const { data } = (await graphql(`
    query GetEvents {
      allSanityEvent {
        nodes {
          name
          slug {
            current
          }
          content {
            _type
            children {
              _type
              text
            }
          }
          description
          eventAt
          image {
            asset {
              gatsbyImageData(
                width: 500
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `)) as SanityEventResponse;
  console.log('event', data);
  data?.allSanityEvent.nodes.forEach((event) => {
    actions.createPage({
      path: `event/${event.slug.current}`,
      component: pageTemplate,
      context: {
        slug: event.slug.current,
      },
    });
  });
}
export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([getPages(params), getEvents(params)]);
};
