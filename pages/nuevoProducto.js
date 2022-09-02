import React, { Fragment, useState, useContext, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
//Importar firebase
import { FirebaseContext } from "../firebase";
//Importar componente de firebase para subir archivos
import FileUploader from "react-firebase-file-uploader";
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
import validarCrearProducto from "../validacion/validarCrearProducto";
//Importar Componente de Error
import Error404 from "../components/Layout/404";

//State local
const State_Inicial = {
  nombre: "",
  empresa: "",
  //imagen: '',
  url: "",
  descripcion: "",
};

export default function NuevoProducto() {
  //State de la imagen
  const [nombreimagen, setNombreImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlImagen] = useState("");

  const [error, setError] = useState(false);
  //Context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(()=> {
    if(!usuario) router.push('/');
  },[usuario])

  //Usar custom hook
  const {
    valores,
    errores,
    handlerOnChange,
    handlerOnSubmit,
    handlerOnBlur,
  } = useValidacion(State_Inicial, validarCrearProducto, crearProducto);

  //Hook de useRouter para redireccionar
  const router = useRouter();

  //Extrae valores
  const { nombre, empresa, url, descripcion } = valores;

  async function crearProducto() {
    //Si no esta autenticado...
    if (!usuario) {
      return router.push("/login");
    }
    //Si esta autenticado... crear objeto del nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: []
    };

    //Insertarlo en la base de datos
    firebase.db.collection("productos").add(producto);
    return router.push("/");
  }

  //Handlers de la imagen
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleProgress = (progreso) => setProgreso({ progreso });

  const handleUploadError = (error) => {
    setSubiendo(error);
    console.log(error);
  };

  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImagen(url);
      });
  };

  return (
    <Layout>
      {!usuario ? (
        <Error404 mensaje="No se puede mostrar"/>
      ) : (
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Nuevo Producto
          </h1>
          <Formulario onSubmit={handlerOnSubmit} noValidate>
            <fieldset>
              <legend>Información General del Producto</legend>
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
              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa:</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Introduce empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handlerOnChange}
                  onBlur={handlerOnBlur}
                />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen:</label>
                <FileUploader
                  accept="image/*" //Imagenes de cualquier formato
                  id="imagen"
                  name="imagen"
                  randomizeFilename //Genera un nuevo nombre aleatorio
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo>
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  id="url"
                  placeholder="Ingresa la URL"
                  name="url"
                  value={url}
                  onChange={handlerOnChange}
                  onBlur={handlerOnBlur}
                />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>

              <Campo>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  type="descripcion"
                  placeholder="Esta app sirve para..."
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handlerOnChange}
                  onBlur={handlerOnBlur}
                />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear Producto" />
          </Formulario>
        </Fragment>
      )}
    </Layout>
  );
}
