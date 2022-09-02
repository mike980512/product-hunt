export default function validarCrearProducto (valores) {

    let errores = {};

    //Validar nombre del producto
    if(!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    } 

    //Validar nombre de la empresa
    if(!valores.empresa) {
        errores.empresa = 'La empresa es obligatorio';
    } 

    //Validar url de la empresa
    if(!valores.url) {
        errores.url = 'La URL es obligatoria';
    }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url= 'URL no válida'
    }

    //Validar imagen del producto
    if(!valores.descripcion) {
        errores.descripcion = 'La descripción es obligatorio';
    }

    return errores;
}