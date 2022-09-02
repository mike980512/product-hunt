import React, { useState, useEffect } from 'react'

const useValidacion = (stateInitial, validar, funcion) => {
    //State del hook
    const [valores, setValores] = useState(stateInitial);
    const [errores, setErrores] = useState({});
    const [submitform, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitform){
            const noErrores = Object.keys(errores).length === 0;

            //Si no hay errores...
            if(noErrores) funcion(); //Ejecutar la funcion que se le pase como parametro

            setSubmitForm(false); //Limpiar
        }
    },[errores])

    //Funcion para manejar el onChange
    const handlerOnChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Funcion para manejar el onSubmit
    const handlerOnSubmit = e => {
        e.preventDefault();
        const validarErrores = validar(valores); //Ejecutar funcion para validar
        setErrores(validarErrores);
        setSubmitForm(true);
    }

    //Funcion para manejar el onBlur
    const handlerOnBlur = e => {
        const validarErrores = validar(valores); //Ejecutar funcion para validar
        setErrores(validarErrores);
    }

    return {
        valores,
        errores,
        handlerOnChange,
        handlerOnSubmit,
        handlerOnBlur
    };
}
 
export default useValidacion;