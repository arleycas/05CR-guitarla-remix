import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return {
      title: 'GuitarLA - Nosotros',
      description: 'Venta de guitarras y blog de música'
    }
}

// Esto hace que en el root.jsx cuando se use el componente/función "Links", se vaya con esta funcionalidad
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}


export default function Nosotros() {

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nostros" />

        <div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui veritatis consectetur, itaque illum quod nemo tenetur sit, dolorum iusto officiis delectus quis deserunt rerum explicabo facilis? Necessitatibus officia quod amet.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat eligendi harum cum laborum libero voluptatum praesentium ex impedit temporibus ducimus officia accusantium veniam quibusdam ratione, earum saepe beatae adipisci cupiditate.
          </p>

          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui veritatis consectetur, itaque illum quod nemo tenetur sit, dolorum iusto officiis delectus quis deserunt rerum explicabo facilis? Necessitatibus officia quod amet.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat eligendi harum cum laborum libero voluptatum praesentium ex impedit temporibus ducimus officia accusantium veniam quibusdam ratione, earum saepe beatae adipisci cupiditate.
          </p>
        </div>

      </div>
    </main>
  )
}