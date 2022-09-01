//@ts-nocheck
import { createGlobalStyle } from 'styled-components';
const CarouselStyles = createGlobalStyle`

.slick-list {
        .slick-slide {
            .box {
                transition: all .5s ease-in-out;
                transition-delay: 500ms;
                @media only screen and (max-width: 800px) {


                }
            }
            h2 {
                transition: all .5s ease-out;
                transition-delay: 1200ms;
                pointer-events: none;
                @media only screen and (max-width: 800px) {
                    font-size: 1.25rem;
                    text-align: center;

                }
            }
            p {
                transition: opacity .5s ease-in-out;
                transition-delay: 1700ms;
                @media only screen and (max-width: 800px) {



                }
            }
            .links{
                transition: opacity .5s ease-in-out;
                transition-delay: 1950ms;
                @media only screen and (max-width: 800px) {
                    a {
                        font-size: .7rem;
                    }

                }
            }
        }

    }
    .inactiveCarousel {
        .slick-slide {
            .box {

                opacity: 0;
                border-left: none;
            }
            h2 {
                opacity: 0;

            }
            .links, p {
                opacity: 0;
            }

        }

    }
    .activeCarousel {
        .slick-slide {
            .box {

                opacity: 0;
                border-left: none;
            }
            h2 {
                opacity: 0;

            }
            .links, p {
                opacity: 0;
            }

        }
        .slick-active {
            .box {
                opacity: 1;
                border-left: none;
                @media only screen and (max-width: 801px) {
                    ${'' /* transform: translateX(0%); */}
                    max-width: 95vw;
                }
            }
            h2 {
                opacity: 1;

                @media only screen and (max-width: 801px) {


                }
            }
            .links, p {
                opacity: 1;
            }
        }

    }
    .slick-next , .slick-prev{
        z-index: 1;
        width: 21px;
        height: 24px;
        &::before {
            background: url(${arrowRight}) no-repeat center center;
            background-size: 100%;
            color: transparent;
            width: 100%;
            height: 100%;
            line-height: 1;
            width: 21px;
            height: 24px;
            display: block;
            transform: scale(1.5);
            @media only screen and (max-width: 801px) {
                display: none;
            }
        }

    }
    .slick-next {
        right: 1%;
    }

   .slick-prev {
        left: 1%;
        &::before{
            background: url(${arrowLeft}) no-repeat center center;

        }
    }

`;

export default CarouselStyles;
