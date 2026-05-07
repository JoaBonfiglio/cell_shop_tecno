import { createContext, useContext, useState, useCallback, useRef } from 'react'

const CarritoContext = createContext(null)

const STATS_KEY = 'cellshop_stats'

function leerStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
  } catch {
    return {}
  }
}

function guardarStats(id, nombre) {
  const stats = leerStats()
  stats[id] = { nombre, veces: (stats[id]?.veces ?? 0) + 1 }
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, nombre: '' })
  const toastTimer = useRef(null)

  const mostrarToast = useCallback((nombre) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ show: true, nombre })
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, nombre: '' })
    }, 2500)
  }, [])

  const agregarAlCarrito = useCallback((producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    guardarStats(producto.id, producto.nombre)
    mostrarToast(producto.nombre)
  }, [mostrarToast])

  const quitarDelCarrito = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const cambiarCantidad = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    )
  }, [])

  const vaciarCarrito = useCallback(() => setItems([]), [])

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)

  const generarLinkWhatsApp = useCallback(() => {
    const numero = '5492984355384'
    const detalle = items
      .map((i) => `• ${i.nombre} x${i.cantidad} = $${(i.precio * i.cantidad).toLocaleString('es-AR')}`)
      .join('%0A')
    const mensaje = [
      '🛍️ *Nuevo pedido — Cell Shop Tecno+*',
      '',
      'Hola! Me gustaría hacer el siguiente pedido:',
      '',
      detalle,
      '',
      `💰 *Total: $${total.toLocaleString('es-AR')}*`,
      '',
      'Quedo esperando confirmación de stock y forma de pago. ¡Gracias!',
    ].join('%0A')
    return `https://wa.me/${numero}?text=${mensaje}`
  }, [items, total])

  return (
    <CarritoContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        toast,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        total,
        cantidadTotal,
        generarLinkWhatsApp,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
