export default function validarIniciarSesion (valores) {

    let errores = {};

    //Validar email del usuario
    if(!valores.email) {
        errores.email = 'El email es obligatorio';
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = 'El email es inválido'
    }

    //Validar password del usuario
    if (!valores.password) {
        errores.password = 'El password es obligatorio';
    } else if (valores.password.length < 6) {
        errores.password = 'El password debe tener mínimo 6 caracteres'
    }

    return errores;
}