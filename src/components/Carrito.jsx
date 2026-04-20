import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle, ArrowRight } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function Carrito() {
  const {
    items,
    isOpen,
    setIsOpen,
    quitarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    total,
    cantidadTotal,
    generarLinkWhatsApp,
  } = useCarrito()

  const formatPrecio = (n) =>
    n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-dark-900 border-l border-dark-700 z-50 flex flex-col shadow-2xl"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-red-500" />
            <h2 className="text-white font-bold text-lg">Tu Carrito</h2>
            {cantidadTotal > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cantidadTotal}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-10">
              <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-dark-600">
                <ShoppingCart size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-400 font-semibold text-lg mb-1">Carrito vacío</p>
              <p className="text-gray-600 text-sm">Agregá productos para empezar tu pedido.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-6 text-sm"
              >
                Ver productos
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-dark-800 rounded-xl p-3 border border-dark-700 group"
              >
                {/* Imagen */}
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-dark-700"
                />

                {/* Detalle */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-snug line-clamp-2 mb-1">
                    {item.nombre}
                  </p>
                  <p className="text-red-500 font-bold text-sm">
                    {formatPrecio(item.precio * item.cantidad)}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {formatPrecio(item.precio)} c/u
                  </p>
                </div>

                {/* Controles */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => quitarDelCarrito(item.id)}
                    className="p-1 text-gray-600 hover:text-red-500 transition-colors"
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-1 bg-dark-700 rounded-lg">
                    <button
                      onClick={() => cambiarCantidad(item.id, -1)}
                      className="p-1.5 text-gray-400 hover:text-white transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-white text-sm font-bold w-6 text-center">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => cambiarCantidad(item.id, 1)}
                      className="p-1.5 text-gray-400 hover:text-white transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y checkout */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-5 py-4 border-t border-dark-700 space-y-4 bg-dark-900">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Total</span>
              <span className="text-white font-bold text-2xl">{formatPrecio(total)}</span>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={generarLinkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-base transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle size={20} />
              Pedir por WhatsApp
            </a>

            <p className="text-gray-600 text-xs text-center leading-relaxed">
              Te contactaremos por WhatsApp para confirmar disponibilidad y coordinar el pago.
            </p>

            {/* Vaciar */}
            <button
              onClick={vaciarCarrito}
              className="w-full text-gray-600 hover:text-red-500 text-sm transition-colors text-center"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
