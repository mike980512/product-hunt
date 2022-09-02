import React, { Fragment, useState } from "react";
import Layout from "../components/Layout/Layout";
import Router from "next/router";
//Importar firebase
import firebase from "../firebase";
//Importar estilos (styled-components)
import { css } from "@emotion/core";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/UI/Formulario";
//Importar custom hook
import useValidacion from "../hooks/useValidacion";
//Importar validacion
import validarIniciarSesion from "../validacion/validarIniciarSesion";

//State local
const State_Inicial = {
  email: "",
  password: "",
};

export default function Login() {
  const [error, setError] = useState(false);

  //Usar custom hook
  const {
    valores,
    errores,
    handlerOnChange,
    handlerOnSubmit,
    handlerOnBlur,
  } = useValidacion(State_Inicial, validarIniciarSesion, iniciarSesion);

  //Extrae valores
  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
      //console.log(usuario)
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al iniciar sesion", error.message);
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
        >
          Iniciar Sesión
        </h1>
        <Formulario onSubmit={handlerOnSubmit} noValidate>
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

          {errores.email && <Error>{errores.email}</Error>}

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

          {errores.password && <Error>{errores.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Formulario>
      </Fragment>
    </Layout>
  );
}
