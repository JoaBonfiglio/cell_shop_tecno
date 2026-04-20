import { useState, useMemo } from 'react'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import ProductoCard from './ProductoCard'
import productos from '../data/productos.json'

const CATEGORIAS = [
  'accesorios',
  'adaptador',
  'auricular',
  'almohadones',
  'base para notebook',
  'cables',
  'cargadores',
  'camaras de seguridad',
  'cartuchos',
  'celulares',
  'consolas',
  'discos',
  'fundas',
  'gabinetes',
  'joystick',
  'iluminacion',
  'limpieza y mantenimiento',
  'memoria Ram',
  'microfonos',
  'monitor',
  'mouse',
  'mouse pad',
  'parlantes',
  'placas',
  'teclados',
]

const ORDEN_OPCIONES = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'nombre-asc', label: 'A → Z' },
]

export default function Catalogo({ busqueda = '' }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [orden, setOrden] = useState('relevancia')
  const [filtroVisible, setFiltroVisible] = useState(false)

  const productosFiltrados = useMemo(() => {
    let lista = [...productos]

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q)
      )
    }

    if (categoriaActiva !== 'todas') {
      lista = lista.filter((p) => p.categoria === categoriaActiva)
    }

    switch (orden) {
      case 'precio-asc':
        lista.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        lista.sort((a, b) => b.precio - a.precio)
        break
      case 'nombre-asc':
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      default:
        lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
    }

    return lista
  }, [busqueda, categoriaActiva, orden])

  const limpiarFiltros = () => {
    setCategoriaActiva('todas')
    setOrden('relevancia')
  }

  const hayFiltrosActivos = categoriaActiva !== 'todas' || orden !== 'relevancia'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Hero banner */}
      {!busqueda && (
        <section className="relative bg-grid-pattern rounded-2xl overflow-hidden mb-8 border border-dark-700">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-transparent" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-14 max-w-lg">
            <span className="badge-category mb-3 inline-block">Tecnología de punta</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Cell Shop{' '}
              <span className="text-gradient-red">Tecno+</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              Tu tienda de tecnología en General Roca, Río Negro. Celulares, accesorios, gaming y servicio técnico en el acto.
            </p>
            <a
              href="#catalogo"
              className="btn-primary text-sm"
            >
              Ver productos
            </a>
          </div>
        </section>
      )}

      {/* Header del catálogo */}
      <div id="catalogo" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white font-bold text-xl">
            {busqueda ? `Resultados para "${busqueda}"` : 'Catálogo'}
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({productosFiltrados.length} productos)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {hayFiltrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm transition-colors"
            >
              <X size={14} />
              Limpiar filtros
            </button>
          )}

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="bg-dark-800 border border-dark-600 text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-red-600 cursor-pointer"
          >
            {ORDEN_OPCIONES.map((op) => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>

          <button
            onClick={() => setFiltroVisible(!filtroVisible)}
            className="flex items-center gap-1.5 btn-ghost text-sm py-2"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Categorías</span>
            {filtroVisible ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Panel de categorías */}
      {filtroVisible && (
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoriaActiva('todas')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                categoriaActiva === 'todas'
                  ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                  : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 border border-dark-600'
              }`}
            >
              Todas
            </button>
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                  categoriaActiva === cat
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                    : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 border border-dark-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chips de categorías siempre visible (scroll horizontal) */}
      {!filtroVisible && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setCategoriaActiva('todas')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              categoriaActiva === 'todas'
                ? 'bg-red-600 text-white'
                : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-600'
            }`}
          >
            Todas
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                categoriaActiva === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid de productos */}
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {productosFiltrados.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-dark-600">
            <SlidersHorizontal size={24} className="text-gray-600" />
          </div>
          <h3 className="text-gray-400 font-semibold text-lg mb-2">Sin resultados</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            No encontramos productos para tu búsqueda. Intentá con otro término o categoría.
          </p>
          <button
            onClick={limpiarFiltros}
            className="btn-primary mt-4 text-sm"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  )
}
