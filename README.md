# Booking App - React + Vite + Tailwind

![Banner](https://via.placeholder.com/1200x300?text=Booking+App+React+Vite+Tailwind)

Proyecto grupal para consumo de API de alojamientos y bookings. Inspirado en Trivago/Booking, construido con **React, Vite y Tailwind CSS**, con autenticación JWT y dashboard funcional.

---

## 🚀 Integrantes y Roles

| Integrante | Rol / Responsabilidad |
|------------|----------------------|
| Edwin      | Configuración base del proyecto, Home, Navbar, Login/Register, Landing Page inicial. |
| Dany       | Slider de hoteles destacados, filtros de búsqueda, paginación, responsividad. |
| Jez        | Dashboard de usuario, historial de reservas, sección perfil, mejoras UX Login/Register. |

---

## 📂 Estructura de carpetas

```
kodigobooking/
├─ public/
├─ src/
│  ├─ components/     # Navbar, Cards, etc.
│  ├─ pages/          # Home, Login, Register, Dashboard
│  ├─ services/       # api.js con Axios y JWT
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## ✅ Checklist de Tareas

### Tareas completadas (Edwin)

- [x] Crear proyecto React con Vite
- [x] Configurar Tailwind CSS
- [x] Crear estructura de carpetas
- [x] Configurar Axios con JWT
- [x] Componentes base: App, Navbar, Home, Login, Register, Dashboard
- [x] Configurar proxy de Vite
- [x] Landing page con banner y cards
- [x] Diseño responsive básico

### Próximas tareas

**Edwin**
- [ ] Mejorar estilos del Home
- [ ] Ajustar hover y gradientes en cards
- [ ] Validar funcionalidad JWT en login y dashboard

**Dany**
- [ ] Crear slider de hoteles destacados en Home
- [ ] Agregar filtros de búsqueda (precio, ubicación, estrellas)
- [ ] Paginación de alojamientos
- [ ] Mejorar responsividad de Home y Banner

**Jez**
- [ ] Mejorar Dashboard: historial y detalles de reservas
- [ ] Crear sección perfil de usuario
- [ ] Mejorar UX Login/Register (mensajes de error y validaciones)

**Extras**
- [ ] Animaciones con framer-motion
- [ ] Integrar librería de iconos
- [ ] Dark mode con Tailwind
- [ ] Documentación y despliegue en GitHub + Netlify/Vercel

---

## ⚡ Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/pandamigo182/kodigobooking.git
cd kodigobooking
```

2. Instalar dependencias:

```bash
npm install
```

3. Levantar el proyecto en modo desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```
http://localhost:5173/
```

---

## 🔧 Uso

- **Landing Page / Home**: Muestra alojamientos con cards.
- **Login/Register**: Autenticación de usuario con JWT.
- **Dashboard**: Reservas y perfil de usuario (a implementar por Jez).
- **Filtros y Slider**: Mejora la búsqueda y visualización (a implementar por Dany).

---

## 📌 Notas importantes

- Tailwind v3 configurado.
- Proxy de Vite habilitado para evitar problemas CORS.
- Axios configurado con JWT y baseURL hacia la API.
- Se recomienda que cada integrante trabaje en su **rama propia** y haga pull request a `main`.

---

## 💻 Tecnologías

- React 18 + Vite
- Tailwind CSS v3
- Axios
- React Router DOM
- Heroicons / Iconos SVG
- Framer Motion (opcional para animaciones)

