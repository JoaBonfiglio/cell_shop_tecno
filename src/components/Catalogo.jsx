import { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ShoppingCart } from 'lucide-react'
import ProductoCard from './ProductoCard'
import ProductoCardSkeleton from './ProductoCardSkeleton'
import ProductoModal from './ProductoModal'
import productos from '../data/productos.json'
import { useCarrito } from '../context/CarritoContext'

const CATEGORIAS = [
  'accesorios', 'adaptador', 'auricular', 'almohadones', 'base para notebook',
  'cables', 'cargadores', 'camaras de seguridad', 'cartuchos', 'celulares',
  'consolas', 'discos', 'fundas', 'gabinetes', 'joystick', 'iluminacion',
  'limpieza y mantenimiento', 'memoria Ram', 'microfonos', 'monitor', 'mouse',
  'mouse pad', 'parlantes', 'placas', 'teclados',
]

const ORDEN_OPCIONES = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'nombre-asc', label: 'A → Z' },
]

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function Catalogo({ busqueda = '' }) {
  const { agregarAlCarrito } = useCarrito()
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [orden, setOrden] = useState('relevancia')
  const [filtroVisible, setFiltroVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productoModal, setProductoModal] = useState(null)
  const carouselRef = useRef(null)

  // Skeleton loading inicial 800ms
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  // Escuchar evento del BottomNav para abrir filtros
  useEffect(() => {
    const handler = () => {
      setFiltroVisible(true)
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('catalogo:abrirFiltros', handler)
    return () => window.removeEventListener('catalogo:abrirFiltros', handler)
  }, [])

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
      case 'precio-asc': lista.sort((a, b) => a.precio - b.precio); break
      case 'precio-desc': lista.sort((a, b) => b.precio - a.precio); break
      case 'nombre-asc': lista.sort((a, b) => a.nombre.localeCompare(b.nombre)); break
      default: lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
    }
    return lista
  }, [busqueda, categoriaActiva, orden])

  const destacados = useMemo(() => productos.filter((p) => p.destacado), [])
  const mostrarDestacados = !busqueda.trim() && categoriaActiva === 'todas'

  const limpiarFiltros = () => { setCategoriaActiva('todas'); setOrden('relevancia') }
  const hayFiltrosActivos = categoriaActiva !== 'todas' || orden !== 'relevancia'

  const formatPrecio = (precio) =>
    precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Modal */}
      <ProductoModal producto={productoModal} onClose={() => setProductoModal(null)} />

      {/* Hero banner */}
      {!busqueda && (
        <section className="mb-10">
          <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] flex items-center">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80"
              alt="Tecnología"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
            <div className="relative z-10 px-7 py-10 sm:px-12 sm:py-14 max-w-lg">
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
                General Roca · Río Negro
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
                Tu tecnología,<br />
                <span className="text-gradient-red">nuestra pasión.</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-7 max-w-sm">
                Celulares, gaming y accesorios. Servicio técnico especializado en el acto.
              </p>
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Ver productos
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Sección Destacados */}
      {!loading && mostrarDestacados && destacados.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              ⭐ <span>Destacados</span>
            </h2>
            {/* Flechas desktop */}
            <div className="hidden sm:flex gap-1.5">
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                className="p-1.5 bg-dark-800 border border-dark-600 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                className="p-1.5 bg-dark-800 border border-dark-600 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} className="rotate-180" />
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-3 scrollbar-none"
          >
            {destacados.map((producto) => (
              <div
                key={producto.id}
                className="flex-shrink-0 w-[180px] card-product flex flex-col cursor-pointer group"
                onClick={() => setProductoModal(producto)}
              >
                <div className="relative bg-dark-700 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {producto.stock_bajo && (
                    <div className="absolute bottom-1.5 left-1.5 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ⚡ Últimas
                    </div>
                  )}
                </div>
                <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-white text-xs font-medium leading-snug line-clamp-2 flex-1">
                    {producto.nombre}
                  </h3>
                  <p className="text-white font-bold text-sm">{formatPrecio(producto.precio)}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); agregarAlCarrito(producto) }}
                    disabled={!producto.stock}
                    className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white text-xs font-semibold py-1.5 rounded-lg transition-colors"
                  >
                    <ShoppingCart size={11} />
                    Agregar
                  </button>
                </div>
              </div>
            ))}
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

      {/* Chips de categorías siempre visible */}
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
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductoCardSkeleton key={i} />
          ))}
        </div>
      ) : productosFiltrados.length > 0 ? (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
        >
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onVerDetalle={setProductoModal}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-dark-600">
            <SlidersHorizontal size={24} className="text-gray-600" />
          </div>
          <h3 className="text-gray-400 font-semibold text-lg mb-2">Sin resultados</h3>
          <p className="text-gray-600 text-sm max-w-xs">
            No encontramos productos para tu búsqueda. Intentá con otro término o categoría.
          </p>
          <button onClick={limpiarFiltros} className="btn-primary mt-4 text-sm">
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  )
}
