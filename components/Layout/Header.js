import React, { useContext } from 'react';
//Componentes
import Buscador from '../UI/Buscador';
import Navegacion from './Navegacion';
import Boton from '../UI/Boton'
import Router from "next/router";
import Link from 'next/link';
import { Fragment } from 'react'
//Estilos
import styled from '@emotion/styled';
import { css } from '@emotion/core';
//Importar context 
import { FirebaseContext } from '../../firebase'

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) { /*Cuando el ancho cambie a 768px...*/ 
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab';
    margin-right: 2rem;

    &:hover {
        cursor: pointer;
    }
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);

    const handlerCerrarSeion = () => {
        firebase.cerrarSesion();
        Router.push("/");
    }
    
    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    

                    <Buscador />

                    <Navegacion />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {usuario ? (
                        <Fragment>
                            <p
                            css={css`
                                margin-right: 2rem;
                            `}
                            >Hola {usuario.displayName}</p>

                            <Boton 
                                primario
                                onClick={() => handlerCerrarSeion()}    
                            >Cerrar Sesión</Boton>
                        </Fragment>                    
                    ): (
                        <Fragment>
                            <Link href="/login">
                                <Boton primario>Login</Boton>
                            </Link>

                            <Link href="/crearCuenta">
                                <Boton>Crear Cuenta</Boton>
                            </Link>
                        </Fragment>
                    )}
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;