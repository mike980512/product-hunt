import React, { Fragment, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Router from 'next/router';
//Importar firebase
import firebase from '../firebase'
//Importar estilos (styled-components)
import { css } from '@emotion/core';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario'
//Importar custom hook
import useValidacion from '../hooks/useValidacion';
//Importar validacion
import validarCrearCuenta from '../validacion/validarCrearCuenta';

 //State local
 const State_Inicial = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {

  const [ error, setError ] = useState(false);

  //Usar custom hook
  const { valores, errores, handlerOnChange, handlerOnSubmit, handlerOnBlur } = useValidacion(State_Inicial, validarCrearCuenta, crearCuenta)

  //Extrae valores
  const { nombre, email, password } = valores;

     async function crearCuenta() {
      try {
        //Crear cuenta en firebase
        await firebase.registrar(nombre, email, password); 
        Router.push('/');
      } catch (error) {
        console.error('Hubo un error al crear el usuario', error.message); //Acceder al error de firebase
        setError(error.message);
      }
    }

  return (
    <Layout>
      <Fragment>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >Crear Cuenta</h1>
        <Formulario
          onSubmit={handlerOnSubmit}
          noValidate
        >
          <Campo>
            <label htmlFor="nombre">Nombre:</label>
            <input 
              type="text"
              id="nombre"
              placeholder="Introduce nombre"
              name="nombre"
              value={nombre}
              onChange={handlerOnChange}
              onBlur={handlerOnBlur}
            />
          </Campo>

          {errores.nombre && <Error>{errores.nombre}</Error> }          

          <Campo>
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              id="email"
              placeholder="Introduce email"
              name="email"
              value={email}
              onChange={handlerOnChange}
              onBlur={handlerOnBlur}
            />
          </Campo>

          {errores.email && <Error>{errores.email}</Error> }

          <Campo>
            <label htmlFor="password">Password:</label>
            <input 
              type="password"
              id="password"
              placeholder="Introduce password"
              name="password"
              value={password}
              onChange={handlerOnChange}
              onBlur={handlerOnBlur}
            />
          </Campo>

          {errores.password && <Error>{errores.password}</Error> }

          {error && <Error>{error}</Error> }

          <InputSubmit 
            type="submit"
            value="Crear Cuenta"
          />
        </Formulario>
      </Fragment>
    </Layout>
  )
}

export default CrearCuenta;
