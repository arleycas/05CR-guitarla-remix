import { useLoaderData } from '@remix-run/react'
import ListadoGuitarras from '~/components/ListadoGuitarras'
import { getGuitarras } from '~/models/guitarras.server'

export const meta = () => ({
  title: 'GuitarLA - Tienda de Guitarras',
  description: 'Nuestra colección de guitarras'
})

// no es necesario llamarlo en el root.jsx, aunque se importe, este Loader se llama de forma automatica 
export async function loader() {

  const guitarras = await getGuitarras();
  // console.log(guitarras);
  return guitarras.data
}

export default function Tienda() {

  const arrGuitarras = useLoaderData()

  return (
    <ListadoGuitarras 
      arrGuitarras={arrGuitarras} />
  )
}