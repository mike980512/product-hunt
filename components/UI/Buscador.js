import React, { useState } from 'react';
import Router from 'next/router';

import styled from '@emotion/styled';
import { css } from '@emotion/core';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -999px;

    &:hover {
        cursor: pointer;
    }
`;

const Buscador = () => {
    //State local
    const [ busqueda, setBusqueda ] = useState('');

    //onSubmit del "Buscador"
    const handlerBuscar = e => {
        e.preventDefault();
        
        if(busqueda.trim() === '') return; //Si esta vacio el buscador

        //Redireccionar a "/buscar" y pasar como parametro el query
        Router.push({ 
            pathname: "/buscar",
            query: {q: busqueda}
        })
        
        setBusqueda('')
    }

    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={handlerBuscar}
        >
            <InputText 
                type="text"
                placeholder="Buscar Producto"
                value={busqueda}
                onChange={ e => setBusqueda(e.target.value) }
            />
            <InputSubmit type="submit"></InputSubmit>
        </form>
     );
}
 
export default Buscador
