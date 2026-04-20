import { createContext, useContext, useState, useCallback } from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(true)
  }, [])

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
    const mensaje = `Hola Cell Shop Tecno+!%0AQuiero comprar:%0A${detalle}%0A%0A*Total: $${total.toLocaleString('es-AR')}*`
    return `https://wa.me/${numero}?text=${mensaje}`
  }, [items, total])

  return (
    <CarritoContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
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
