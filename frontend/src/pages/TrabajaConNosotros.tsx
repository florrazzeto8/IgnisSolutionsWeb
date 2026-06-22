import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMouseTracker } from '../hooks/useMouseTracker';
import { Header } from '../components/Header';
import { ParticleSystem } from '../components/ParticleSystem';
import '../styles/trabaja-con-nosotros.css';

// ── Reemplazá estos valores con los de tu cuenta Cloudinary ──
const CLOUDINARY_CLOUD_NAME = 'g2m4yuov';
const CLOUDINARY_UPLOAD_PRESET = 'cv_upload';

const CV_MAX_BYTES = 20 * 1024 * 1024;

type Step = 'idle' | 'uploading' | 'submitting';

export const TrabajaConNosotros = () => {
  useMouseTracker();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const cvFile = formData.get('attachment') as File | null;
    if (cvFile && cvFile.size > CV_MAX_BYTES) {
      setError('El CV no puede superar los 20 MB.');
      return;
    }

    // ── Step 1: subir CV a Cloudinary ──
    let cvUrl = '';
    if (cvFile && cvFile.size > 0) {
      setStep('uploading');
      try {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', cvFile);
        cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        cloudinaryData.append('resource_type', 'raw');

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
          { method: 'POST', body: cloudinaryData }
        );
        const cloudJson = await cloudRes.json();
        if (!cloudRes.ok || !cloudJson.secure_url) {
          throw new Error(cloudJson.error?.message || 'Error subiendo CV.');
        }
        cvUrl = cloudJson.secure_url.replace('/image/upload/', '/raw/upload/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error subiendo CV. Intentá de nuevo.');
        setStep('idle');
        return;
      }
    }

    // ── Step 2: enviar a Web3Forms ──
    setStep('submitting');
    formData.delete('attachment');
    if (cvUrl) formData.append('curriculum_url', cvUrl);

    const applicantName = (formData.get('name') as string) || 'Sin nombre';
    formData.append('from_name', applicantName);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (data.success) {
        form.reset();
        setSubmitted(true);
      } else {
        setError(data.message || 'Error al enviar. Intentá de nuevo.');
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setStep('idle');
    }
  };

  const buttonLabel = step === 'uploading'
    ? 'Subiendo CV...'
    : step === 'submitting'
      ? 'Enviando postulación...'
      : 'Enviar';

  return (
    <div className="tcn-page">
      <ParticleSystem />
      <div className="cursor visible" id="cur" />
      <div className="cursor-ring visible" id="ring" />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="tcn-hero">
          <div className="tcn-hero-orb-1" />
          <div className="tcn-hero-orb-2" />
          <div className="tcn-hero-inner">
            <h1 className="tcn-heading fu d1">
              Unite a nuestro <em>equipo!</em>
            </h1>
            <p className="tcn-subtitle fu d2">
              Explorá las vacantes abiertas y postulate desde un flujo simple, claro y preparado para crecer.
            </p>
            <Link to="/" className="tcn-back-link fu d3">
              ← Volver al inicio
            </Link>
          </div>
        </section>

        {/* ── PANEL ── */}
        <section className="tcn-panel">
          <div className="tcn-panel-inner">
            <div className="tcn-modal-box fu d1">
              {submitted ? (
                <div className="tcn-success">
                  <span className="tcn-success-icon">✓</span>
                  <h3>¡Postulación enviada!</h3>
                  <p>Te contactaremos a la brevedad.</p>
                  <button className="tcn-postular-btn" style={{ alignSelf: 'center' }} onClick={() => setSubmitted(false)}>
                    Volver
                  </button>
                </div>
              ) : (
                <>
                  <span className="tcn-modal-label">POSTULACIÓN</span>
                  <h2 className="tcn-modal-title">Postulate al <em>equipo</em></h2>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    encType="multipart/form-data"
                    className="tcn-modal-form"
                  >
                    <input type="hidden" name="access_key" value="f13fa220-80fd-4ff6-a62a-0c3e65b9faa7" />
                    <input type="hidden" name="subject" value="Nueva postulación" />
                    <div className="tcn-form-group">
                      <label>NOMBRE COMPLETO</label>
                      <input name="name" type="text" placeholder="Tu nombre completo" required />
                    </div>
                    <div className="tcn-form-group">
                      <label>E-MAIL</label>
                      <input name="email" type="email" placeholder="nombre@correo.com" required />
                    </div>
                    <div className="tcn-form-group">
                      <label>TELÉFONO</label>
                      <input name="telefono" type="tel" placeholder="+54 11 1234 5678" />
                    </div>
                    <div className="tcn-form-group">
                      <label>SUBIR CV</label>
                      <input name="attachment" type="file" accept=".pdf,.doc,.docx" />
                    </div>
                    {error && (
                      <p style={{ color: '#ff4d4d', fontSize: 13, margin: 0 }}>{error}</p>
                    )}
                    <button type="submit" className="tcn-submit-btn" disabled={step !== 'idle'}>
                      {buttonLabel}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
