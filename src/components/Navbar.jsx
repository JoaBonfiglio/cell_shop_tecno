import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, Headphones } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function Navbar({ onBuscar }) {
  const { cantidadTotal, setIsOpen } = useCarrito()
  const [busqueda, setBusqueda] = useState('')
  const [menuMovil, setMenuMovil] = useState(false)
  const navigate = useNavigate()

  const handleBuscar = (e) => {
    e.preventDefault()
    if (onBuscar) onBuscar(busqueda)
    navigate('/')
    setMenuMovil(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-900 border-b border-dark-700 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            onClick={() => { if (onBuscar) onBuscar('') }}
          >
            <img
              src="/logo.png"
              alt="Cell Shop - Servicio Técnico"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Buscador desktop */}
          <form
            onSubmit={handleBuscar}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos..."
                className="input-search pl-9 pr-4"
              />
            </div>
          </form>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <Link
              to="/soporte"
              className="hidden sm:flex items-center gap-1.5 text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-dark-700"
            >
              <Headphones size={16} />
              <span>Soporte</span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Carrito</span>
              {cantidadTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cantidadTotal > 9 ? '9+' : cantidadTotal}
                </span>
              )}
            </button>

            {/* Menú móvil toggle */}
            <button
              onClick={() => setMenuMovil(!menuMovil)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menú"
            >
              {menuMovil ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Buscador móvil */}
        {menuMovil && (
          <div className="md:hidden pb-4 border-t border-dark-700 pt-3 space-y-3">
            <form onSubmit={handleBuscar} className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos..."
                className="input-search pl-9"
              />
            </form>
            <Link
              to="/soporte"
              onClick={() => setMenuMovil(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white py-2 text-sm font-medium transition-colors"
            >
              <Headphones size={16} />
              Soporte Técnico
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
