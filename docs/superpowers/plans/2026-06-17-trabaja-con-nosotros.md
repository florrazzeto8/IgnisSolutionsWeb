# Trabaja con Nosotros — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nueva página `/trabaja-con-nosotros` con listado de 4 puestos, modal de postulación por puesto y animaciones scroll-driven.

**Architecture:** Página nueva `TrabajaConNosotros.tsx` con patron idéntico a `SobreNosotros.tsx` — `useMouseTracker`, IntersectionObserver, clases `.fu`/`.vis`. Modal propio en la misma página usando estado React (`useState`). Sin dependencias nuevas.

**Tech Stack:** React + TypeScript, React Router v6, CSS custom properties, IntersectionObserver API

## Global Constraints

- CSS: usar variables `--navy`, `--navy-2`, `--navy-3`, `--cyan`, `--cyan-glow`, `--white`, `--gray` de `variables.css`
- Animaciones: solo clases `.fu`/`.vis`/`.d1-.d4` + IntersectionObserver, sin librerías externas
- No agregar dependencias npm nuevas
- El modal muestra éxito en frontend, sin envío real (EmailJS se integra después)
- Archivos CSS en `frontend/src/styles/`
- Páginas en `frontend/src/pages/`

---

### Task 1: Agregar `.d4` a global.css y nueva ruta + link en Header

**Files:**
- Modify: `frontend/src/styles/global.css` (línea 146, después de `.fu.d3`)
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/Header.tsx`

**Interfaces:**
- Produces: ruta `/trabaja-con-nosotros` disponible en el router; `<Link to="/trabaja-con-nosotros">` en Header; clase `.fu.d4` con delay 0.4s

- [ ] **Step 1: Agregar `.fu.d4` en global.css**

En `frontend/src/styles/global.css`, después de:
```css
.fu.d3 {
  transition-delay: 0.3s;
}
```
Agregar:
```css
.fu.d4 {
  transition-delay: 0.4s;
}
```

- [ ] **Step 2: Agregar ruta en App.tsx**

Reemplazar el contenido de `frontend/src/App.tsx`:
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SobreNosotros } from './pages/SobreNosotros';
import { TrabajaConNosotros } from './pages/TrabajaConNosotros';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Linkear "Trabaja con nosotros" en Header**

En `frontend/src/components/Header.tsx`, reemplazar:
```tsx
<a href="#">Trabaja con nosotros</a>
```
Con:
```tsx
<Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link>
```

- [ ] **Step 4: Verificar manualmente**

Correr `npm run dev` en `frontend/`, navegar a `http://localhost:5173/trabaja-con-nosotros` — debe mostrar 404 de React Router (página no existe aún). El link en el header debe navegar sin recargar la página.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/styles/global.css frontend/src/App.tsx frontend/src/components/Header.tsx
git commit -m "feat: add /trabaja-con-nosotros route and header link"
```

---

### Task 2: Crear CSS de la página

**Files:**
- Create: `frontend/src/styles/trabaja-con-nosotros.css`

**Interfaces:**
- Produces: clases `.tcn-page`, `.tcn-hero`, `.tcn-hero-orb-1`, `.tcn-hero-orb-2`, `.tcn-hero-inner`, `.tcn-heading`, `.tcn-subtitle`, `.tcn-back-link`, `.tcn-jobs`, `.tcn-jobs-inner`, `.tcn-jobs-grid`, `.tcn-job-card`, `.tcn-job-title`, `.tcn-job-desc`, `.tcn-postular-btn`, `.tcn-modal-overlay`, `.tcn-modal-box`, `.tcn-modal-close`, `.tcn-modal-label`, `.tcn-modal-title`, `.tcn-modal-form`, `.tcn-form-group`, `.tcn-submit-btn`, `.tcn-success`, `.tcn-success-icon`

- [ ] **Step 1: Crear `frontend/src/styles/trabaja-con-nosotros.css`**

```css
/* ── TRABAJA CON NOSOTROS PAGE ── */

.tcn-page {
  min-height: 100vh;
  background: var(--navy);
  position: relative;
  overflow-x: hidden;
}

/* ── HERO ── */
.tcn-hero {
  position: relative;
  padding: 160px 64px 80px;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.tcn-hero-orb-1 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: #0050c8;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  top: -100px;
  right: -100px;
  pointer-events: none;
}

.tcn-hero-orb-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: var(--cyan);
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.07;
  bottom: 0;
  left: -80px;
  pointer-events: none;
}

.tcn-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

.tcn-heading {
  font-size: clamp(3rem, 6.5vw, 7.5rem);
  font-weight: 900;
  line-height: 1.03;
  letter-spacing: -3px;
  margin-bottom: 28px;
  color: var(--white);
}

.tcn-heading em {
  color: var(--cyan);
  font-style: normal;
}

.tcn-subtitle {
  font-size: clamp(16px, 1.6vw, 20px);
  color: rgba(255, 255, 255, 0.55);
  max-width: 560px;
  line-height: 1.75;
  margin-bottom: 28px;
}

.tcn-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--cyan);
  text-decoration: none;
  letter-spacing: 0.3px;
  transition: opacity 0.2s, gap 0.2s;
}

.tcn-back-link:hover {
  opacity: 0.75;
  gap: 12px;
}

/* ── JOBS SECTION ── */
.tcn-jobs {
  padding: 40px 64px 120px;
  position: relative;
}

.tcn-jobs-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.tcn-jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.tcn-job-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 200, 255, 0.12);
  border-radius: 24px;
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: border-color 0.3s, background 0.3s, transform 0.3s;
}

.tcn-job-card:hover {
  border-color: rgba(0, 200, 255, 0.3);
  background: rgba(0, 200, 255, 0.04);
  transform: translateY(-4px);
}

.tcn-job-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: var(--white);
  line-height: 1.3;
}

.tcn-job-title span {
  color: rgba(255, 255, 255, 0.65);
  font-weight: 700;
}

.tcn-job-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.8;
  flex: 1;
}

.tcn-postular-btn {
  align-self: flex-start;
  background: linear-gradient(135deg, var(--cyan) 0%, #0080ff 100%);
  color: #000;
  font-weight: 800;
  font-size: 14px;
  padding: 12px 28px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.2px;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.25s;
  margin-top: 8px;
}

.tcn-postular-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0, 200, 255, 0.4);
}

/* ── MODAL ── */
.tcn-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 13, 31, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: tcn-fade-in 0.25s ease;
}

@keyframes tcn-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.tcn-modal-box {
  background: var(--navy-2);
  border: 1px solid rgba(0, 200, 255, 0.15);
  border-radius: 28px;
  padding: 48px 44px;
  width: 100%;
  max-width: 520px;
  position: relative;
  animation: tcn-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: none;
}

.tcn-modal-box::-webkit-scrollbar { display: none; }

@keyframes tcn-scale-in {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.tcn-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--white);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
  font-family: inherit;
}

.tcn-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 200, 255, 0.3);
}

.tcn-modal-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--cyan);
  margin-bottom: 14px;
}

.tcn-modal-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.15;
  color: var(--white);
  margin-bottom: 32px;
}

.tcn-modal-title em {
  color: var(--cyan);
  font-style: normal;
}

.tcn-modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tcn-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tcn-form-group label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.tcn-form-group input[type="text"],
.tcn-form-group input[type="email"],
.tcn-form-group input[type="tel"] {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 200, 255, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--white);
  font-family: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.tcn-form-group input[type="text"]:focus,
.tcn-form-group input[type="email"]:focus,
.tcn-form-group input[type="tel"]:focus {
  border-color: rgba(0, 200, 255, 0.5);
  background: rgba(0, 200, 255, 0.04);
}

.tcn-form-group input[type="text"]::placeholder,
.tcn-form-group input[type="email"]::placeholder,
.tcn-form-group input[type="tel"]::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.tcn-form-group input[type="file"] {
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(0, 200, 255, 0.25);
  border-radius: 12px;
  padding: 14px 18px;
  color: rgba(255, 255, 255, 0.5);
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
}

.tcn-form-group input[type="file"]::-webkit-file-upload-button {
  background: rgba(0, 200, 255, 0.1);
  border: 1px solid rgba(0, 200, 255, 0.3);
  color: var(--cyan);
  border-radius: 8px;
  padding: 6px 16px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  margin-right: 12px;
  transition: background 0.2s;
}

.tcn-form-group input[type="file"]::-webkit-file-upload-button:hover {
  background: rgba(0, 200, 255, 0.18);
}

.tcn-submit-btn {
  background: linear-gradient(135deg, var(--cyan) 0%, #0080ff 100%);
  color: #000;
  font-weight: 800;
  font-size: 16px;
  padding: 16px 32px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.3px;
  width: 100%;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.25s;
  margin-top: 8px;
}

.tcn-submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(0, 200, 255, 0.45);
}

/* ── SUCCESS STATE ── */
.tcn-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px 0 20px;
}

.tcn-success-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--cyan) 0%, #0080ff 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #000;
  font-weight: 900;
  animation: tcn-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes tcn-pop {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.tcn-success h3 {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--white);
}

.tcn-success p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .tcn-hero { padding: 140px 32px 60px; min-height: auto; }
  .tcn-jobs { padding: 40px 32px 80px; }
  .tcn-jobs-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .tcn-hero { padding: 120px 24px 48px; }
  .tcn-heading { letter-spacing: -2px; }
  .tcn-jobs { padding: 32px 24px 60px; }
  .tcn-modal-box { padding: 36px 28px; }
}
```

- [ ] **Step 2: Verificar archivo creado**

Confirmar que `frontend/src/styles/trabaja-con-nosotros.css` existe.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/styles/trabaja-con-nosotros.css
git commit -m "feat: add trabaja-con-nosotros CSS styles"
```

---

### Task 3: Crear página TrabajaConNosotros.tsx

**Files:**
- Create: `frontend/src/pages/TrabajaConNosotros.tsx`

**Interfaces:**
- Consumes: `useMouseTracker` de `../hooks/useMouseTracker`, `Header` de `../components/Header`, `Link` de `react-router-dom`, CSS de `../styles/trabaja-con-nosotros.css`
- Consumes: clases `.fu`, `.vis`, `.d1`, `.d2`, `.d3`, `.d4` de `global.css` (Task 1), clases `.sn-tag` de `sobre-nosotros.css` (ya existe)
- Produces: export `TrabajaConNosotros` consumido por `App.tsx` (Task 1)

- [ ] **Step 1: Crear `frontend/src/pages/TrabajaConNosotros.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMouseTracker } from '../hooks/useMouseTracker';
import { Header } from '../components/Header';
import '../styles/trabaja-con-nosotros.css';
import '../styles/sobre-nosotros.css';

interface Job {
  id: number;
  title: string;
  company: string;
  desc: string;
}

const JOBS: Job[] = [
  {
    id: 1,
    title: 'Desarrolladores',
    company: 'IGNIS Solutions',
    desc: 'Búsqueda de desarrolladores en las siguientes tecnologías: .Net, C# y WPF. Flutter. HTML, JS, CSS y PHP.',
  },
  {
    id: 2,
    title: 'Profesores',
    company: 'Academia Ignis',
    desc: 'Búsqueda de profesores en: Python, Flask, Django, C#, WPF y/o Unity. Valorados (no excluyentes) conocimientos en ML y Ciencias de Datos.',
  },
  {
    id: 3,
    title: 'Especialistas Software',
    company: 'I+D',
    desc: 'Perfiles con conocimiento en AI, ML, BigData e IoT. Valorados (no excluyentes) conocimientos en Python, C/C++ y/o CUDA.',
  },
  {
    id: 4,
    title: 'Prototipado y Hardware',
    company: 'I+D',
    desc: 'Profesionales o estudiantes avanzados en ingeniería electrónica, mecatrónica y afines para prototipados y desarrollo de hardware.',
  },
];

export const TrabajaConNosotros = () => {
  useMouseTracker();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.he').forEach((el) => el.classList.add('in'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('vis', e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setSubmitted(false);
  };

  const closeModal = () => setSelectedJob(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="tcn-page">
      <div className="cursor visible" id="cur" />
      <div className="cursor-ring visible" id="ring" />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="tcn-hero">
          <div className="tcn-hero-orb-1" />
          <div className="tcn-hero-orb-2" />
          <div className="tcn-hero-inner">
            <span className="sn-tag">Trabaja con nosotros</span>
            <h1 className="tcn-heading fu">
              Unite a nuestro <em>equipo!</em>
            </h1>
            <p className="tcn-subtitle fu d1">
              Explorá las vacantes abiertas y postulate desde un flujo simple, claro y preparado para crecer.
            </p>
            <Link to="/" className="tcn-back-link fu d2">
              ← Volver al inicio
            </Link>
          </div>
        </section>

        {/* ── JOBS GRID ── */}
        <section className="tcn-jobs">
          <div className="tcn-jobs-inner">
            <div className="tcn-jobs-grid">
              {JOBS.map((job, i) => (
                <div key={job.id} className={`tcn-job-card fu d${i + 1}`}>
                  <h3 className="tcn-job-title">
                    {job.title} <span>- {job.company}</span>
                  </h3>
                  <p className="tcn-job-desc">{job.desc}</p>
                  <button
                    className="tcn-postular-btn"
                    onClick={() => openModal(job)}
                  >
                    Postularme
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── MODAL ── */}
      {selectedJob && (
        <div
          className="tcn-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="tcn-modal-box">
            <button className="tcn-modal-close" onClick={closeModal}>
              ✕
            </button>

            {submitted ? (
              <div className="tcn-success">
                <span className="tcn-success-icon">✓</span>
                <h3>¡Postulación enviada!</h3>
                <p>Te contactaremos a la brevedad.</p>
                <button className="tcn-postular-btn" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <span className="tcn-modal-label">POSTULACIÓN</span>
                <h2 className="tcn-modal-title">
                  {selectedJob.title}{' '}
                  <em>- {selectedJob.company}</em>
                </h2>
                <form onSubmit={handleSubmit} className="tcn-modal-form">
                  <div className="tcn-form-group">
                    <label>NOMBRE COMPLETO</label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="tcn-form-group">
                    <label>E-MAIL</label>
                    <input
                      type="email"
                      placeholder="nombre@correo.com"
                      required
                    />
                  </div>
                  <div className="tcn-form-group">
                    <label>TELÉFONO</label>
                    <input type="tel" placeholder="+54 11 1234 5678" />
                  </div>
                  <div className="tcn-form-group">
                    <label>SUBIR CV</label>
                    <input type="file" accept=".pdf,.doc,.docx" />
                  </div>
                  <button type="submit" className="tcn-submit-btn">
                    Enviar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Verificar TypeScript**

Correr en `frontend/`:
```bash
npx tsc --noEmit
```
Expected: sin errores.

- [ ] **Step 3: Verificar en browser**

Navegar a `http://localhost:5173/trabaja-con-nosotros`. Verificar:
- Hero aparece con animación fade-up al cargar
- Cards aparecen escalonadas al scrollear (d1→d2→d3→d4)
- Click en "Postularme" abre modal con nombre del puesto
- Modal cierra con X, con Escape, o click fuera
- Submit muestra estado de éxito

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/TrabajaConNosotros.tsx
git commit -m "feat: add TrabajaConNosotros page with job cards, modal, and scroll animations"
```
