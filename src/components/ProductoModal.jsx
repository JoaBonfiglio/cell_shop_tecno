import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ShoppingCart } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function ProductoModal({ producto, onClose }) {
  const { agregarAlCarrito } = useCarrito()

  const formatPrecio = (precio) =>
    precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  // Cerrar con Escape y bloquear scroll — solo cuando hay un producto abierto
  useEffect(() => {
    if (!producto) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [producto, onClose])

  return (
    <AnimatePresence>
      {producto && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row max-h-[90vh]">

              {/* Imagen */}
              <div className="w-full sm:w-[55%] bg-dark-700 flex-shrink-0 relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-64 sm:h-full object-cover"
                />
                {!producto.stock && (
                  <div className="absolute inset-0 bg-dark-900/75 flex items-center justify-center">
                    <span className="text-gray-300 font-semibold text-sm bg-dark-800 border border-dark-600 px-4 py-1.5 rounded-full">
                      Sin stock
                    </span>
                  </div>
                )}
              </div>

              {/* Detalle */}
              <div className="flex flex-col flex-1 p-5 sm:p-6 overflow-y-auto">
                {/* Cabecera */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="inline-block bg-dark-700 border border-dark-600 text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                    {producto.categoria}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-1.5 text-gray-500 hover:text-white hover:bg-dark-700 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nombre */}
                <h2 className="text-white font-bold text-xl leading-tight mb-3">
                  {producto.nombre}
                </h2>

                {/* Precio */}
                <p className="text-2xl font-bold text-white mb-4">
                  {formatPrecio(producto.precio)}
                </p>

                {/* Descripción */}
                {producto.descripcion && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {producto.descripcion}
                  </p>
                )}

                {/* Badge destacado */}
                {producto.destacado && (
                  <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-semibold mb-5">
                    <Star size={13} fill="currentColor" />
                    Producto destacado
                  </div>
                )}

                {/* Stock bajo */}
                {producto.stock && producto.stock_bajo && (
                  <div className="text-orange-400 text-xs font-bold mb-4">
                    ⚡ Últimas unidades disponibles
                  </div>
                )}

                <div className="mt-auto pt-3">
                  <button
                    onClick={() => { agregarAlCarrito(producto); onClose() }}
                    disabled={!producto.stock}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={16} />
                    {producto.stock ? 'Agregar al carrito' : 'Sin stock'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
