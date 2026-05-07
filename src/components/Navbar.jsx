import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X, Headphones, MapPin, Phone } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function Navbar({ onBuscar }) {
  const { cantidadTotal, setIsOpen } = useCarrito()
  const [busqueda, setBusqueda] = useState('')
  const [menuMovil, setMenuMovil] = useState(false)
  const navigate = useNavigate()

  const handleChange = (valor) => {
    setBusqueda(valor)
    if (onBuscar) onBuscar(valor)
    navigate('/')
  }

  const handleBuscar = (e) => {
    e.preventDefault()
    setMenuMovil(false)
  }

  const limpiarBusqueda = () => {
    setBusqueda('')
    if (onBuscar) onBuscar('')
  }

  return (
    <header className="sticky top-0 z-50">

      {/* Topbar informativo */}
      <div className="bg-dark-950 border-b border-dark-700/60 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-5">
            <a
              href="https://maps.google.com/?q=9+de+Julio+837+General+Roca+Rio+Negro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              <MapPin size={11} />
              9 de Julio 837, General Roca, Río Negro
            </a>
            <a
              href="tel:+5492984355384"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              <Phone size={11} />
              0298 435-5384
            </a>
          </div>
          <p className="text-gray-600 text-xs">
            Servicio técnico en el acto · Lunes a sábado
          </p>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="bg-dark-900/95 border-b border-dark-700 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0"
              onClick={() => { limpiarBusqueda() }}
            >
              <img src="/logo.png" alt="Cell Shop - Servicio Técnico" className="h-14 w-auto object-contain" />
            </Link>

            {/* Buscador desktop */}
            <form onSubmit={handleBuscar} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Buscar productos, marcas, categorías..."
                  className="input-search pl-10 pr-10 h-10 text-sm"
                />
                {busqueda && (
                  <button
                    type="button"
                    onClick={limpiarBusqueda}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Acciones */}
            <div className="flex items-center gap-1.5">
              <Link
                to="/soporte"
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-dark-700"
                aria-label="Soporte técnico"
              >
                <Headphones size={17} />
                <span className="hidden sm:inline">Soporte</span>
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={17} />
                <span className="hidden sm:inline">Carrito</span>
                {cantidadTotal > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cantidadTotal > 9 ? '9+' : cantidadTotal}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuMovil(!menuMovil)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
                aria-label="Toggle menú"
              >
                {menuMovil ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Menú móvil */}
          {menuMovil && (
            <div className="md:hidden pb-4 border-t border-dark-700 pt-4 space-y-3">
              <form onSubmit={handleBuscar} className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Buscar productos..."
                  className="input-search pl-10 pr-10"
                />
                {busqueda && (
                  <button
                    type="button"
                    onClick={limpiarBusqueda}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
              <Link
                to="/soporte"
                onClick={() => setMenuMovil(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-white py-2 text-sm font-medium transition-colors"
              >
                <Headphones size={15} />
                Soporte Técnico
              </Link>
              <div className="flex flex-col gap-1.5 pt-1 border-t border-dark-700">
                <a href="tel:+5492984355384" className="flex items-center gap-2 text-gray-500 text-xs">
                  <Phone size={12} /> 0298 435-5384
                </a>
                <span className="flex items-center gap-2 text-gray-500 text-xs">
                  <MapPin size={12} /> 9 de Julio 837, General Roca
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
