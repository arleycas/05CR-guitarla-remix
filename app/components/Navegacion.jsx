import { Link, useLocation, useNavigate } from "@remix-run/react"
import imgCarrito from '../../public/img/carrito.png'

export default function Navegacion() {

  const location = useLocation();

  return (
    <nav className="navegacion">
      <Link 
        to='/'
        className={location.pathname === '/' ? 'active' : ''} >
        Inicio
      </Link>  
      
      <Link 
        to='/nosotros'
        className={location.pathname === '/nosotros' ? 'active' : ''} >
        Nosotros
      </Link>  
      
      <Link 
        to='/guitarras'
        className={location.pathname === '/guitarras' ? 'active' : ''} >
        Tienda
      </Link>  
      
      <Link 
        to='/blog'
        className={location.pathname === '/blog' ? 'active' : ''} >
        Blog
      </Link>  
      
      <Link 
        to='/carrito' >
        <img src={imgCarrito} alt='Carrito de compras' />
      </Link>  
    </nav>
  )
}
