import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout'
import Producto from '../components/Layout/DetallesProducto';
import useProductos from '../hooks/useProductos';
//Importar context de firebase
import { useRouter } from 'next/router';


export default function Buscar() { 

  //Recibir los datos de la busqueda(query)
  const router = useRouter();
  const { query: {q} } = router;

  //Usando el custom hook
  const {productos} = useProductos('creado')
  //State local
  const [ productosFiltadros, setProductosFiltrados ] = useState([])

  useEffect(()=> {
    const busqueda = q.toLowerCase(); //Convertir el query a minusculas
    
    //Hacer el filtrado segun el query
    const filtrado = productos.filter( producto => { 
      return (
        producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    setProductosFiltrados(filtrado);

  }, [q,productos])

    

  return (
    <div>
      <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {productosFiltadros.map(producto => (
              <Producto 
                key={producto.id}
                producto={producto}
              />
            ))}
          </ul>
        </div>
      </div>
      </Layout>
    </div>
  )
}
