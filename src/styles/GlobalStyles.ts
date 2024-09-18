import { createGlobalStyle } from "styled-components";
// import arrowRight from '../images/arrow-right.png';
// import arrowLeft from '../images/arrow-left.png';
const GlobalStyles = createGlobalStyle`
    :root{
        --blue: #004181;
        --blue2: rgba(0, 65, 129, .8);
        --blueRGB: rgba(0, 65, 129, .85);
        --orange: #F5AC3F;
        --gray: #6e7c85;
        --gray2: #616567;
        --mobile: 800;
        --tablet: 1024;
        --portrait: 768;
        --phone: 375;
        --desktop: 1025;
        --laptop: 1920px;
        --border-left: 4px solid var(--orange);
        --border-right: 2px solid var(--orange);
        --border-bottom: 2px solid var(--orange);
        --small-content-width: 40vw;
        --mobile-header-height: 153px;
        --big-heading-size: 3rem;
        --big-heading-padding: .5em ;
        --box-width: 725px;
        --white: #fff;
    }


    html , body{
        overflow-x: hidden;
        width: 100%;
        padding: 0;
        margin:0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }


    .gatsby-image-wrapper::not(.no-pixel) img[src*=base64\\,] {
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;


    }

    img {
        max-width: 100%;
    }
    section {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height:100vh;
        padding: 2vw;
        scroll-snap-align: start;
        width: 100vw;

        @media only screen and ( max-width: 800px) {
            display: block;
            padding: 0px;
        }
        > div {
            width: 100%;
        }
        > div:not(.team-wrapper):not([class*="Contact"]):not([class*="Impact"]){
            display: flex;
            align-items:center;
            @media only screen and ( max-width: 800px) {
                background-color: var(--blue);
            }
        }

    }


    main{
        scroll-snap-type: mandatory;
        scroll-snap-points-y: repeat(100vh);
        scroll-snap-type: y mandatory;
        > * {
            scroll-snap-align: start;
        }
    }
    a {
        color: var(--blue);
    }

    .wrap {
        max-width: var(--laptop);
        margin: 0 auto;
        width: 100%;
    }

    .box {
        padding: 0 0 1rem;
        margin-left: 6vw;
        background: var(--blueRGB);
        &.Terms, &.Privacy {
            @media only screen and (min-width: 480px) {
                margin-top: 135px;
            }
        }
        ${"" /* border-left: var(--border-left); */}
         &[class*="Carousel"] {
            ${"" /* border-left: none; */}
            ${"" /* border-right: var(--border-right); */}
         }
        @media only screen and (max-width: 480px) {
           margin: 0 auto;
        }
        * {
            color: white;
        }
        h2 {
            font-size: var(--big-heading-size);
            text-align: center;
            color: white;
            padding: .5em 0;
            margin: 0 1em;
            border-bottom: var(--border-bottom);
            @media only screen and (max-width: 480px) {
                font-size: 2rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
            }
        }
        p {
            color:white;
            padding-top: 1.5rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            padding-bottom: 0;
            margin:0;
        }
    }

    .hide-for-desktop {
        display: none !important;
        @media only screen and (max-width: 480px) {
            display: block !important;
        }
    }
    .hide-for-mobile {
        display: block !important;
        @media only screen and ( max-width: 479px) {
            display: none !important;
        }
    }


    form {
        p {
            padding: .5rem;
            margin: 0;
        }
    }

    input , textarea, select{
        appearance: none;
        background-color: white;
        border: none;
        width: 100%;
        padding: 0.4rem;
        &::placeholder{
            text-transform: uppercase;
        }
    }
    input[type="submit"], button{
        background-color: var(--orange);
        appearance: none;
        border: none;
        padding: .5rem 1.3rem;
    }
    button {
        cursor: pointer;
    }
    button:focus{
        outline: 0;

    }

    span {
    color: white;
    }
    a {

        display: block;
        padding-top: 10px;
        text-transform: none !important;
    }
    section {
        a:not([class*="thumb"]) {
            ${"" /* color: white; */}
        }
    }

    .box {
        .wrap {
            ${"" /* background: var(--blueRGB); */}
            padding-bottom: 1.5em;
        }
        p {
            text-align: justify;
            line-height: 1.9;
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 300;
            @media only screen and (max-width: 800px) {
                text-align: left;
            }
        }
        a {
            font-weight: 400;
            color: white
        }
    }


    .inactive, .active {
        transition: all .5s ease-in-out;
        h2 {
            transition: all .5s ease-out;
            transition-delay: 250ms;
        }
        .wrap {
            transition: opacity 1s ease-in-out;
            transition-delay: 500ms;
        }
        p {
            transition: opacity 1s ease-in-out;
            transition-delay: 1000ms;
        }
        a {
            transition: opacity 1s ease-in-out;
            transition-delay: 1250ms;
        }
    }

    .inactive {
        opacity: 0;

        h2 {
            opacity: 0;

        }
        .wrap {
            opacity: 0;
        }
        p {
            opacity: 0;
        }
        a {
            opacity: 0;
        }
    }
    .active {
        opacity: 1;

        h2 {
            opacity: 1;

        }
        .wrap {
            opacity: 1;
        }
        p {
            opacity: 1;
        }
        a {
            opacity: 1;
        }
    }

    .left, .right {
        display: flex;
        @media only screen and (min-width: 1025px) {
            margin-top: 107px;
        }
    }

    .left {
        justify-content: flex-start;
     }
    .right {
        .inactive {
            h2 {
                opacity: 0;
            }
        }
            justify-content: flex-end;
            .box {
                ${"" /* border-left: none; */}
                ${"" /* border-right: var(--border-right); */}
                h2 {
                    text-align: center;

                }
            }


     }
    .center {

            justify-content: center;


     }


    .page {
        @media only screen and ( max-width: 800px) {
            section {
                padding: var(--mobile-header-height) 5% 5%;

            }
            .hide-for-desktop.image-atop + section {
                padding-top: 10%;
            }
            .hide-for-desktop.image-atop {
                padding-top: var(--mobile-header-height);
            }
        }
        .light-logo {
            display:none;
        }
    }

    .box {
        width: var(--box-width) ;
        @media only screen and ( max-width: 800px) {
            width: auto;
            max-width: 100%;
            margin: 3%;

            p {
                font-size: .75rem;
        }
    }

    #impact-boxes {
        > div:first-child{
            p {
                font-weight: 800;
                text-align: right;
            }
        }
    }


    .alignfull {
        margin: 32px calc(50% - 50vw);
        max-width: 100vw;
        width: 100vw;
    }

    .hidden {
        display: none;
    }

`;

export default GlobalStyles;
