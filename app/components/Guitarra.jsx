import { Link } from "@remix-run/react";

export default function Guitarra({objGuitarra}) {

  const { descripcion, imagen, precio, url, nombre } = objGuitarra.attributes;

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.formats.medium.url} alt={`Guitarra ${nombre}`} />
      <div className="contenido">

        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        <Link className="enlace" to={`/guitarras/${url}`}> Ver producto </Link>

      </div>
    </div>
  )
}
