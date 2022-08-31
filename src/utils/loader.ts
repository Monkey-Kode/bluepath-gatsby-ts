import { Loader } from '@googlemaps/js-api-loader';

export const loader = new Loader({
  apiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['drawing', 'geometry', 'places', 'visualization'],
  mapIds: ['f909f5ad32968c2a'],
});
