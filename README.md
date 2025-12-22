# Portfolio Website - José Leal

Portfolio personal de Frontend Engineer con chat asistente integrado impulsado por IA. Construido con SvelteKit y diseñado para mostrar experiencia profesional, proyectos y facilitar el contacto mediante un chatbot conversacional.

🌐 **[joseleal.dev](https://joseleal.dev)**

## Funcionalidad

### Secciones principales

- **Hero**: Presentación con nombre, tagline profesional y CTA para descarga de CV
- **What I Do**: Áreas de especialización (Frontend Engineering y Automation)
- **Experience**: Roles profesionales y descripción de experiencia
- **Projects**: Proyectos destacados con stack tecnológico y estado
- **Contact**: Información de contacto y enlaces a redes sociales

### Características interactivas

- **Chat Assistant**: Chatbot conversacional impulsado por Claude AI (vía n8n webhook)
  - Sesiones persistentes con localStorage
  - Respuestas contextuales sobre experiencia y proyectos
  - Quick actions para preguntas frecuentes
  - Manejo de errores y timeouts

- **Theme Toggle**: Modo claro/oscuro con persistencia en localStorage
- **Mouse Spotlight Effect**: Efecto de iluminación que sigue el cursor del mouse
- **Back to Top**: Botón flotante para navegación rápida
- **Responsive Design**: Diseño adaptable a todos los dispositivos

## Arquitectura

### Stack tecnológico

- **Framework**: SvelteKit 2.x con Svelte 5 (Runes API)
- **Styling**: Tailwind CSS 3 con sistema de colores mediante CSS variables
- **TypeScript**: Tipado estático en toda la aplicación
- **Deployment**: Vercel (adapter-vercel)
- **Build Tool**: Vite 7.x

### Estructura del proyecto

```
portfolio-website/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte        # Layout principal con SEO y spotlight effect
│   │   ├── +page.svelte          # Página principal con todas las secciones
│   │   └── api/
│   │       └── chat/+server.ts   # API endpoint para chat (proxy a n8n)
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Hero.svelte
│   │   │   ├── WhatIDo.svelte
│   │   │   ├── Experience.svelte
│   │   │   ├── Projects.svelte
│   │   │   ├── Contact.svelte
│   │   │   ├── ThemeToggle.svelte
│   │   │   ├── BackToTop.svelte
│   │   │   ├── ChatBubble.svelte
│   │   │   └── chat/
│   │   │       ├── ChatModal.svelte
│   │   │       ├── ChatButton.svelte
│   │   │       └── ChatQuickActions.svelte
│   │   ├── stores/
│   │   │   └── chat.ts           # Store de estado del chat con Svelte stores
│   │   ├── types/
│   │   │   ├── content.ts        # Tipos para contenido del portfolio
│   │   │   └── chat.ts           # Tipos para sistema de chat
│   │   └── data/
│   │       └── content.ts        # Contenido estático del portfolio
│   └── app.css                    # Estilos globales y CSS variables
├── static/                        # Assets estáticos
├── svelte.config.js               # Configuración de SvelteKit
├── vite.config.ts                 # Configuración de Vite
├── tailwind.config.js             # Configuración de Tailwind
└── tsconfig.json                  # Configuración de TypeScript
```

### Sistema de chat

**Flujo de datos**:
1. Usuario escribe mensaje en el `ChatModal`
2. `chatStore.sendMessage()` agrega mensaje al UI y llama a `/api/chat`
3. El endpoint valida input y hace forward a webhook de n8n
4. n8n procesa con Claude AI y retorna respuesta
5. `chatStore` agrega respuesta del asistente al UI

**Gestión de sesiones**:
- `session_id` generado con `crypto.randomUUID()`
- Persistido en `localStorage` para continuidad entre visitas
- Incluido en todas las peticiones al backend

**Manejo de errores**:
- Timeout de 15 segundos en peticiones
- Mensajes de error específicos según código HTTP
- Estado de error en el store con UI feedback

### Sistema de estilos

**Tema adaptable**:
- CSS variables definidas en `app.css` con soporte light/dark mode
- Toggle con persistencia en localStorage
- Clases de Tailwind mapeadas a variables CSS

**Variables principales**:
```css
--bg-primary, --bg-secondary, --bg-tertiary    /* Backgrounds */
--text-primary, --text-secondary, --text-muted  /* Text colors */
--border-primary, --border-secondary            /* Borders */
--spotlight-color                               /* Mouse effect */
```

## Configuración

### Variables de entorno

Crear archivo `.env` basado en `.env.example`:

```bash
# Webhook URL para n8n (requerido para funcionalidad de chat)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

### Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Modo desarrollo con apertura automática del navegador
npm run dev -- --open
```

### Build y deployment

```bash
# Build de producción
npm run build

# Preview del build
npm run preview

# Verificación de tipos y linting
npm run check

# Formateo de código
npm run format
```

### Deployment en Vercel

El proyecto está configurado con `@sveltejs/adapter-vercel`:

1. Conectar repositorio con Vercel
2. Configurar variable de entorno `N8N_WEBHOOK_URL`
3. Deploy automático en push a main

## Personalización

### Contenido

Editar [src/lib/data/content.ts](src/lib/data/content.ts) para modificar:
- Información personal en `hero`
- Áreas de especialización en `whatIDo`
- Experiencia profesional en `experience`
- Proyectos en `projects`
- Datos de contacto en `contact`

### Estilos

- Colores: Editar variables CSS en [src/app.css](src/app.css)
- Tema de Tailwind: Modificar [tailwind.config.js](tailwind.config.js)
- Tipografía: Cambiar fuente en `tailwind.config.js` y link en `+layout.svelte`

### Chat Assistant

Para personalizar el comportamiento del chat:
- Modificar mensajes iniciales en [src/lib/stores/chat.ts](src/lib/stores/chat.ts)
- Ajustar quick actions en [src/lib/components/chat/ChatQuickActions.svelte](src/lib/components/chat/ChatQuickActions.svelte)
- Configurar timeout y validaciones en [src/routes/api/chat/+server.ts](src/routes/api/chat/+server.ts)

## Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run check` - Verificación de tipos TypeScript
- `npm run check:watch` - Verificación en modo watch
- `npm run format` - Formatear código con Prettier
- `npm run format:check` - Verificar formato sin modificar

## SEO y metadatos

Configurado en [src/routes/+layout.svelte](src/routes/+layout.svelte):
- Meta tags Open Graph para redes sociales
- Twitter Card para compartir en Twitter
- Descripción optimizada para buscadores
- Favicon y fuentes preconectadas

## Licencia

Proyecto personal - Todos los derechos reservados
