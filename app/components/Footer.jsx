import Navegacion from "./Navegacion"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor contenido">
        <Navegacion />
        <p className="copyright">
          Creado con Remix - fecha dinámica {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
