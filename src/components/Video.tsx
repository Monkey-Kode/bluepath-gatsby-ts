import { useStaticQuery } from 'gatsby';
import React, { useEffect, useRef } from 'react';
import getytid from 'get-youtube-id';
import styled from 'styled-components';
import { graphql } from 'gatsby';
// import Sound from '../images/sound.svg';
// import Mute from '../images/mute.svg';
// import { BiDownArrow } from 'react-icons/bi';
// import TriangleFull from '../images/triangle-full.svg';
import TriangleOutline from '../images/triangle-outline.svg';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { GatsbyImage } from 'gatsby-plugin-image';
const StyledVideo = styled.video`
  max-width: 100vw;
  margin-bottom: -4px;
  position: relative;
  z-index: 1;
  height: 100vh;
  background-color: black;
  object-fit: cover;
  object-position: center center;
`;

const StyledButtonsWrapper = styled.div`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  right: 2%;
  bottom: 2%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledSoundButton = styled.button`
  background: none;
  padding: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  svg {
    pointer-events: none;
    opacity: 0.8;
    fill: white;
    &.jump-down {
      width: 35px;
      height: auto;
      transform: translateY(-2px);
    }
  }
  #mute-icon,
  #sound-icon {
    color: white;
    font-weight: 400;
    font-size: 1rem;
    pointer-events: none;
  }
  &[data-state='mute'] {
    #mute-icon {
      display: none;
    }
  }
  &[data-state='unmute'] {
    #sound-icon {
      display: none;
    }
  }
`;

function Sound() {
  return <span id="sound-icon">UNMUTE</span>;
}
function Mute() {
  return <span id="mute-icon">MUTE</span>;
}
function Video({ content: { anchorId } }) {
  const videoRef = useRef(null);
  const videoSrcRef = useRef(null);
  const {
    videos: { nodes },
  } = useStaticQuery(graphql`
    query {
      videos: allSanityHomevideo {
        nodes {
          id
          name
          youtubeLink {
            url
          }
          video {
            asset {
              url
              title
              mimeType
            }
          }
          mobileVideo {
            asset {
              url
              title
              mimeType
            }
          }
          videoPoster {
            asset {
              gatsbyImageData(
                width: 2000
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const videoElement = videoRef.current;
    const videoSrcElement = videoSrcRef.current;
    // console.log('video src element', videoSrcElement);
    if (videoSrcElement !== undefined) {
      const desktopMq = window.matchMedia('(min-width: 800px)');
      // console.log('videoElement', videoElement);
      if (desktopMq.matches) {
        videoSrcElement.type = videoElement.dataset.type;
        videoSrcElement.src = videoElement.dataset.src;
        // console.log(videoElement.dataset.src);
        // videoDesktopSource.play();
      } else {
        videoSrcElement.type = videoElement.dataset.mobiletype;
        videoSrcElement.src = videoElement.dataset.mobilesrc;
        // console.log('video src', videoSrcElement);
      }
    }
    videoElement.play();
  }, [videoRef]);

  const setSound = (e) => {
    if (videoRef) {
      const video = videoRef.current;
      // console.log(video);
      // console.log(video.muted);

      video.muted = !video.muted;
      e.target.setAttribute('data-state', video.muted ? 'mute' : 'unmute');
    }
  };

  const video = nodes[0];

  if (video.video || video.mobileVideo) {
    // const name = video.name;
    const url = video.video.asset.url;
    const mobileUrl = video.mobileVideo.asset.url;
    const mimeType = video.video.asset.mimeType;
    const mobileMimeType = video.mobileVideo.asset.mimeType;
    return (
      <>
        <StyledButtonsWrapper className="sound-button">
          <StyledSoundButton data-state="mute" onClick={setSound}>
            <Sound />
            <Mute />
          </StyledSoundButton>
          <StyledSoundButton
            className="jump-button"
            onClick={(e) => {
              e.preventDefault();
              // const video = videoRef.current;
              // video.pause();
              if (typeof window !== 'undefined') {
                const mql = window.matchMedia('(max-width: 800px)');
                console.log(mql);
                if (!mql.matches) {
                  scrollTo('#carousel');
                } else {
                  scrollTo('#bottom-video');
                }
              }
            }}
          >
            <TriangleOutline className="jump-down" />
            {/* <TriangleFull className="jump-down" /> */}
          </StyledSoundButton>
        </StyledButtonsWrapper>
        <StyledVideo
          id="home-video"
          width="100%"
          height="100%"
          ref={videoRef}
          muted
          autoPlay
          data-src={url}
          data-mobilesrc={mobileUrl}
          data-type={mimeType}
          data-mobiletype={mobileMimeType}
          playsInline
        >
          <source ref={videoSrcRef}></source>
          Sorry, your browser doesn't support embedded videos.
          <GatsbyImage
            alt="Windows of a building"
            image={video.videoPoster?.asset?.gatsbyImageData}
          />
        </StyledVideo>
        <div id="bottom-video"></div>
      </>
    );
  } else if (video.youtubeLink) {
    const videos = nodes.flatMap((video) => ({
      name: video.name,
      url: video.youtubeLink[0].url,
    }));
    const { name, url } = videos[0];
    const id = getytid(url);
    return (
      <section id={`#${anchorId}`}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={name}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </section>
    );
  }
  return 'Missing Video';
}

export default Video;
