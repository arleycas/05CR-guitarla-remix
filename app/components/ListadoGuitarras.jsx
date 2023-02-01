import Guitarra from '~/components/Guitarra';

export default function ListadoGuitarras({arrGuitarras}) {
  return (
    <>
      <h2 className='heading'>Nuestra colección</h2>

      {
        arrGuitarras.length && (
          <div className='guitarras-grid'>
            {arrGuitarras.map(objGuitarra => (
              <Guitarra 
                key={objGuitarra.id}
                objGuitarra={objGuitarra}
              />
            ))}
          </div>
        )
      }
    </>
  )
}
