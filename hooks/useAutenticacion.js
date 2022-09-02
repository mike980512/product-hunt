import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function useAutenticacion () {

    const [ usuarioautenticado, setUsuarioAutenticado ] = useState(null);

    useEffect(()=> {
        const unsuscribed = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario) {
                setUsuarioAutenticado(usuario)
            } else {
                setUsuarioAutenticado(null);
            }
        });
        return () => unsuscribed();
    }, [])

    return usuarioautenticado;
}

export default useAutenticacion;