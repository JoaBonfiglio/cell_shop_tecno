# Cell Shop Tecno+

Plataforma de eCommerce para **Cell Shop Tecno+**, tienda de tecnología ubicada en **9 de Julio 837, General Roca, Río Negro**.  
Especializada en venta de celulares, accesorios, gaming y servicio técnico especializado en telefonía móvil e informática.

---

## Características

- Catálogo de productos con **25 categorías** (celulares, accesorios, gaming, etc.)
- **Buscador y filtros** por categoría y orden de precio
- **Carrito de compras** con checkout vía WhatsApp — sin pasarela de pagos
- **Página de Soporte** estilo HP con FAQs, buscador de ayuda y servicio técnico en el acto
- **Servicio técnico** especializado en celulares y consolas PlayStation (PS4/PS5)
- Diseño **Mobile First** con tema oscuro y acentos en rojo
- SEO optimizado con meta-tags, Open Graph y Schema.org `LocalBusiness`

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 4 |
| React Router DOM | 7 |
| Lucide React | latest |

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

La app corre en `http://localhost:5173/`

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Barra de navegación con buscador y carrito
│   ├── Catalogo.jsx        # Grilla de productos con filtros y categorías
│   ├── ProductoCard.jsx    # Tarjeta individual de producto
│   └── Carrito.jsx         # Panel lateral del carrito con checkout WhatsApp
├── context/
│   └── CarritoContext.jsx  # Estado global del carrito
├── data/
│   └── productos.json      # Base de datos de productos
├── pages/
│   └── Soporte.jsx         # Página de soporte técnico y FAQs
├── App.jsx                 # Rutas y layout principal
├── main.jsx
└── index.css               # Estilos globales Tailwind v4
```

---

## Cómo agregar productos

Editá el archivo `src/data/productos.json` siguiendo esta estructura:

```json
{
  "id": 28,
  "nombre": "Nombre del producto",
  "precio": 15000,
  "categoria": "celulares",
  "descripcion": "Descripción breve del producto.",
  "imagen": "https://url-de-la-imagen.jpg",
  "stock": true,
  "destacado": false
}
```

### Categorías disponibles

`accesorios` · `adaptador` · `auricular` · `almohadones` · `base para notebook` · `cables` · `cargadores` · `camaras de seguridad` · `cartuchos` · `celulares` · `consolas` · `discos` · `fundas` · `gabinetes` · `joystick` · `iluminacion` · `limpieza y mantenimiento` · `memoria Ram` · `microfonos` · `monitor` · `mouse` · `mouse pad` · `parlantes` · `placas` · `teclados`

---

## Checkout por WhatsApp

El carrito genera automáticamente un mensaje con el detalle del pedido y lo envía al número del local (`0298 435-5384`). No requiere pasarela de pagos ni datos de tarjeta.

---

## Datos del local

| | |
|---|---|
| **Nombre** | Cell Shop Tecno+ |
| **Dirección** | 9 de Julio 837, General Roca, Río Negro |
| **Teléfono** | 0298 435-5384 |
| **Servicios** | Venta de tecnología · Servicio técnico celulares · Reparación PS4/PS5 |

---

## Licencia

Proyecto privado — Cell Shop Tecno+ © 2026
