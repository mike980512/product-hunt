import React from 'react';
import Layout from '../components/Layout/Layout';
import Producto from '../components/Layout/DetallesProducto';
import useProductos from '../hooks/useProductos';
//Importar context de firebase
import { useRouter } from 'next/router';

export default function Home() {

  //Recibir los datos de la busqueda(query)
  const router = useRouter();
  const { query: {q} } = router;

  //Usar el custom hook
  const {productos} = useProductos('creado')

  return (
    <div>
      <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {productos.map(producto => (
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
