import app from 'firebase/app';
import 'firebase/auth'; //Importar la autenticacion de firebase
import 'firebase/firestore'; //Importar firestore
import 'firebase/storage'; //Importar el storage

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    //MÉTODOS
    //Registrar usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({ //Añade e nombre del usuario y lo retorna
            displayName: nombre
        })
    }

    //Iniciar Sesion 
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password) //Retorna el usuario
    }

    //Cerrar Sesion
    async cerrarSesion() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;