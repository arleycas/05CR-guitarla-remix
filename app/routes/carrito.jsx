import { useState, useEffect } from 'react';
import { useOutletContext } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import styles from '~/styles/carrito.css'

export const meta = () => ({
  title: `GuitarLA - Carrito de compras`,
  description: `Venta de guitarras, música, tienda`
});

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function Carrito() {

  const [ total, setTotal ] = useState();
  const { arrCarrito, updateCantidad, deleteGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = arrCarrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
    setTotal(calculoTotal);
  }, [arrCarrito])
  

  return (
    <ClientOnly fallback={'Cargando...'}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>

          <div className="contenido">

            <div className="carrito">
              <h2>Articulos</h2>

              {
                arrCarrito.length === 0 ? 'Carrito vacio' : (
                  arrCarrito.map( producto => (
                    <div 
                      key={producto?.id}
                      className='producto'>

                      <div>
                        <img src={producto.imagen} alt={`Producto ${producto.nombre}`} />
                      </div>

                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>Cantidad:</p>

                        <select 
                          value={producto.cantidad}
                          onChange={e => {updateCantidad({
                            cantidad: +e.target.value,
                            id: producto.id
                          })}}
                          className="select">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        <p className="precio">$ <span>{producto.precio}</span></p>
                        <p className="subtotal">Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                      </div>

                      <button
                        type='button'
                        onClick={() => deleteGuitarra(producto.id)}
                        className='btn_eliminar'>X</button>

                    </div>
                  ))
                )
              }

            </div>

            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>

          </div>

        </main>
      )}
    </ClientOnly>
  )
}
