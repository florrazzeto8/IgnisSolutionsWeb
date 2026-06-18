import { useEffect, useRef } from 'react';
import { SERVICES } from '../utils/constants';
import '../styles/services.css';

const PANEL_ARTS = [
  // Panel 1: Desarrollo de Software — terminal isométrico + engranajes
  <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sg1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0"/>
      </radialGradient>
      <filter id="glow1">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    {/* Glow background */}
    <ellipse cx="250" cy="190" rx="200" ry="160" fill="url(#sg1)"/>
    {/* Main terminal window */}
    <rect x="60" y="60" width="280" height="200" rx="12" fill="#020d18" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1.2"/>
    <rect x="60" y="60" width="280" height="32" rx="12" fill="#00c8ff" fillOpacity=".07"/>
    <rect x="60" y="80" width="280" height="12" fill="#00c8ff" fillOpacity=".03"/>
    <circle cx="82" cy="76" r="5" fill="#ff5f57" fillOpacity=".7"/>
    <circle cx="98" cy="76" r="5" fill="#ffbd2e" fillOpacity=".7"/>
    <circle cx="114" cy="76" r="5" fill="#28ca41" fillOpacity=".7"/>
    <line x1="60" y1="92" x2="340" y2="92" stroke="#00c8ff" strokeOpacity=".1" strokeWidth="1"/>
    {/* Code lines */}
    <text x="80" y="118" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".9">$ git clone repo.git</text>
    <text x="80" y="136" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".45">  Cloning into 'proyecto'...</text>
    <text x="80" y="154" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".9">$ npm install</text>
    <text x="80" y="172" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".4">  added 1243 packages</text>
    <text x="80" y="190" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".9">$ npm run build</text>
    <text x="80" y="208" fontFamily="monospace" fontSize="11" fill="#28ca41" fillOpacity=".85">  ✓ Built in 0.8s</text>
    <text x="80" y="226" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".9">$ _</text>
    <rect x="80" y="232" width="8" height="3" rx="1" fill="#00c8ff" fillOpacity=".9">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
    {/* Floating gear large */}
    <g transform="translate(370,100)" filter="url(#glow1)">
      <circle cx="0" cy="0" r="28" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="2" fill="#00c8ff" fillOpacity=".04"/>
      <circle cx="0" cy="0" r="11" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1.5" fill="none"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <rect key={i} x="-4" y="-36" width="8" height="12" rx="2"
          fill="#00c8ff" fillOpacity=".3" stroke="#00c8ff" strokeOpacity=".4" strokeWidth=".8"
          transform={`rotate(${a})`}/>
      ))}
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" additive="sum" repeatCount="indefinite"/>
    </g>
    {/* Floating gear small */}
    <g transform="translate(410,170)">
      <circle cx="0" cy="0" r="16" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".02"/>
      <circle cx="0" cy="0" r="6" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1" fill="none"/>
      {[0,60,120,180,240,300].map((a,i)=>(
        <rect key={i} x="-2.5" y="-22" width="5" height="8" rx="1.5"
          fill="#00c8ff" fillOpacity=".2" strokeWidth=".5"
          transform={`rotate(${a})`}/>
      ))}
      <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="8s" additive="sum" repeatCount="indefinite"/>
    </g>
    {/* Floating code fragment */}
    <rect x="360" y="220" width="110" height="60" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1"/>
    <text x="372" y="241" fontFamily="monospace" fontSize="9" fill="#00c8ff" fillOpacity=".6">function build()</text>
    <text x="372" y="256" fontFamily="monospace" fontSize="9" fill="#00c8ff" fillOpacity=".4">  return output</text>
    <text x="372" y="271" fontFamily="monospace" fontSize="9" fill="#00c8ff" fillOpacity=".6">{'}'}</text>
    {/* Connector line */}
    <line x1="340" y1="160" x2="360" y2="160" stroke="#00c8ff" strokeOpacity=".15" strokeWidth="1" strokeDasharray="4 3"/>
    {/* Bottom dots */}
    <circle cx="150" cy="310" r="3" fill="#00c8ff" fillOpacity=".4"/>
    <circle cx="200" cy="320" r="2" fill="#00c8ff" fillOpacity=".2"/>
    <circle cx="310" cy="300" r="2.5" fill="#00c8ff" fillOpacity=".3"/>
    <circle cx="370" cy="315" r="2" fill="#00c8ff" fillOpacity=".15"/>
  </svg>,

  // Panel 1 (was 3): Soluciones Empresariales — nodos conectados + workflow
  <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sg4" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="250" cy="200" rx="220" ry="170" fill="url(#sg4)"/>
    {/* Central hub */}
    <circle cx="250" cy="190" r="36" fill="#020d18" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="2"/>
    <circle cx="250" cy="190" r="26" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" fill="none"/>
    <circle cx="250" cy="190" r="14" fill="#00c8ff" fillOpacity=".12" stroke="#00c8ff" strokeOpacity=".6" strokeWidth="1.5"/>
    {/* Hub pulse ring */}
    <circle cx="250" cy="190" r="36" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.5" fill="none">
      <animate attributeName="r" values="36;52;36" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="stroke-opacity" values=".4;0;.4" dur="3s" repeatCount="indefinite"/>
    </circle>
    {/* Node: top */}
    <line x1="250" y1="154" x2="250" y2="90" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" strokeDasharray="5 4"/>
    <rect x="220" y="58" width="60" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1"/>
    <text x="233" y="78" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".7">ERP</text>
    {/* Node: bottom */}
    <line x1="250" y1="226" x2="250" y2="290" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" strokeDasharray="5 4"/>
    <rect x="220" y="290" width="60" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1"/>
    <text x="232" y="310" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".65">CRM</text>
    {/* Node: left */}
    <line x1="214" y1="190" x2="130" y2="190" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" strokeDasharray="5 4"/>
    <rect x="68" y="174" width="62" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1"/>
    <text x="78" y="194" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".65">Analytics</text>
    {/* Node: right */}
    <line x1="286" y1="190" x2="370" y2="190" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" strokeDasharray="5 4"/>
    <rect x="370" y="174" width="62" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1"/>
    <text x="382" y="194" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".7">BI</text>
    {/* Node: top-left */}
    <line x1="224" y1="165" x2="140" y2="110" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1" strokeDasharray="4 4"/>
    <rect x="96" y="88" width="64" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <text x="105" y="108" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".55">Integración</text>
    {/* Node: top-right */}
    <line x1="276" y1="165" x2="360" y2="110" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1" strokeDasharray="4 4"/>
    <rect x="342" y="88" width="72" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <text x="352" y="108" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".55">Reporting</text>
    {/* Node: bottom-right */}
    <line x1="276" y1="215" x2="360" y2="270" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1" strokeDasharray="4 4"/>
    <rect x="342" y="262" width="70" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1"/>
    <text x="354" y="282" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".5">Cloud</text>
    {/* Node: bottom-left */}
    <line x1="224" y1="215" x2="140" y2="270" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1" strokeDasharray="4 4"/>
    <rect x="88" y="262" width="70" height="32" rx="8" fill="#020d18" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1"/>
    <text x="100" y="282" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".5">Workflow</text>
    {/* Floating data particles */}
    <circle cx="175" cy="145" r="2.5" fill="#00c8ff" fillOpacity=".6">
      <animate attributeName="opacity" values=".6;1;.6" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="325" cy="145" r="2.5" fill="#00c8ff" fillOpacity=".5">
      <animate attributeName="opacity" values=".5;1;.5" dur="2.4s" begin=".5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="175" cy="240" r="2" fill="#00c8ff" fillOpacity=".4">
      <animate attributeName="opacity" values=".4;.9;.4" dur="1.8s" begin=".3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="325" cy="240" r="2" fill="#00c8ff" fillOpacity=".4">
      <animate attributeName="opacity" values=".4;.9;.4" dur="2.2s" begin=".7s" repeatCount="indefinite"/>
    </circle>
  </svg>,

  // Panel 2 (was 4): I+D — átomo + curvas de datos + laboratorio futurista
  <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sg5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="250" cy="190" rx="200" ry="160" fill="url(#sg5)"/>
    {/* Atom nucleus */}
    <circle cx="250" cy="190" r="14" fill="#00c8ff" fillOpacity=".2" stroke="#00c8ff" strokeOpacity=".8" strokeWidth="2"/>
    <circle cx="250" cy="190" r="7" fill="#00c8ff" fillOpacity=".6"/>
    {/* Orbit 1 */}
    <ellipse cx="250" cy="190" rx="80" ry="30" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1.2" fill="none">
      <animateTransform attributeName="transform" type="rotate" from="0 250 190" to="360 250 190" dur="6s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="250" cy="160" r="6" fill="#00c8ff" fillOpacity=".7" stroke="#00c8ff" strokeOpacity=".9" strokeWidth="1">
      <animateTransform attributeName="transform" type="rotate" from="0 250 190" to="360 250 190" dur="6s" repeatCount="indefinite"/>
    </circle>
    {/* Orbit 2 */}
    <ellipse cx="250" cy="190" rx="80" ry="30" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1.2" fill="none"
      transform="rotate(60 250 190)">
      <animateTransform attributeName="transform" type="rotate" from="60 250 190" to="420 250 190" dur="9s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="330" cy="190" r="5" fill="#00c8ff" fillOpacity=".6">
      <animateTransform attributeName="transform" type="rotate" from="60 250 190" to="420 250 190" dur="9s" repeatCount="indefinite"/>
    </circle>
    {/* Orbit 3 */}
    <ellipse cx="250" cy="190" rx="80" ry="30" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1" fill="none"
      transform="rotate(-60 250 190)">
      <animateTransform attributeName="transform" type="rotate" from="-60 250 190" to="300 250 190" dur="7s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="250" cy="220" r="5" fill="#00c8ff" fillOpacity=".5">
      <animateTransform attributeName="transform" type="rotate" from="-60 250 190" to="300 250 190" dur="7s" repeatCount="indefinite"/>
    </circle>
    {/* Data curves */}
    <path d="M 60 310 Q 120 280 160 295 Q 200 310 230 270 Q 260 230 300 250 Q 340 270 380 220 Q 410 180 440 200" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1.8" fill="none"/>
    <path d="M 60 330 Q 130 310 180 320 Q 220 330 260 305 Q 300 280 350 290 Q 390 300 440 270" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1.2" fill="none"/>
    {/* Data point */}
    <circle cx="380" cy="220" r="4" fill="#00c8ff" fillOpacity=".9"/>
    <circle cx="380" cy="220" r="9" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1" fill="none">
      <animate attributeName="r" values="9;16;9" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="stroke-opacity" values=".3;0;.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    {/* Left panel — formula */}
    <rect x="30" y="60" width="120" height="80" rx="10" fill="#020d18" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <text x="45" y="85" fontSize="10" fontFamily="monospace" fill="#00c8ff" fillOpacity=".6">E = mc²</text>
    <text x="45" y="103" fontSize="10" fontFamily="monospace" fill="#00c8ff" fillOpacity=".4">f(x) = Σaₙxⁿ</text>
    <text x="45" y="121" fontSize="10" fontFamily="monospace" fill="#00c8ff" fillOpacity=".5">∇²φ = ρ/ε₀</text>
    {/* Right panel — metrics */}
    <rect x="350" y="60" width="120" height="80" rx="10" fill="#020d18" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <text x="362" y="80" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".5">Accuracy</text>
    <rect x="362" y="86" width="88" height="6" rx="3" fill="#00c8ff" fillOpacity=".07"/>
    <rect x="362" y="86" width="80" height="6" rx="3" fill="#00c8ff" fillOpacity=".35"/>
    <text x="362" y="108" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".5">F1 Score</text>
    <rect x="362" y="114" width="88" height="6" rx="3" fill="#00c8ff" fillOpacity=".07"/>
    <rect x="362" y="114" width="70" height="6" rx="3" fill="#00c8ff" fillOpacity=".3"/>
    <text x="362" y="132" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".5">Precision</text>
    {/* Floating molecule nodes */}
    <circle cx="90" cy="240" r="6" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.2" fill="#00c8ff" fillOpacity=".05"/>
    <circle cx="120" cy="255" r="5" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1" fill="none"/>
    <circle cx="75" cy="262" r="4" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" fill="none"/>
    <line x1="90" y1="246" x2="120" y2="255" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8"/>
    <line x1="90" y1="246" x2="75" y2="262" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8"/>
    <line x1="120" y1="255" x2="75" y2="262" stroke="#00c8ff" strokeOpacity=".15" strokeWidth=".8"/>
    {/* Floating molecule 2 */}
    <circle cx="410" cy="280" r="7" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1.2" fill="#00c8ff" fillOpacity=".04"/>
    <circle cx="438" cy="268" r="5" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" fill="none"/>
    <circle cx="428" cy="298" r="4" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" fill="none"/>
    <line x1="410" y1="280" x2="438" y2="268" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8"/>
    <line x1="410" y1="280" x2="428" y2="298" stroke="#00c8ff" strokeOpacity=".18" strokeWidth=".8"/>
  </svg>,

  // Panel 3 (was 5): Consultoría — gráfico ascendente + red de personas + flecha estrategia
  <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sg6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="bar6a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.15"/>
      </linearGradient>
      <linearGradient id="bar6b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.55"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="bar6c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.85"/>
        <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.18"/>
      </linearGradient>
    </defs>
    <ellipse cx="250" cy="190" rx="210" ry="165" fill="url(#sg6)"/>
    {/* Chart background */}
    <rect x="60" y="80" width="280" height="180" rx="12" fill="#020d18" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1"/>
    {/* Grid lines */}
    <line x1="80" y1="240" x2="320" y2="240" stroke="#00c8ff" strokeOpacity=".08" strokeWidth="1"/>
    <line x1="80" y1="210" x2="320" y2="210" stroke="#00c8ff" strokeOpacity=".06" strokeWidth="1"/>
    <line x1="80" y1="180" x2="320" y2="180" stroke="#00c8ff" strokeOpacity=".06" strokeWidth="1"/>
    <line x1="80" y1="150" x2="320" y2="150" stroke="#00c8ff" strokeOpacity=".06" strokeWidth="1"/>
    <line x1="80" y1="120" x2="320" y2="120" stroke="#00c8ff" strokeOpacity=".06" strokeWidth="1"/>
    {/* Bars */}
    <rect x="92" y="210" width="30" height="30" rx="4" fill="url(#bar6a)"/>
    <rect x="140" y="190" width="30" height="50" rx="4" fill="url(#bar6b)"/>
    <rect x="188" y="165" width="30" height="75" rx="4" fill="url(#bar6a)"/>
    <rect x="236" y="140" width="30" height="100" rx="4" fill="url(#bar6b)"/>
    <rect x="284" y="108" width="30" height="132" rx="4" fill="url(#bar6c)"/>
    {/* Trend line */}
    <polyline points="107,210 155,185 203,158 251,135 299,100" stroke="#00c8ff" strokeOpacity=".8" strokeWidth="1.8" fill="none" strokeDasharray="6 3"/>
    {/* Arrow at end */}
    <polygon points="299,100 310,94 307,106" fill="#00c8ff" fillOpacity=".9"/>
    {/* Chart labels */}
    <text x="92" y="255" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".4">Q1</text>
    <text x="140" y="255" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".4">Q2</text>
    <text x="188" y="255" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".4">Q3</text>
    <text x="236" y="255" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".4">Q4</text>
    <text x="284" y="255" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".6">Q5</text>
    {/* Chart title */}
    <text x="75" y="101" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".55">Crecimiento del negocio</text>
    {/* People network — right side */}
    {/* Person top */}
    <circle cx="405" cy="110" r="10" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".06"/>
    <circle cx="405" cy="107" r="4" fill="#00c8ff" fillOpacity=".4"/>
    <path d="M396 118 Q405 125 414 118" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1" fill="none"/>
    {/* Person left */}
    <circle cx="375" cy="165" r="10" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".05"/>
    <circle cx="375" cy="162" r="4" fill="#00c8ff" fillOpacity=".35"/>
    <path d="M366 173 Q375 180 384 173" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1" fill="none"/>
    {/* Person right */}
    <circle cx="445" cy="165" r="10" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".05"/>
    <circle cx="445" cy="162" r="4" fill="#00c8ff" fillOpacity=".35"/>
    <path d="M436 173 Q445 180 454 173" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1" fill="none"/>
    {/* Person bottom center */}
    <circle cx="410" cy="220" r="12" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1.8" fill="#00c8ff" fillOpacity=".08"/>
    <circle cx="410" cy="217" r="5" fill="#00c8ff" fillOpacity=".5"/>
    <path d="M399 229 Q410 238 421 229" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1.2" fill="none"/>
    {/* Connection lines */}
    <line x1="405" y1="120" x2="375" y2="155" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3"/>
    <line x1="405" y1="120" x2="445" y2="155" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3"/>
    <line x1="375" y1="175" x2="410" y2="208" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3"/>
    <line x1="445" y1="175" x2="410" y2="208" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3"/>
    {/* Floating badge */}
    <rect x="355" y="285" width="110" height="36" rx="10" fill="#020d18" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1"/>
    <text x="370" y="303" fontSize="9" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".7">Estrategia Digital</text>
    <text x="370" y="315" fontSize="8" fontFamily="sans-serif" fill="#00c8ff" fillOpacity=".4">Roadmap 2026 →</text>
    {/* Bottom glow dots */}
    <circle cx="180" cy="330" r="2" fill="#00c8ff" fillOpacity=".25"/>
    <circle cx="250" cy="345" r="1.5" fill="#00c8ff" fillOpacity=".15"/>
    <circle cx="320" cy="335" r="2" fill="#00c8ff" fillOpacity=".2"/>
  </svg>,
];

interface ServicePanelProps {
  title: string;
  desc: string;
  tags: string[];
  artIndex: number;
}

const ServicePanel: React.FC<ServicePanelProps> = ({ title, desc, tags, artIndex }) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="service-panel" ref={panelRef}>
      <div className="panel-left">
        <h2 className="panel-title">{title}</h2>
        <p className="panel-desc">{desc}</p>
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="t">{tag}</span>
          ))}
        </div>
      </div>
      <div className="panel-right">
        <div className="panel-art">{PANEL_ARTS[artIndex]}</div>
      </div>
    </div>
  );
};

export const Services = () => {
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panels = gridRef.current?.querySelectorAll('.service-panel') || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting));
      },
      { threshold: 0.1 }
    );
    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const zone = zoneRef.current;
    const grid = gridRef.current;
    const dotsWrap = dotsRef.current;
    if (!zone || !grid || !dotsWrap) return;

    const dots = Array.from(dotsWrap.children) as HTMLElement[];

    function setHeight() {
      const slideW = Math.max(0, grid!.scrollWidth - window.innerWidth + 180);
      zone!.style.height = window.innerHeight + slideW * 1.4 + 'px';
    }

    function tick() {
      const zr = zone!.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -zr.top / (zone!.offsetHeight - window.innerHeight)));
      const maxSlide = Math.max(0, grid!.scrollWidth - window.innerWidth + 180);
      grid!.style.transform = `translateX(${-p * maxSlide}px)`;
      const active = Math.min(dots.length - 1, Math.round(p * (dots.length - 1)));
      dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    setHeight();
    const onResize = () => { setHeight(); tick(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', tick);
    };
  }, []);

  return (
    <div className="services-zone" ref={zoneRef}>
      <section className="services" id="services">
        <div className="sec-tag">Servicios</div>
        <div className="cards-grid" ref={gridRef}>
          {SERVICES.map((service, idx) => (
            <ServicePanel key={idx} {...service} artIndex={idx} />
          ))}
        </div>
        <div id="hscroll-dots" ref={dotsRef}>
          {SERVICES.map((_, idx) => (
            <div key={idx} className="hscroll-dot" />
          ))}
        </div>
      </section>
    </div>
  );
};
