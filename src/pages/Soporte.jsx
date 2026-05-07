import { useState, useRef, useEffect, Fragment } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Wrench, MessageCircle, Clock, ChevronDown, ChevronUp,
  Smartphone, Laptop, Tablet, Headphones, Battery, Gamepad2,
  CheckCircle, MapPin, Phone, Camera, SendHorizonal,
  ShieldCheck, ArrowRight, Box, Search, FileText,
} from 'lucide-react'

// ── Datos ────────────────────────────────────────────────────────

const PASOS = [
  { num: 1, icono: Box,       titulo: 'Traés el equipo',             desc: 'Sin turno previo' },
  { num: 2, icono: Search,    titulo: 'Diagnóstico gratuito',         desc: 'Evaluamos la falla' },
  { num: 3, icono: FileText,  titulo: 'Te informamos el presupuesto', desc: 'Sin compromisos' },
  { num: 4, icono: Wrench,    titulo: 'Reparamos',                    desc: 'En el acto o 24–48hs' },
  { num: 5, icono: CheckCircle, titulo: 'Retirás tu equipo listo',   desc: 'Con garantía 90 días' },
]

const STATS = [
  { icono: '🔧', valor: 500,  sufijo: '+',  decimales: 0, etiqueta: 'reparaciones realizadas' },
  { icono: '⭐', valor: 4.9,  sufijo: '/5', decimales: 1, etiqueta: 'en Google' },
  { icono: '📅', valor: 2018, sufijo: '',   decimales: 0, etiqueta: 'atendiendo desde', fijo: true },
]


const FAQS = [
  {
    categoria: 'Reparación',
    pregunta: '¿Cuánto tiempo tarda una reparación de pantalla?',
    respuesta: 'La mayoría de los cambios de pantalla (iPhone, Samsung, Motorola) se realizan en el acto. Para modelos menos comunes puede tardar 24–48 hs según disponibilidad del repuesto.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Ofrecen garantía en las reparaciones?',
    respuesta: 'Sí. Todas las reparaciones tienen garantía mínima de 90 días. Si el problema reaparece dentro del período de garantía, lo revisamos sin costo adicional.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Reparan consolas PlayStation PS4 y PS5?',
    respuesta: 'Sí, somos especialistas en PS4 y PS5. Trabajamos fallas de lectura de disco, HDMI, sobrecalentamiento, joystick drift, software y más. El diagnóstico es sin costo.',
  },
  {
    categoria: 'Reparación',
    pregunta: '¿Pueden recuperar datos de un celular roto?',
    respuesta: 'En muchos casos sí. Si el equipo funciona pero la pantalla está rota, recuperamos los datos antes de la reparación. Si hay daño en la memoria, realizamos un diagnóstico gratuito primero.',
  },
  {
    categoria: 'Diagnóstico',
    pregunta: '¿El diagnóstico técnico tiene costo?',
    respuesta: 'No. El diagnóstico es completamente gratuito. Te informamos qué tiene el equipo y cuánto cuesta la reparación. Si decidís no repararlo, no abonás nada.',
  },
  {
    categoria: 'Diagnóstico',
    pregunta: '¿Trabajan con todas las marcas?',
    respuesta: 'Trabajamos con Apple, Samsung, Motorola, Xiaomi, LG, Huawei, Nokia y más. También reparamos notebooks, tablets y consolas. Consultanos por tu modelo.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Cómo funciona el proceso de compra?',
    respuesta: 'Agregá productos al carrito y hacé clic en "Pedir por WhatsApp". Te contactamos para confirmar disponibilidad, coordinar el pago y la entrega o retiro en local.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Tienen envíos a domicilio?',
    respuesta: 'Sí, realizamos envíos dentro de General Roca y alrededores. También podés retirar en el local. Coordinamos todo por WhatsApp.',
  },
  {
    categoria: 'Compra',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos efectivo, transferencia/CVU, MercadoPago y tarjetas de débito/crédito con y sin cuotas. Consultanos por promociones vigentes.',
  },
]

const SERVICIOS = [
  { icono: Smartphone,  titulo: 'Celulares',   descripcion: 'Pantallas, baterías, conectores, software' },
  { icono: Gamepad2,    titulo: 'PlayStation',  descripcion: 'PS4 y PS5: HDMI, disco, joystick drift' },
  { icono: Laptop,      titulo: 'Notebooks',    descripcion: 'Teclados, pantallas, discos, RAM' },
  { icono: Tablet,      titulo: 'Tablets',      descripcion: 'iPad y Android, pantallas y baterías' },
  { icono: Battery,     titulo: 'Baterías',     descripcion: 'Cambio con garantía, todas las marcas' },
  { icono: Headphones,  titulo: 'Accesorios',   descripcion: 'Auriculares, controles, periféricos' },
]

const CATEGORIAS_FAQ = ['Todas', 'Reparación', 'Diagnóstico', 'Compra']

const TIPOS_EQUIPO = [
  { label: '📱 Celular',   texto: 'celular' },
  { label: '💻 Notebook',  texto: 'notebook' },
  { label: '🎮 Consola',   texto: 'consola' },
  { label: '📷 Tablet',    texto: 'tablet' },
  { label: '❓ Otro',      texto: 'equipo' },
]

const HORARIOS = [
  { dias: 'Lun a Vie', horario: '9:00 – 13:00  ·  16:00 – 20:00', days: [1, 2, 3, 4, 5] },
  { dias: 'Sábados',   horario: '9:00 – 13:00',                    days: [6] },
  { dias: 'Domingos',  horario: 'Cerrado',                          days: [0], cerrado: true },
]

const NUMERO_WA = '5492984355384'
const hoy = new Date().getDay()

// ── Contador animado ─────────────────────────────────────────────

function Counter({ target, suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const duration = 1500
    const tick = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setVal(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, decimals])

  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : val}{suffix}</span>
}

// ── Variantes de animación ───────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }
const staggerContainer = (stagger = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
})

// ── Componente principal ─────────────────────────────────────────

export default function Soporte() {
  const [categoriaFaq, setCategoriaFaq] = useState('Todas')
  const [abierto, setAbierto] = useState(null)
  const [seccionAbierta, setSeccionAbierta] = useState(false)
  const [descripcionFalla, setDescripcionFalla] = useState('')
  const [tipoEquipo, setTipoEquipo] = useState('')
  const faqsRef = useRef(null)

  const faqsFiltradas = FAQS.filter(
    (faq) => categoriaFaq === 'Todas' || faq.categoria === categoriaFaq
  )

  const tipoTexto = tipoEquipo
    ? (TIPOS_EQUIPO.find((t) => t.label === tipoEquipo)?.texto ?? 'equipo')
    : 'equipo'

  const linkWhatsApp = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent('Hola Cell Shop Tecno+! Necesito asistencia técnica.')}`

  const linkDiagnostico = descripcionFalla.trim()
    ? `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
        `Hola Cell Shop Tecno+! Mi ${tipoTexto} tiene este problema: ${descripcionFalla.trim()}. Te adjunto la foto para el diagnóstico.`
      )}`
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-3">
          Servicio técnico especializado
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Centro de <span className="text-gradient-red">Soporte</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
          Celulares, notebooks y consolas PlayStation (PS4/PS5). Diagnóstico gratuito y servicio en el acto en General Roca.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { icono: ShieldCheck, texto: 'Garantía 90 días' },
            { icono: Clock,       texto: 'Servicio en el acto' },
            { icono: CheckCircle, texto: 'Diagnóstico gratis' },
          ].map(({ icono: Icono, texto }) => (
            <div
              key={texto}
              className="flex items-center gap-1.5 bg-dark-800 border border-dark-700 px-3 py-1.5 rounded-full text-xs text-gray-300 font-medium"
            >
              <Icono size={13} className="text-red-500" />
              {texto}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── BANNER ROJO ──────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden flex flex-col sm:flex-row items-center gap-5 bg-red-600 rounded-2xl px-6 py-6 sm:px-8"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              Servicio Técnico en el Acto
            </h2>
            <p className="text-red-100 text-sm mt-0.5 leading-relaxed">
              Reparamos tu celular o consola PlayStation mientras esperás. Sin demoras. Sin excusas.
            </p>
          </div>
        </div>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex-shrink-0 flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-red-50 transition-colors whitespace-nowrap"
        >
          <MessageCircle size={16} />
          Consultar ahora
        </a>
      </motion.section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-white font-bold text-lg mb-7">¿Cómo funciona?</h2>

        {/* Desktop */}
        <div className="hidden sm:flex items-start">
          {PASOS.map((paso, i) => {
            const Icono = paso.icono
            return (
              <Fragment key={i}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center text-center flex-1 px-2"
                >
                  <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 shadow-[0_0_12px_rgba(220,38,38,0.4)]">
                    {paso.num}
                  </div>
                  <Icono size={18} className="text-red-400 mb-2" />
                  <p className="text-white font-semibold text-xs leading-snug">{paso.titulo}</p>
                  <p className="text-gray-500 text-xs mt-1">{paso.desc}</p>
                </motion.div>
                {i < PASOS.length - 1 && (
                  <div className="flex-shrink-0 w-8 mt-4 border-t-2 border-dashed border-dark-600" />
                )}
              </Fragment>
            )
          })}
        </div>

        {/* Mobile */}
        <div className="sm:hidden space-y-3">
          {PASOS.map((paso, i) => {
            const Icono = paso.icono
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-4 bg-dark-800 border border-dark-700 rounded-xl p-4"
              >
                <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {paso.num}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icono size={14} className="text-red-400" />
                    <p className="text-white font-semibold text-sm">{paso.titulo}</p>
                  </div>
                  <p className="text-gray-500 text-xs">{paso.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── ESTADÍSTICAS + RESEÑAS ───────────────────────────────── */}
      <section className="space-y-6">

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="bg-dark-800 border border-dark-700 rounded-2xl grid grid-cols-3 divide-x divide-dark-700"
        >
          {STATS.map((stat) => (
            <div key={stat.etiqueta} className="flex flex-col items-center justify-center py-6 px-3 text-center">
              <span className="text-2xl mb-2">{stat.icono}</span>
              <p className="text-white font-bold text-2xl sm:text-3xl leading-tight">
                {stat.fijo
                  ? stat.valor
                  : <Counter target={stat.valor} suffix={stat.sufijo} decimals={stat.decimales} />
                }
              </p>
              <p className="text-gray-500 text-xs mt-1.5 leading-snug max-w-[80px] sm:max-w-none">
                {stat.etiqueta}
              </p>
            </div>
          ))}
        </motion.div>

      </section>

      {/* ── DOS COLUMNAS: SERVICIOS + DIAGNÓSTICO ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ¿Qué reparamos? */}
        <section>
          <h2 className="text-white font-bold text-lg mb-4">¿Qué reparamos?</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-2 gap-2.5"
          >
            {SERVICIOS.map(({ icono: Icono, titulo, descripcion }) => (
              <motion.div
                key={titulo}
                variants={fadeUp}
                transition={{ duration: 0.35 }}
                className="bg-dark-800 border border-dark-700 hover:border-dark-600 rounded-xl p-4 transition-colors"
              >
                <Icono size={18} className="text-red-500 mb-2" />
                <p className="text-white font-semibold text-sm">{titulo}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Formulario de diagnóstico */}
        <section className="bg-dark-800 border border-dark-700 rounded-2xl flex flex-col">
          <div className="px-6 pt-6 pb-4 border-b border-dark-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wrench size={17} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">¿Qué se te rompió?</h2>
                <p className="text-gray-500 text-xs mt-0.5">Describí el problema y te respondemos</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 flex flex-col gap-4 flex-1">

            {/* Chips de tipo de equipo */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Tipo de equipo <span className="text-gray-600 normal-case">(opcional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TIPOS_EQUIPO.map((tipo) => (
                  <button
                    key={tipo.label}
                    onClick={() => setTipoEquipo(tipoEquipo === tipo.label ? '' : tipo.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      tipoEquipo === tipo.label
                        ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.35)]'
                        : 'bg-dark-700 border border-dark-600 text-gray-400 hover:text-white hover:border-dark-500'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Descripción del problema
              </label>
              <textarea
                value={descripcionFalla}
                onChange={(e) => setDescripcionFalla(e.target.value)}
                placeholder="Ej: Samsung A54, pantalla rota al caerse. La batería también drena rápido..."
                rows={4}
                className="w-full bg-dark-700 border border-dark-600 focus:border-red-600 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.08)] text-white placeholder-gray-600 text-sm rounded-xl px-4 py-3 outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-start gap-3 bg-dark-700/60 border border-dark-600 rounded-xl px-4 py-3">
              <Camera size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-500 text-xs leading-relaxed">
                <span className="text-gray-300 font-medium">Prepará una foto del daño.</span>{' '}
                Podés adjuntarla directamente en el chat de WhatsApp.
              </p>
            </div>

            <a
              href={linkDiagnostico ?? '#'}
              target={linkDiagnostico ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => !linkDiagnostico && e.preventDefault()}
              className={`flex items-center justify-center gap-2.5 w-full font-semibold py-3.5 rounded-xl text-sm transition-all mt-auto ${
                linkDiagnostico
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-dark-700 text-gray-600 border border-dark-600 cursor-not-allowed'
              }`}
            >
              <MessageCircle size={17} />
              Enviar diagnóstico por WhatsApp
              {linkDiagnostico && <SendHorizonal size={15} />}
            </a>

            {!linkDiagnostico && (
              <p className="text-gray-600 text-xs text-center -mt-1">
                Escribí el problema para activar el botón
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ── PREGUNTAS FRECUENTES ──────────────────────────────────── */}
      <section ref={faqsRef} className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">

        {/* Nivel 1 — header colapsable */}
        <button
          onClick={() => {
            setSeccionAbierta((prev) => !prev)
            setAbierto(null)
          }}
          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-dark-700 transition-colors"
        >
          <h2 className="text-white font-bold text-lg">Preguntas Frecuentes</h2>
          <motion.span
            animate={{ rotate: seccionAbierta ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            className="text-gray-500"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>

        {/* Nivel 1 — contenido colapsable */}
        <AnimatePresence initial={false}>
          {seccionAbierta && (
            <motion.div
              key="faq-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-dark-700">

                {/* Tabs de categoría */}
                <div className="flex gap-1.5 bg-dark-900 border border-dark-700 p-1 rounded-xl mt-5 mb-4 w-fit">
                  {CATEGORIAS_FAQ.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategoriaFaq(cat); setAbierto(null) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        categoriaFaq === cat ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Nivel 2 — preguntas individuales */}
                <div className="space-y-1.5">
                  {faqsFiltradas.map((faq, i) => (
                    <div key={i} className="bg-dark-700 border border-dark-600 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setAbierto(abierto === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-dark-600 transition-colors"
                      >
                        <span className="text-white font-medium text-sm leading-snug">{faq.pregunta}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="hidden sm:inline badge-category">{faq.categoria}</span>
                          {abierto === i
                            ? <ChevronUp size={16} className="text-gray-500" />
                            : <ChevronDown size={16} className="text-gray-500" />
                          }
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {abierto === i && (
                          <motion.div
                            key="faq-answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-dark-600">
                              <p className="text-gray-400 text-sm leading-relaxed pt-4">{faq.respuesta}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CIERRE: UBICACIÓN + CTA ───────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Ubicación */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 bg-red-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Visitanos en el local</p>
              <p className="text-gray-300 text-sm">9 de Julio 837</p>
              <p className="text-gray-500 text-xs">General Roca, Río Negro</p>
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-1.5 mb-2">
            {HORARIOS.map((h) => {
              const activo = h.days.includes(hoy)
              return (
                <div
                  key={h.dias}
                  className={`flex items-center justify-between text-xs rounded-lg px-2 py-1 ${
                    activo ? 'bg-dark-700/60' : ''
                  }`}
                >
                  <span className={`flex items-center gap-1.5 ${activo ? 'text-white font-semibold' : 'text-gray-400'}`}>
                    {activo && <span className="text-red-500 text-[8px]">●</span>}
                    {h.dias}
                  </span>
                  <span className={
                    h.cerrado
                      ? 'text-red-400 font-medium'
                      : activo
                        ? 'text-gray-200 font-medium'
                        : 'text-gray-500'
                  }>
                    {h.horario}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-gray-600 text-xs px-2 mb-3">Sin turno previo</p>

          {/* Teléfono */}
          <a
            href="tel:+5492984355384"
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors mb-4 px-2"
          >
            <Phone size={13} />
            0298 435-5384
          </a>

          {/* Mapa */}
          <div className="rounded-xl overflow-hidden mt-1">
            <iframe
              src="https://maps.google.com/maps?q=9+de+Julio+837,+General+Roca,+Rio+Negro,+Argentina&output=embed"
              width="100%"
              height="160"
              style={{ border: 0 }}
              loading="lazy"
              title="Ubicación Cell Shop Tecno+"
            />
          </div>
          <a
            href="https://maps.google.com/?q=9+de+Julio+837+General+Roca+Rio+Negro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 text-xs mt-2 inline-block transition-colors"
          >
            Abrir en Google Maps →
          </a>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm mb-1">¿Tenés otra consulta?</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Nuestro equipo te responde por WhatsApp. Rápido y sin complicaciones.
            </p>
          </div>
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            <MessageCircle size={17} />
            Chatear por WhatsApp
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

    </div>
  )
}
