import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";
import { getCurso } from "~/models/curso.server";
import ListadoGuitarras from "~/components/ListadoGuitarras";
import ListadoPosts from "~/components/ListadoPosts";
import Curso from "~/components/Curso";
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'

// el nombre del archivo debe ser en minus
// pero el componenten en capital mayus

// como se nombren estos archivos van a ser las urls de la pagina
// ej: localhost:666 -> Renderiza index.js
// ej: localhost:666/nostros -> Renderiza nosotros.jsx

export const meta = () => ({
  title: `GuitarLA - Inicio`,
  description: `Blog de musica y venta de guitarras`
});

export const links = () => ([
  {
    rel: 'stylesheet',
    href: stylesGuitarras
  },
  {
    rel: 'stylesheet',
    href: stylesPosts
  },
  {
    rel: 'stylesheet',
    href: stylesCurso
  }
]);

export async function loader() {

  // se hace con promise all para que una consulta fetch no dependa que se finalice la primera para ser llamada
  const [arrGuitarras, arrPosts, objCurso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

  return { 
    arrGuitarras: arrGuitarras.data, 
    arrPosts: arrPosts.data,
    objCurso: objCurso.data.attributes
  }
}

export default function Index() {

  const { arrGuitarras, arrPosts, objCurso } = useLoaderData()

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras 
          arrGuitarras={arrGuitarras} />
      </main>

      <Curso objCurso={objCurso} />

      <section className="contenedor">
        <ListadoPosts
            arrPosts={arrPosts} />
      </section>

    </>
  );
}
