import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Share2, Check } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function ProductoCard({ producto, onVerDetalle }) {
  const { agregarAlCarrito } = useCarrito()
  const [copiado, setCopiado] = useState(false)

  const formatPrecio = (precio) =>
    precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  const handleShare = async (e) => {
    e.stopPropagation()
    const texto = `📱 ${producto.nombre} — ${formatPrecio(producto.precio)} | Cell Shop Tecno+ | Consultá disponibilidad por WhatsApp: https://wa.me/5492984355384`
    try {
      await navigator.clipboard.writeText(texto)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = texto
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const abrirDetalle = () => {
    if (onVerDetalle) onVerDetalle(producto)
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="card-product group flex flex-col"
    >
      {/* Imagen */}
      <div
        className="relative overflow-hidden bg-dark-700 cursor-pointer"
        style={{ aspectRatio: '1 / 1' }}
        onClick={abrirDetalle}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge destacado */}
        {producto.destacado && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md z-10">
            <Star size={9} fill="white" />
            Top
          </div>
        )}

        {/* Badge stock_bajo */}
        {producto.stock && producto.stock_bajo && (
          <div className="absolute bottom-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
            ⚡ Últimas unidades
          </div>
        )}

        {/* Botón compartir */}
        <button
          onClick={handleShare}
          className="absolute top-2 right-2 z-10 p-1.5 bg-dark-900/80 rounded-lg text-gray-300 hover:text-white transition-colors sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Compartir producto"
        >
          {copiado ? <Check size={13} className="text-green-400" /> : <Share2 size={13} />}
        </button>

        {/* Sin stock overlay */}
        {!producto.stock && (
          <div className="absolute inset-0 bg-dark-900/75 flex items-center justify-center backdrop-blur-[1px]">
            <span className="text-gray-300 font-semibold text-xs bg-dark-800 border border-dark-600 px-3 py-1 rounded-full">
              Sin stock
            </span>
          </div>
        )}

        {/* Botón agregar al hover — solo desktop */}
        {producto.stock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
            <button
              onClick={(e) => { e.stopPropagation(); agregarAlCarrito(producto) }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 transition-colors"
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              <ShoppingCart size={13} />
              Agregar al carrito
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <span className="text-gray-600 text-xs capitalize font-medium tracking-wide">
          {producto.categoria}
        </span>

        <h3
          className="text-white font-medium text-sm leading-snug line-clamp-2 flex-1 cursor-pointer hover:text-red-400 transition-colors"
          onClick={abrirDetalle}
        >
          {producto.nombre}
        </h3>

        <div className="flex items-center justify-between mt-1 gap-2">
          <span className="text-white font-bold text-base tracking-tight">
            {formatPrecio(producto.precio)}
          </span>

          {/* Botón móvil siempre visible */}
          <button
            onClick={() => agregarAlCarrito(producto)}
            disabled={!producto.stock}
            className="sm:hidden flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <ShoppingCart size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
