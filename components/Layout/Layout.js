import React from 'react';
//Componentes
import Header from './Header'
//Styled Components
import { Global, css } from '@emotion/core';

import Head from 'next/head';

const Layout = props => {
    return ( 
        <>
        <Global 
            styles={css`
                :root {
                    --gris: #3d3d3d;
                    --gris2: #6f6f6f;
                    --gris3: #e1e1e1;
                    --naranja: #DA552F;
                }

                html {
                    font-size: 62.5%;
                    box-sizing: border-box; /* Cuando le pones un ancho a un div y aparte se le pone un border */
                }

                *, *:before, *:after {
                    box-sizing: inherit;
                }

                body {
                    font-size: 1.6rem; /* = 16px */
                    line-height: 1.5;
                    font-family: 'PT Sans', serif;
                }

                h1,h2,h3 {
                    margin: 0 0 2rem 0;
                    line-height: 1.5;

                }

                h1,h2 {
                    font-family: 'Roboto Slab', serif;
                    font-weight: 700;
                }

                h3 {
                    font-family: 'PT Sans', serif;
                }

                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                a {
                    text-decoration: none;
                }
            `}
        />

        <Head>
            <title>Product Hunt Firebase Next</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" /> 
            <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" /> 
            <link href="/static/css/app.css" rel="stylesheet" />
            <link href="/static/css/app.css" rel="stylesheet" />
        </Head>

        <Header />

        <main>
            {props.children}
        </main>
        </>
     );
}
 
export default Layout;