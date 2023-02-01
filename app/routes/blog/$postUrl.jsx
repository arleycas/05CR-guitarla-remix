import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";
import styles from '~/styles/blog.css'

export const meta = ({data}) => {

  if (!data) {
    return {
      title: 'Entrada no encontrada',
      description: `Guitarras, venta de guitarras, entrada no encontrada`
    }
  }

  // de esta forma podemos obtner la información que le llega al componente (usando loader) pero acá con la función meta
  const tituloPost = data.data[0].attributes.titulo;

  return {
    title: `GuitarLA - ${tituloPost}`,
    description: `Guitarras, venta de guitarras, entrada ${tituloPost}`
  }
}


export const links = () => ([
  {
    rel: 'stylesheet',
    href: styles
  }
])

export async function loader({params}) {

  const {postUrl } = params;
  const post = await getPost(postUrl); 
  
  if (post.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Post no encontrado'
    })
  }

  return post;
}

export default function Post() {

  const post = useLoaderData();
  const { contenido, imagen, titulo, publishedAt } = post?.data[0].attributes;

  return (
    <article className="post mt-3">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />

      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
      
    </article>
  )
}
