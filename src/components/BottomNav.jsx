import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, LayoutGrid, ShoppingCart, Headphones } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function BottomNav() {
  const { cantidadTotal, setIsOpen } = useCarrito()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleCategorias = () => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        window.dispatchEvent(new Event('catalogo:abrirFiltros'))
      }, 300)
    } else {
      window.dispatchEvent(new Event('catalogo:abrirFiltros'))
    }
  }

  const activeClass = 'text-red-500'
  const inactiveClass = 'text-gray-500'

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-900 border-t border-dark-700 h-[60px] flex items-stretch">

      {/* Inicio */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors ${isHome ? activeClass : inactiveClass}`}
      >
        <Home size={20} />
        Inicio
      </Link>

      {/* Categorías */}
      <button
        onClick={handleCategorias}
        className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors ${inactiveClass} hover:text-gray-300`}
      >
        <LayoutGrid size={20} />
        Categorías
      </button>

      {/* Carrito */}
      <button
        onClick={() => setIsOpen(true)}
        className={`relative flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors ${inactiveClass} hover:text-gray-300`}
      >
        <div className="relative">
          <ShoppingCart size={20} />
          {cantidadTotal > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cantidadTotal > 9 ? '9+' : cantidadTotal}
            </span>
          )}
        </div>
        Carrito
      </button>

      {/* Soporte */}
      <Link
        to="/soporte"
        className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors ${location.pathname === '/soporte' ? activeClass : inactiveClass}`}
      >
        <Headphones size={20} />
        Soporte
      </Link>
    </nav>
  )
}
