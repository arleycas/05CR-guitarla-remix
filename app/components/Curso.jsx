export default function Curso({objCurso}) {

  const { contenido, imagen, titulo } = objCurso;

  return (
    <section className="curso">

      {/* Sintaxis especial de  JSX para poner codigo de css aqui mimo */}
      <style jsx="true">{`
        .curso {
          background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url});
        }
      `}</style>

      <div className="contenedor curso-grid">
        <div className="contenido">
          <h2 className="heading">{titulo}</h2>
          <p className="texto">{contenido}</p>
        </div>
      </div>

    </section>
  )
}
