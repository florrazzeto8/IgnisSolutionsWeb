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
