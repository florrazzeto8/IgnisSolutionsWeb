import { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../utils/constants';
import '../styles/process.css';

interface StepProps {
  number: string;
  title: string;
  desc: string;
}

const Step: React.FC<StepProps> = ({ number, title, desc }) => {
  return (
    <div className="step">
      <div className="step-n">{number}</div>
      <div className="step-body">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export const Process = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stepElements = stepsRef.current?.querySelectorAll('.step') || [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stepElements.forEach((s) => s.classList.remove('active'));
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.65 }
    );

    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="process" id="process">
      <div className="process-inner">
        <div className="process-left">
          <div className="sec-tag">Cómo trabajamos</div>
          <h2 className="sec-title fu">
            Del concepto
            <br />
            al <span className="acc">producto</span>
            <br />
            en producción
          </h2>
          <p className="sec-sub fu d1">
            Un proceso claro, sin sorpresas. Sabés en todo momento en qué etapa
            está tu proyecto.
          </p>
        </div>
        <div className="process-steps" ref={stepsRef}>
          {PROCESS_STEPS.map((step, idx) => (
            <Step
              key={idx}
              number={step.number}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
