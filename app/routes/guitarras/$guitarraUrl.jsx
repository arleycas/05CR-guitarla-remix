import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server";
/*
- Ojo el nombre de este archivo: $guitarraUrl (es obligatorio el "$" antes del nombre)  
- Cuando se haga una peticion a /guitarras/<nombre_guitarra> (mirar Guitarra.jsx) se va a llamar este archivo cuyo nombre va a ser como el "key" en la url 
  y este se obtiene con la función loader, parametro params. En este caso sería params.guitarUrl, asi se obtiene lo que se puso como "KEY" en la url 

  Ej: http://127.0.0.1:1337/api/guitarras/gibson

  con params obtenemos "gibson"
*/

export const meta = ({data}) => {

  if (!data) {
    return {
      title: 'Guitarra no encontrada',
      description: `Guitarras, venta de guitarras, guitarra no encontrada`
    }
  }

  // de esta forma podemos obtner la información que le llega al componente (usando loader) pero acá con la función meta
  const nombreGuitarra = data.data[0].attributes.nombre;

  return {
    title: `GuitarLA - ${nombreGuitarra}`,
    description: `Guitarras, venta de guitarras, guitarra ${nombreGuitarra}`
  }
}

export async function loader({ params }) {

  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })
  }

  return guitarra;
}

export default function Guitarra() {

  const { addCarrito } = useOutletContext()

  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  const handleSubmit = e => {
    e.preventDefault();

    if(cantidad < 1) return alert('Debes seleccionar una cantidad');

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    addCarrito(guitarraSeleccionada);

  }


  return (
    <div className="guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form 
          onSubmit={handleSubmit}
          className="formulario">
          <label htmlFor="selCantidad">Cantidad</label>

          <select 
            id="selCantidad"
            onChange={ e => setCantidad(Number(e.target.value)) }>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input 
            type="submit"
            value='Agregar al carrito' />

        </form>

      </div>
    </div>
  )
}
