// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { MAP_SETTINGS } from '../utils/MAP_SETTINGS';
// import { graphql, useStaticQuery } from 'gatsby';
// import icon from '../images/marker.svg';

import { GoogleMap, Marker } from 'react-google-maps';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';

const {
  MARKER_SIZE,
  DEFAULT_ZOOM,
  DEFAULT_CENTER,
  DEFAULT_MAP_OPTIONS,
  // PIXEL_OFFSET,
  // DIRECTIONS_OPTIONS,
} = MAP_SETTINGS;

const MapContainer = ({
  origins,
}: {
  origins: Queries.ProjectsMapQuery['allSanityCasestudies']['nodes'];
}) => {
  const mapRef = useRef(null);
  const iconSize = 15;
  const locationIconActive = `https://cdn.sanity.io/images/qwwmf79r/production/92e3b97802b396d49b4afba22a2226ce29e20f1b-54x54.png?h=${iconSize}&fit=max`;
  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds();
    origins.forEach(({ coordinates: { lat, lon } }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lon));
    });
    mapRef.current.fitBounds(bounds);
    console.log('origins', origins);
  }, [origins]);
  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_CENTER}
      defaultOptions={{ ...DEFAULT_MAP_OPTIONS }}
    >
      {window !== undefined &&
        origins.map(({ location: { lat, lng }, id }) => (
          <Marker
            key={id}
            position={{ lat, lng }}
            icon={{
              url: locationIconActive,
              scaledSize: new window.google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            }}
          />
        ))}
    </GoogleMap>
  );
};

export default withGoogleMap(
  ({
    origins,
  }: {
    origins: Queries.ProjectsMapQuery['allSanityCasestudies']['nodes'];
  }) => {
    return <MapContainer origins={origins} />;
  }
);
