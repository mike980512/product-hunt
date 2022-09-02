import React from 'react';
import Layout from '../components/Layout/Layout';
import Producto from '../components/Layout/DetallesProducto'
import useProductos from '../hooks/useProductos';

export default function Populares() {

  const {productos} = useProductos('votos')

  return (
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
  )
}
