import React from 'react';
import styled from 'styled-components';
// import { RADIUS } from './Theme';
// import { GOOGLE_MAP_URL } from 'constants/constants';
import { Box } from './StyledSystem';
import MapContainer from './MapContainer';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`;

const MapWrapper = styled(Box)`
  position: sticky;
  top: 0;
  height: 100vh;
`;

const MapElement = styled(Box)`
  .gm-ui-hover-effect {
    display: none !important;
  }
  .gm-style .gm-style-iw-t::after {
    display: none;
  }
  .gm-style-iw.gm-style-iw-c {
    padding: 0;
    .gm-style-iw-d {
      overflow: hidden !important;
    }
  }
  .gmnoprint.gm-bundled-control.gm-bundled-control-on-bottom {
    top: 0;
  }
`;

const Map = (props) => (
  <MapWrapper>
    <MapContainer
      googleMapURL={GOOGLE_MAP_URL}
      loadingElement={<Box height="100%" />}
      containerElement={<Box height="100%" />}
      mapElement={<MapElement height="100%" />}
      {...props}
    />
  </MapWrapper>
);

export default Map;
