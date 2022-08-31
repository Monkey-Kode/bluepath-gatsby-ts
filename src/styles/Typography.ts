import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
    body *{
        letter-spacing: 1.2px;
    }
    p, h1, h2, h3, h4, h5{
        color: white;

    }
    p {
        line-height: 1.75;
        font:1rem
    }
    a {
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
    }
    h2 {
        font-size: 2rem;
    }

    @media only screen and (max-width: 800px) {
        h1 {
            font-size: 5.5vw;
            max-width: 100vw;
        }
        h2 {
            font-size: 1.4rem;
            margin-bottom: .8rem;
        }

    }

`;

export default Typography;
