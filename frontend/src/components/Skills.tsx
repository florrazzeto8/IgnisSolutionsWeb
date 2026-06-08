import { useEffect, useRef } from 'react';
import { SKILLS, STACK } from '../utils/constants';
import '../styles/skills.css';

interface SkillBarProps {
  label: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ label, percentage }) => {
  const skillRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && fillRef.current) {
          fillRef.current.style.width = percentage + '%';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (skillRef.current) observer.observe(skillRef.current);

    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div className="skill" ref={skillRef}>
      <div className="skill-hdr">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="track">
        <div
          ref={fillRef}
          className="fill"
          style={{ width: 0 }}
          data-w={percentage}
        ></div>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section className="stack" id="stack">
      <div className="stack-inner">
        <div>
          <div className="sec-tag">Stack Tecnológico</div>
          <h2 className="sec-title fu">
            Tecnologías que<br />
            <span className="acc">dominamos</span>
          </h2>
          <p className="sec-sub fu d1">
            Elegimos la herramienta correcta para cada problema, no la de moda.
          </p>

          <div style={{ marginTop: '44px' }}>
            {Object.entries(STACK).map(([category, techs], idx) => (
              <div key={idx} className={`cat fu d${idx + 1}`}>
                <div className="cat-label">{category}</div>
                <div className="pills">
                  {techs.map((tech, tidx) => (
                    <span key={tidx} className="pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fu d1">
          {SKILLS.map((skill, idx) => (
            <SkillBar
              key={idx}
              label={skill.label}
              percentage={skill.percentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
