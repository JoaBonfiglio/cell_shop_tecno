import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

export default function Toast() {
  const { toast } = useCarrito()

  const nombreCorto =
    toast.nombre.length > 28 ? toast.nombre.slice(0, 28) + '...' : toast.nombre

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-[200] flex items-center gap-3 bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 shadow-2xl max-w-xs"
        >
          <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight">{nombreCorto}</p>
            <p className="text-gray-400 text-xs mt-0.5">agregado al carrito</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
