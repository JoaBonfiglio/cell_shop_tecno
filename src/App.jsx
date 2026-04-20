import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { CarritoProvider } from './context/CarritoContext'
import Navbar from './components/Navbar'
import Catalogo from './components/Catalogo'
import Carrito from './components/Carrito'
import Soporte from './pages/Soporte'

function Layout({ children, onBuscar }) {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar onBuscar={onBuscar} />
      <main className="flex-1">
        {children}
      </main>
      <Carrito />
      <footer className="border-t border-dark-700 pt-8 pb-6 px-4 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">

            {/* Marca */}
            <div>
              <p className="text-white font-bold text-base mb-1">
                Cell Shop <span className="text-red-600">Tecno+</span>
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Servicios técnicos especializados en telefonía móvil e informática. Venta de insumos y accesorios.
              </p>
            </div>

            {/* Contacto */}
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Contacto</p>
              <div className="space-y-1.5">
                <a
                  href="tel:+5492984355384"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors group"
                >
                  <Phone size={12} className="text-red-500 flex-shrink-0" />
                  <span>0298 435-5384</span>
                </a>
                <a
                  href="https://wa.me/5492984355384?text=Hola%20Cell%20Shop%20Tecno%2B!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-xs transition-colors"
                >
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Dirección */}
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Ubicación</p>
              <div className="flex items-start gap-2">
                <MapPin size={12} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-xs font-medium">9 de Julio 837</p>
                  <p className="text-gray-500 text-xs">General Roca, Río Negro</p>
                  <p className="text-gray-600 text-xs mt-0.5">Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-700 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-700 text-xs">
              © {new Date().getFullYear()} Cell Shop Tecno+. Todos los derechos reservados.
            </p>
            <p className="text-gray-700 text-xs">
              General Roca, Río Negro · Argentina
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Home() {
  const [busqueda, setBusqueda] = useState('')

  return (
    <Layout onBuscar={setBusqueda}>
      <Catalogo busqueda={busqueda} />
    </Layout>
  )
}

function SoportePage() {
  return (
    <Layout onBuscar={() => {}}>
      <Soporte />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soporte" element={<SoportePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </CarritoProvider>
    </BrowserRouter>
  )
}
