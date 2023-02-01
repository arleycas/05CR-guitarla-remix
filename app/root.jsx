import { useState, useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  Link
} from "@remix-run/react";

import styles from '~/styles/index.css' // la virguulilla (~) hace referencia a la carpeta app (esto se configura en jscongfig.json)
import Header from '~/components/Header';
import Footer from '~/components/Footer'

// exportando esta función con este nombre podemos añadir información de meta del html
// Para que esta función sirva, se debe importar Meta y Meta la utiliza de alguna forma automaticamente al usarla como componente dentro de la función Document
// este funcionamiento solo sirve en los componentes que esten dentro de "routes" (ya que si exportamos esta funcion desde otro componente dentro tomará la configuracion)
/* digamos que en el componente nosotros ponemos que title: 'Nosotros', si nos vamos a localho../nostros, toamará la funcion de nosotros.jsx*/
export const meta = () => ({
  charset: "utf-8",
  title: "GuitarLA - Remix",
  viewport: "width=device-width,initial-scale=1",
});

// exportando esta función con este nombre podemos agregar hojas de estilo al html
// Para que esta función sirva, se debe importar Links y Links la utiliza de alguna forma automaticamente al usarla como componente dentro de la función Document
export const links = () => ([
  {
    rel: 'stylesheet',
    href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
  },
  {
    rel: 'stylesheet',
    href: styles
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'true'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap',
  }

])

// Esta función es la padre que va a contener la información meta de la página
function Document({children}) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        {/* EL modulo Scripts tiene las optimizaciones de Remix (por ejemplo que no se cargue la página al cambiar entre rutas) usualemnte se pone antes del cierre de body */}
        <Scripts />
        <Footer />
        {/* Para que al guardar los cambios en cógio se cambie automaticamente en el navegador */}
        <LiveReload />
      </body>
    </html>
  )
}

// Outlet, se inyecta lo que está en routes
export default function App() {

  const INITIAL = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('arrCarrito')) ?? [] : null;
  const [ arrCarrito, setCarrito ] = useState(INITIAL);

  useEffect(() => {
    //* nota: Lo que esté dentro de un useEffect en remix se ejecuta en la parte del cliente no en el servidor
    // si localstorage se pone fuera del useEffect, se ejecuta tanto en el cliente como en el servidor

    localStorage.setItem('arrCarrito', JSON.stringify(arrCarrito));
  }, [arrCarrito])
  

  const addCarrito = guitarra => {
    // verificar si una guitarra igual ya está en el carrito
    if (arrCarrito.some(guitarraState => guitarraState.id === guitarra.id )) {

      // iterar sobre el arreglo e indentificar el elemento duplicado
      const arrCarritoActualizado = arrCarrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad; // Reescribir la cantidad
        return guitarraState;
      });

      setCarrito(arrCarritoActualizado);

    } else {
      setCarrito([...arrCarrito, guitarra]) // agrega nuevo elemento a carrito
    }
  }

  const updateCantidad = guitarra => {
    const arrCarritoActualizado = arrCarrito.map(guitarraState => {
      if(guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad;
      return guitarraState;
    })

    setCarrito(arrCarritoActualizado)
  }

  const deleteGuitarra = id => {
    const arrCarritoActualizado = arrCarrito.filter(guitarraState => guitarraState.id !== id);
    setCarrito(arrCarritoActualizado);
  }

  return (
    <Document>
      <Outlet
        context={{
          addCarrito,
          arrCarrito,
          updateCantidad,
          deleteGuitarra
        }}/> 
    </Document>
  );
}

/** Manejo de errores **/
export function CatchBoundary() {
  const error = useCatch()

  return (
    <Document>
      <p className="error">{error.status} {error.statusText}</p>
      <Link to='/' className="error-enlace">Tal vez quieras volver a la pagina principal</Link>
    </Document>
  )
}

export function ErrorBoundary({error}) {
  return (
    <Document>
      <p className="error">{error.status} {error.statusText}</p>
      <Link to='/' className="error-enlace">Tal vez quieras volver a la pagina principal</Link>
    </Document>
  )
}