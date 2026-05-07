import { useMemo } from 'react'

const STATS_KEY = 'cellshop_stats'

export function useEstadisticas() {
  return useMemo(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
      const entries = Object.entries(raw)

      if (entries.length === 0) {
        return { productoMasAgregado: null, totalAgregados: 0 }
      }

      const [id, data] = entries.reduce((max, curr) =>
        curr[1].veces > max[1].veces ? curr : max
      )

      const totalAgregados = entries.reduce((acc, [, v]) => acc + v.veces, 0)

      return {
        productoMasAgregado: { id: Number(id), nombre: data.nombre, veces: data.veces },
        totalAgregados,
      }
    } catch {
      return { productoMasAgregado: null, totalAgregados: 0 }
    }
  }, [])
}
