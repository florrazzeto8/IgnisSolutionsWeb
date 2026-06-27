# Trabaja con nosotros — Design Spec

**Date:** 2026-06-17  
**Status:** Approved

## Objetivo

Nueva página `/trabaja-con-nosotros` con listado de puestos abiertos de IGNIS Solutions y modal de postulación por puesto.

## Archivos

| Acción | Archivo |
|--------|---------|
| Crear | `frontend/src/pages/TrabajaConNosotros.tsx` |
| Crear | `frontend/src/styles/trabaja-con-nosotros.css` |
| Modificar | `frontend/src/App.tsx` — agregar ruta `/trabaja-con-nosotros` |
| Modificar | `frontend/src/components/Header.tsx` — linkear "Trabaja con nosotros" |

## Estructura de página

### Hero
- Tag label: "TRABAJA CON NOSOTROS"
- Título: `Unite a nuestro <span cyan>equipo!</span>` (h1)
- Subtítulo: "Explorá las vacantes abiertas y postulate desde un flujo simple, claro y preparado para crecer."
- Link: "Volver al inicio" → `/`

### Grid de puestos (2x2)

```
| Desarrolladores - IGNIS Solutions | Profesores - Academia Ignis    |
| Especialistas Software - I+D      | Prototipado y Hardware - I+D   |
```

Cada card:
- Título del puesto (bold)
- Descripción breve de tecnologías buscadas
- Botón "Postularme"

Contenido por puesto:
1. **Desarrolladores - IGNIS Solutions** — .Net, C#, WPF, Flutter, HTML, JS, CSS, PHP
2. **Profesores - Academia Ignis** — Python, Flask, Django, C#, WPF, Unity. Valorados: ML y Ciencias de Datos
3. **Especialistas Software - I+D** — AI, ML, BigData, IoT. Valorados: Python, C/C++, CUDA
4. **Prototipado y Hardware - I+D** — Ingeniería electrónica, mecatrónica y afines

### Modal de postulación

- Se abre al clickear "Postularme" en cualquier card
- Header del modal: label "POSTULACIÓN" + título con nombre del puesto (parte en cyan)
- Campos:
  - NOMBRE COMPLETO (text, placeholder: "Tu nombre completo")
  - E-MAIL (email, placeholder: "nombre@correo.com")
  - TELÉFONO (tel, placeholder: "+54 11 1234 5678")
  - SUBIR CV (file input, PDF/DOC)
- Botón "Enviar" (gradiente cyan)
- Al enviar: muestra mensaje de éxito (sin backend por ahora)
- Cerrar: botón X o click fuera del modal

## Animaciones

Todas usan IntersectionObserver + clases `.fu`/`.vis` ya definidas en el proyecto — sin librerías externas.

| Elemento | Animación |
|----------|-----------|
| Tag hero | fade + slide-up al cargar |
| Título h1 | fade + slide-up, delay leve |
| Subtítulo | fade + slide-up, delay mayor |
| Card 1 | slide-up al entrar viewport |
| Card 2 | slide-up + delay 100ms |
| Card 3 | slide-up + delay 200ms |
| Card 4 | slide-up + delay 300ms |
| Modal | fade + scale al abrir |

## Email

Por ahora: mensaje de éxito en pantalla. EmailJS se integra en una iteración posterior.
