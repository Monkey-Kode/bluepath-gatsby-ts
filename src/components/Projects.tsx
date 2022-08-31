import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef, useEffect } from 'react';
import mapMarker from '../images/marker.png';
import InfoWindow from './InfoWindow';
import { renderToString } from 'react-dom/server';
import { loader } from '../utils/loader';

function Projects({ content: { anchorId } }) {
  const {
    caseStudies: { nodes: projects },
  } = useStaticQuery(graphql`
    query Projects {
      caseStudies: allSanityCasestudies {
        nodes {
          id
          financing
          entity
          content
          address
          image {
            asset {
              gatsbyImageData(
                width: 300
                layout: CONSTRAINED
                placeholder: BLURRED
              )
              metadata {
                lqip
              }
            }
          }
          technologies
          title
          size
          location {
            lat
            lng
            alt
            _key
          }
        }
      }
    }
  `);
  const ref = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 600px)');
    const mapOptions = {
      center: {
        lat: 39.8283,
        lng: -98.5795,
      },
      zoom: 5,
      mapId: 'f909f5ad32968c2a',
    };

    if (mql.matches) {
      mapOptions.zoom = 3.5;
    }

    loader.load().then(() => {
      let activeInfoWindow;
      const allMarkers = [];
      // let currentMark;
      // const bounds = new window.google.maps.LatLngBounds();
      const map = new window.google.maps.Map(ref.current, mapOptions);

      projects.map((project) => {
        const infowindow = new window.google.maps.InfoWindow({
          content: renderToString(<InfoWindow project={project} />),
        });
        const iconSize = 15;
        // console.log(project?.location);
        // const { lat, lng } = project?.location;
        // bounds.extend(new window.google.maps.LatLng(lat, lng));

        const icon = {
          url: mapMarker,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new window.google.maps.Size(iconSize, iconSize),
          // The origin for this image is (0, 0).
          origin: new window.google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new window.google.maps.Point(0, 0),
          optimized: false,
        };
        const marker = new window.google.maps.Marker({
          position: project.location,
          map,
          title: allMarkers.length.toString(),
          icon,
        });

        allMarkers.push(marker);

        const myoverlay = new window.google.maps.OverlayView();
        myoverlay.draw = function () {
          this.getPanes().markerLayer.id = 'markerLayer';
        };
        myoverlay.setMap(map);

        marker.addListener('click', function () {
          const thisTitle = Number(this.title);
          const index = thisTitle + 2;
          // currentMark = this;
          document.querySelectorAll(`#markerLayer div img`).forEach((img) => {
            img.classList.remove('grow');
            img.classList.remove('shrink');
          });

          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infowindow.open(map, marker);
          activeInfoWindow = infowindow;

          document
            .querySelector(`#markerLayer div:nth-child(${index}) img`)
            .classList.add('grow');
        });

        marker.addListener('mouseover', function () {
          const thisTitle = Number(this.title);
          const index = thisTitle + 2;
          // document.querySelectorAll(`#markerLayer div img`).forEach((img) => {
          //   img.classList.remove('grow');
          //   img.classList.remove('shrink');
          // });
          // console.log('mouseover', index);
          // console.log('activeInfoWindow', activeInfoWindow);
          if (!activeInfoWindow) {
            const image = document.querySelector(
              `#markerLayer div:nth-child(${index}) img`
            );

            image.classList.remove('shrink');
            image.classList.add('grow');
          }
        });

        marker.addListener('mouseout', function () {
          const thisTitle = Number(this.title);
          const index = thisTitle + 2;
          if (!activeInfoWindow) {
            const image = document.querySelector(
              `#markerLayer div:nth-child(${index}) img`
            );
            image.classList.remove('grow');
            image.classList.add('shrink');
            image.classList.remove('shrink');
          }
        });

        infowindow.addListener('closeclick', function () {
          // console.log(currentMark.title);
          // const thisTitle = Number(currentMark.title);
          // const index = thisTitle + 2;
          document.querySelectorAll(`#markerLayer div img`).forEach((img) => {
            img.classList.remove('grow');
            img.classList.remove('shrink');
          });
          activeInfoWindow = null;
        });

        return project;
      });
      // map.fitBounds(bounds);
    });
  }, [projects]);

  return <section id={anchorId} ref={ref}></section>;
}

export default Projects;
