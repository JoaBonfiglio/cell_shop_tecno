import { useState, useRef } from 'react'
import {
  Search,
  Wrench,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Battery,
  Gamepad2,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  MapPin,
  X,
} from 'lucide-react'

const FAQS = [
  {
    categoria: 'Reparación',
    pregunta: '¿Cuánto tiempo tarda una reparación de pantalla?',
    respuesta:
      'La mayoría de los cambios de pantalla para celulares populares (iPhone, Samsung, Motorola) se realizan en el acto, en el mismo momento que traés el equipo. Para modelos menos comunes puede tardar 24-48hs dependiendo de la disponibilidad del repuesto.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Ofrecen garantía en las reparaciones?',
    respuesta:
      'Sí. Todas nuestras reparaciones tienen garantía mínima de 90 días. Si el problema reaparece dentro del período de garantía, lo revisamos sin costo. Algunos servicios tienen garantía extendida de hasta 6 meses.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Pueden recuperar datos de un celular roto?',
    respuesta:
      'En muchos casos sí. Si el equipo tiene la pantalla rota pero funciona, podemos recuperar los datos antes de la reparación. Si el problema es de software o la memoria interna está dañada, realizamos un diagnóstico gratuito para evaluar las posibilidades.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Cómo funciona el proceso de compra?',
    respuesta:
      'Seleccioná los productos, agregalos al carrito y hacé clic en "Pedir por WhatsApp". Te llegará un mensaje a nuestro número con el detalle completo de tu pedido. Nuestro equipo confirmará disponibilidad, coordina el pago y la entrega o retiro en local.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Tienen envíos a domicilio?',
    respuesta:
      'Sí, realizamos envíos dentro de General Roca y alrededores. También podés pasar a retirar por el local. Coordinamos los detalles de entrega directamente por WhatsApp.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Reparan consolas PlayStation PS4 y PS5?',
    respuesta:
      'Sí. Somos especialistas en reparación de consolas PlayStation PS4 y PS5. Trabajamos problemas de lectura de disco, fallas de HDMI, sobrecalentamiento, joysticks con drift, problemas de software y mucho más. Traé tu consola y hacemos el diagnóstico sin costo.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta:
      'Aceptamos efectivo, transferencia bancaria/CVU, MercadoPago y tarjetas de débito/crédito (con y sin cuotas). Consultanos por las promociones vigentes de cada medio de pago.',
  },
  {
    categoria: 'Diagnóstico',
    pregunta: '¿El diagnóstico técnico tiene costo?',
    respuesta:
      'El diagnóstico es completamente gratuito. Evaluamos el equipo y te informamos qué tiene y cuánto cuesta la reparación. Si decidís no repararlo, no abonás nada.',
  },
  {
    categoria: 'Diagnóstico',
    pregunta: '¿Trabajan con todas las marcas?',
    respuesta:
      'Trabajamos con Apple, Samsung, Motorola, Xiaomi, LG, Huawei, Nokia y muchas más. También reparamos notebooks, tablets y otros dispositivos electrónicos. Consultanos por tu modelo específico.',
  },
]

const SERVICIOS = [
  { icono: Smartphone, titulo: 'Celulares', descripcion: 'Pantallas, baterías, conectores, software' },
  { icono: Gamepad2, titulo: 'PlayStation PS4/PS5', descripcion: 'HDMI, disco, joystick drift, software' },
  { icono: Laptop, titulo: 'Notebooks', descripcion: 'Teclados, pantallas, discos, RAM' },
  { icono: Tablet, titulo: 'Tablets', descripcion: 'iPad y Android, pantallas y baterías' },
  { icono: Battery, titulo: 'Baterías', descripcion: 'Cambio de batería con garantía' },
  { icono: Headphones, titulo: 'Accesorios', descripcion: 'Auriculares, controles, periféricos' },
]

export default function Soporte() {
  const [busqueda, setBusqueda] = useState('')
  const [abierto, setAbierto] = useState(null)
  const faqsRef = useRef(null)

  const faqsFiltradas = FAQS.filter(
    (faq) =>
      busqueda.trim() === '' ||
      faq.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(busqueda.toLowerCase()) ||
      faq.categoria.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    setAbierto(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (busqueda.trim() && faqsRef.current) {
      setTimeout(() => {
        faqsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  const NUMERO_WA = '5492984355384'
  const mensajeSoporte = encodeURIComponent('Hola Cell Shop Tecno+! Necesito asistencia técnica con mi equipo.')
  const linkWhatsApp = `https://wa.me/${NUMERO_WA}?text=${mensajeSoporte}`

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">

      {/* Hero de soporte */}
      <section className="relative bg-grid-pattern rounded-2xl overflow-hidden border border-dark-700">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-dark-900/95 to-dark-900" />
        <div className="relative px-6 py-10 sm:px-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Wrench size={13} />
            Servicio Técnico Especializado · General Roca, Río Negro
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Centro de <span className="text-gradient-red">Soporte</span>
          </h1>
          <p className="text-white/80 font-semibold text-sm sm:text-base mb-1">
            Celulares · Notebooks · Consolas PlayStation (PS4/PS5)
          </p>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-sm mb-8">
            Encontrá respuestas rápidas a tus preguntas o contactanos directamente. Estamos para ayudarte en General Roca.
          </p>

          {/* Buscador de ayuda */}
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={busqueda}
                onChange={handleBusqueda}
                placeholder="¿Qué problema tenés? Ej: pantalla rota, batería, PS5..."
                className="input-search pl-12 pr-10 py-4 text-base"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => { setBusqueda(''); setAbierto(null) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary px-5 py-4 text-sm flex-shrink-0"
            >
              Buscar
            </button>
          </form>

          {/* Feedback de resultados */}
          {busqueda.trim() && (
            <p className="mt-3 text-sm font-medium">
              {faqsFiltradas.length > 0 ? (
                <span className="text-green-400">
                  {faqsFiltradas.length} resultado{faqsFiltradas.length !== 1 ? 's' : ''} encontrado{faqsFiltradas.length !== 1 ? 's' : ''} — mirá abajo
                </span>
              ) : (
                <span className="text-red-400">Sin resultados para "{busqueda}"</span>
              )}
            </p>
          )}
        </div>
      </section>

      {/* Banner "Servicio en el Acto" */}
      <section className="flex flex-col sm:flex-row items-center gap-4 bg-red-600 rounded-xl px-6 py-5 shadow-[0_0_30px_rgba(220,38,38,0.25)]">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Servicio Técnico en el Acto</h2>
            <p className="text-red-100 text-sm leading-relaxed">
              Reparamos celulares y consolas PlayStation (PS4/PS5) mientras esperás. Sin demoras, sin excusas. Traé tu equipo y nos ocupamos en General Roca.
            </p>
          </div>
        </div>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-3 rounded-lg text-sm hover:bg-red-50 transition-colors whitespace-nowrap"
        >
          <MessageCircle size={18} />
          Consultar ahora
        </a>
      </section>

      {/* Servicios */}
      <section>
        <h2 className="text-white font-bold text-xl mb-4">¿Qué reparamos?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SERVICIOS.map(({ icono: Icono, titulo, descripcion }) => (
            <div
              key={titulo}
              className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-red-600/50 transition-all group"
            >
              <div className="w-10 h-10 bg-red-600/15 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600/25 transition-colors">
                <Icono size={20} className="text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{titulo}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section ref={faqsRef}>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-white font-bold text-xl">Preguntas Frecuentes</h2>
          <span className="text-gray-600 text-sm">({faqsFiltradas.length})</span>
        </div>

        {faqsFiltradas.length === 0 ? (
          <div className="bg-dark-800 border-2 border-red-600/40 rounded-xl p-8 text-center shadow-[0_0_20px_rgba(220,38,38,0.1)]">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <p className="text-white font-bold text-lg mb-1">
              No hay resultados para "{busqueda}"
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Intentá con otras palabras como "pantalla", "batería", "PS5" o "garantía".
            </p>
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
            >
              <MessageCircle size={16} />
              Consultanos por WhatsApp
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            {faqsFiltradas.map((faq, i) => (
              <div
                key={i}
                className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setAbierto(abierto === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-3 hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="badge-category mt-0.5 flex-shrink-0">{faq.categoria}</span>
                    <span className="text-white font-medium text-sm leading-snug">{faq.pregunta}</span>
                  </div>
                  <div className="flex-shrink-0 text-gray-500">
                    {abierto === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {abierto === i && (
                  <div className="px-5 pb-4 border-t border-dark-700">
                    <div className="flex gap-2 pt-3">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.respuesta}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ubicación */}
      <section className="flex flex-col sm:flex-row gap-4 bg-dark-800 border border-dark-700 rounded-xl p-5 sm:p-6 items-center">
        <div className="w-12 h-12 bg-red-600/15 rounded-full flex items-center justify-center flex-shrink-0">
          <MapPin size={24} className="text-red-500" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-white font-bold text-base mb-1">
            Visitános en nuestro local en General Roca
          </h3>
          <p className="text-gray-300 text-sm font-medium">
            9 de Julio 837, General Roca, Río Negro
          </p>
          <a
            href="tel:+5492984355384"
            className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
          >
            0298 435-5384
          </a>
          <p className="text-gray-600 text-xs mt-1">
            Lunes a sábado · Sin turno previo. Traé tu equipo y lo revisamos en el momento.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-dark-800 border border-dark-700 rounded-xl p-6 sm:p-8 text-center">
        <Shield size={40} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-white font-bold text-xl mb-2">¿No encontraste lo que buscabas?</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
          Nuestro equipo técnico en General Roca está disponible para ayudarte. Escribinos por WhatsApp y respondemos enseguida.
        </p>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          <MessageCircle size={20} />
          Chatear por WhatsApp
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  )
}
