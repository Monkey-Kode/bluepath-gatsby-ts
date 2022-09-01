import type { BuildArgs, GatsbyNode, PageProps } from 'gatsby';
// const path = require('path');
import { resolve } from 'path';
import { ArrElement } from './src/types';

const getPages = async ({ graphql, actions }: BuildArgs) => {
  const pageTemplate = resolve('./src/templates/Page.tsx');
  const { data }: any = await graphql(`
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
  `);
  data?.allSanityPage.nodes.forEach(
    (page: ArrElement<Queries.GetPagesQuery['allSanityPage']['nodes']>) => {
      if (page?.slug?.current) {
        actions.createPage({
          path: `${page.slug.current}`,
          component: pageTemplate,
          context: {
            slug: page.slug.current,
          },
        });
      }
    }
  );
};

async function getEvents({ graphql, actions }: BuildArgs) {
  const pageTemplate = resolve('./src/templates/Event.tsx');
  const { data }: any = await graphql(`
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
  `);
  console.log('event', data);
  data?.allSanityEvent.nodes.forEach(
    (event: ArrElement<Queries.GetEventsQuery['allSanityEvent']['nodes']>) => {
      if (!event?.slug?.current) {
        return null;
      }
      actions.createPage({
        path: `event/${event.slug.current}`,
        component: pageTemplate,
        context: {
          slug: event.slug.current,
        },
      });
    }
  );
}
export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([getPages(params), getEvents(params)]);
};
