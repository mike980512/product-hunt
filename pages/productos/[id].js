import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
//Estilos
import Layout from '../../components/Layout/Layout';
import  {css} from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/UI/Formulario';
import Boton from '../../components/UI/Boton';
//Importar date-fns, para darle formato a la fecha
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';
//Importar context de firebase
import { FirebaseContext } from '../../firebase';
//Importar error 
import Error404 from '../../components/Layout/404';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: gray;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {
    //State local
    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState(false);
    const [ comentario, setComentario ] = useState({mensaje:''})

    //Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router; //Destructuring para obtener el id que se encuentra en la URL

    const { firebase, usuario } = useContext(FirebaseContext);
   

    useEffect(() => {
        if(id) { //Si ya existe un id...
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();                
                producto.exists ? setProducto(producto.data()) : setError(true);
            }
            obtenerProducto();
        }
    }, [id])

    if(Object.keys(producto).length === 0) return <p>Cargando...</p>

    //Destructuring al producto
    const { creador, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, haVotado } = producto;
    //Destructuring al comentario
    const {mensaje} = comentario;

    //onClick del boton "votar"
    const handlerVotar = () => {
        if(!usuario){
            return router.push("/");
        } 
        //Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) { //Comprueba si el ID del user ya ha votado
            return;
        } 
        //Obtener votos y sumar nuevo voto
        const nuevoTotalVotos = votos + 1; 
        //Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];
        //Actualizar en la BD
        firebase.db.collection("productos").doc(id).update({votos: nuevoTotalVotos, haVotado: nuevoHaVotado}) //Query para actualizar los votos en firebase
        //Actualizar state
        setProducto({
            ...producto,
            votos: nuevoTotalVotos,
            haVotado: nuevoHaVotado
        })
    }

    //onChnge de comentarios
    const OnChangeComentarios = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    //Identifica si es el creador
    const esCreador = id => {
        if(creador.id === id) return true;
    }
    //onSubmit del comentario
    const handlerComentario = e => {
        e.preventDefault();

        if(!usuario){ //Si el usuario esta autenticado...
            return router.push("/");
        } 

        //Informacion del comentario
        comentario.usuarioId = usuario.uid;
        comentario.nombre = usuario.displayName;

        //Agregar el comentario a un nuevo array de comentarios
        const nuevosComentarios = [...comentarios, comentario]

        //Agregar a la BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        //Agregarlo al state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        //Reset al comentario
        setComentario( {mensaje: ''} )
    }

    //onClick de "Eliminar Producto"
    const handlerEliminarProducto = async() => {
        if(!usuario){ //Si el usuario esta autenticado...
            return router.push("/login");
        } 
        if(usuario.id !== creador.uid){ //Si no es el creador...
            return router.push("/");
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push("/");          
        } catch (error) {
            console.log("ubo un error")
        }

    }
    return ( 
        <Layout>
            <>
                { error ? <Error404 mensaje="Error 404"/> : (
                    <div className="contenedor">
                    <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >{nombre}</h1>

                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: { formatDistanceToNow(new Date(creado), {locale: es}) }</p>
                            <p>Por: {creador.nombre} de {empresa}</p>

                            <img src={urlimagen} />

                            <p>{descripcion}</p>

                            {usuario && (
                                <>
                                <h2>Agrega tu comentario</h2>
                                <form
                                    onSubmit={handlerComentario}
                                >
                                    <Campo>
                                        <input  
                                            type="text"
                                            name="mensaje"
                                            value={mensaje}
                                            onChange={OnChangeComentarios}
                                        />
                                    </Campo>
                                    <InputSubmit
                                        type="submit" 
                                        value="Agregar Comentario"                              
                                    />
                                </form>
                                </>
                            )}
                                
                            <h2
                                css={css`margin: 2rem 0;`}
                            >Comentarios</h2>
                            {comentarios.length === 0 ? 'No hay comentarios' : (
                                <ul>
                                {comentarios.map((comentario, i) => (
                                    <li 
                                        css={css`border: 1px solid #e1e1e1; padding: 1rem; margin-bottom:2rem;`}
                                        key={`${comentario.usarioId}-${i}`}>
                                        <p>{comentario.mensaje}</p>
                                        <p 
                                            css={css`margin-top:-1.5rem;`}
                                        >Escrito por: <span css={css`font-weight: 700;`}>{comentario.nombre}</span>
                                        </p>
                                        { esCreador(comentario.usuarioId) && <CreadorProducto>Creador</CreadorProducto> }
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                primario
                                href={url}
                            >Visitar URL
                            </Boton>

                            <div css={css`margin-top: 5rem;`}>
                                <p css={css`text-align: center;`}>{votos} Votos</p>
                                { usuario && <Boton onClick={handlerVotar}>Votar</Boton> }

                            </div>
                        </aside>
                    </ContenedorProducto>
                    { usuario && esCreador(usuario.uid) && <Boton onClick={handlerEliminarProducto}>Eliminar Producto</Boton> }
                </div>
                ) }                
            </>
        </Layout>
     );
}

export default Producto;