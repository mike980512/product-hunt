import React, { useState, useEffect, useContext } from 'react';
import {FirebaseContext} from '../firebase';

const useProductos = orden => {
  //State
  const [ productos, setProductos ] = useState([]);

  //Extraer el context
  const { firebase } = useContext(FirebaseContext);

  useEffect(()=> {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot)
    }

    obtenerProductos();
  }, [])

  function manejarSnapshot (snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    setProductos(productos);
  }
  //Esto devuelve el hook
  return {
      productos
  }
}

export default useProductos;

