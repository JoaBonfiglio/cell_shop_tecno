import { ShoppingCart, Star } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()

  const formatPrecio = (precio) =>
    precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  return (
    <article className="card-product group flex flex-col">
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-square bg-dark-700">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {producto.destacado && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
            <Star size={10} fill="white" />
            Destacado
          </div>
        )}
        {!producto.stock && (
          <div className="absolute inset-0 bg-dark-900/80 flex items-center justify-center">
            <span className="text-gray-400 font-semibold text-sm bg-dark-800 px-3 py-1 rounded-full">Sin stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <span className="badge-category self-start">{producto.categoria}</span>

        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
          {producto.nombre}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {producto.descripcion}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-dark-600 gap-2">
          <span className="text-white font-bold text-base">
            {formatPrecio(producto.precio)}
          </span>
          <button
            onClick={() => agregarAlCarrito(producto)}
            disabled={!producto.stock}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(220,38,38,0.4)] flex-shrink-0"
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </article>
  )
}
