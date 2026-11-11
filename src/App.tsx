import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from './data/profile';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { JOBS, Job, STATUS_LABEL, WORLD_LABEL } from './data/work';
import './app.css';

// Background of the floating preview card for each project with a screenshot.
const PREVIEW_BG: Record<string, string> = {
  ponme: '#CDD3BC',
  micartaya: '#1F2B3C',
  presupuestoya: '#DCC7A6',
  orderya: '#38443A',
  tratoya: '#C9D4DE',
  beatlist: '#1A1A1A',
  orbe: '#DFE4D6',
  dedica: '#E6DED2',
};

// The list shows only finished products with a screenshot; the rest goes to the horizontal section.
const LIST_IDS = ['ponme', 'orbe', 'dedica', 'micartaya', 'presupuestoya', 'orderya', 'beatlist'];
const WORK = LIST_IDS.map((id) => JOBS.find((j) => j.id === id)!);
const WITH_SHOT = WORK;
const BEHIND = JOBS.filter((j) => !LIST_IDS.includes(j.id) && j.id !== 'pauta');

// One big figure or word per card, so cards without a screenshot still have a focal point.
const HOOK: Record<string, [string, string]> = {
  mirador: ['32', 'sistemas vigilados desde mi propia intranet'],
  servidor: ['11', 'servidores en los que despliego y opero'],
  yatelemetry: ['3.600', 'eventos definidos para 11 apps'],
  tpv: ['3', 'apps que siguen cobrando aunque se caiga internet'],
  firmaya: ['SHA-256', 'para comprobar cada documento firmado'],
  intranet: ['ERP', 'la intranet lee los clientes del programa de gestión'],
  'sw-clips': ['GPU', 'propia para cortar vídeos con IA'],
  'sw-encuestas': ['Chat', 'que responde preguntas sobre encuestas electorales'],
  'sw-audiencias': ['Word', 'informes generados desde un mapa'],
  'sw-mapas': ['0', 'datos que liguen una respuesta a quien contesta'],
  'sw-telemetria': ['1', 'panel con el estado de todos los proyectos'],
  tratoya: ['CRM', 'cada oportunidad con su siguiente paso apuntado'],
};
// Pauta: the content pipeline, lit step by step as you scroll through its section.
const PAUTA_STEPS: [string, string][] = [
  ['Idea', 'brief del proyecto'],
  ['Guion', 'la IA lo escribe con las guías y la biblioteca'],
  ['Gancho', 'elijo yo entre varias opciones'],
  ['Voz', 'locución sintética'],
  ['Subtítulos', 'sincronizados con la voz'],
  ['Render', 'vídeo o carrusel con Remotion'],
  ['Publicar', 'Instagram y TikTok, tras revisión'],
  ['Métricas', 'lo que funciona vuelve a las guías'],
];

const CARD_TONES = ['fo-tone-dark', 'fo-tone-accent', 'fo-tone-light'];
const DARK = { bg: '#121212', ink: '#EDEDE8' };
const pinnedOn = () => window.matchMedia('(min-width: 861px) and (hover: hover)').matches;
const BASE = { bg: '#E9E7E2', ink: '#121212' };

function useJerezClock(): string {
  const fmt = () =>
    new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export const App: React.FC = () => {
  const still = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pautaRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const clock = useJerezClock();

  // Inertial smooth scroll; it drives the native scroll position, so the rAF loop below still reads scrollY.
  useEffect(() => {
    if (still) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [still]);

  // One rAF loop: name marquee (direction follows scroll), hero circle, preview card + "Ver"
  // bubble trailing the cursor, and the page color of the section in the middle of the screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let x = 0;
    let dir = -1;
    let lastY = window.scrollY;
    let mx = window.innerWidth * 0.62;
    let my = window.innerHeight * 0.45;
    let bx = mx, by = my, cx = mx, cy = my, vx = mx, vy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('pointermove', onMove);

    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-bg]'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add('is-in')),
      { threshold: 0.2 }
    );
    root.querySelectorAll('.fo-reveal').forEach((el) => io.observe(el));

    const frame = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y !== lastY) dir = y > lastY ? -1 : 1;
      const speed = Math.min(6, 0.6 + Math.abs(y - lastY) * 0.15);
      lastY = y;

      if (!still) {
        const track = trackRef.current;
        if (track) {
          x += dir * speed;
          const half = track.scrollWidth / 2;
          if (x <= -half) x += half;
          if (x > 0) x -= half;
          track.style.transform = `translate3d(${x}px,0,0)`;
        }
        bx += (mx - bx) * 0.08;
        by += (my + y - by) * 0.08; // hero circle lives in page coords
        blobRef.current?.style.setProperty('transform', `translate3d(${bx}px, ${by}px, 0) translate(-50%, -50%)`);
      }

      // Card trails slowly, the bubble a bit faster: that gap is what makes it feel alive.
      const k1 = still ? 1 : 0.12;
      const k2 = still ? 1 : 0.22;
      cx += (mx - cx) * k1;
      cy += (my - cy) * k1;
      vx += (mx - vx) * k2;
      vy += (my - vy) * k2;
      cardRef.current?.style.setProperty('transform', `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`);
      viewRef.current?.style.setProperty('transform', `translate3d(${vx}px, ${vy}px, 0) translate(-50%, -50%)`);

      // Pinned section: vertical scroll inside it moves the card rail sideways.
      const pin = pinRef.current;
      const rail = railRef.current;
      if (pin && rail) {
        if (pinnedOn()) {
          const extra = rail.scrollWidth - window.innerWidth;
          pin.style.height = `${extra + vh}px`;
          const r = pin.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
          rail.style.transform = `translate3d(${-p * extra}px,0,0)`;
        } else {
          pin.style.height = '';
          rail.style.transform = '';
        }
      }

      // Pauta: progress through its section lights the pipeline steps in order.
      const pauta = pautaRef.current;
      if (pauta) {
        // Measured on the step row itself: lights up from when it enters until it reaches mid-screen.
        const r = (pauta.querySelector('.fo-steps') as HTMLElement).getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.45)));
        pauta.style.setProperty('--p', String(p));
        const lit = Math.floor(p * (PAUTA_STEPS.length + 0.5));
        pauta.querySelectorAll('.fo-step').forEach((el, i) => el.classList.toggle('is-lit', i < lit));
      }

      const mid = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= vh * 0.5 && r.bottom > vh * 0.5;
      });
      if (mid) {
        root.style.setProperty('--bg', mid.dataset.bg!);
        root.style.setProperty('--ink', mid.dataset.ink!);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
    };
  }, [still]);

  const previewIndex = WITH_SHOT.findIndex((j) => j.id === hovered);
  const showPreview = previewIndex >= 0 && open !== hovered;

  return (
    <div
      ref={rootRef}
      className={`fo-root${still ? ' fo-still' : ''}`}
      style={{ ['--bg' as string]: BASE.bg, ['--ink' as string]: BASE.ink }}
    >
      <header className="fo-top">
        <a href="/" className="fo-mark">© Nico Álvarez</a>
        <nav>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="fo-hero" data-bg={BASE.bg} data-ink={BASE.ink}>
        <div ref={blobRef} className="fo-blob" aria-hidden="true" />
        <div className="fo-where">
          <span>En Jerez<br />{clock}</span>
          <i aria-hidden="true">◐</i>
        </div>
        <p className="fo-role">
          <span aria-hidden="true">↘</span>
          Ingeniero de software.
          <br />
          Con agentes de IA como equipo,
          <br />
          mantengo <em>más de 30 sistemas.</em>
        </p>
        <h1 className="fo-name">
          <span className="fo-sr">Nico Álvarez</span>
          <div ref={trackRef} className="fo-track" aria-hidden="true">
            {[0, 1].map((k) => (
              <span key={k}>
                Nico Álvarez <b>—</b> Nico Álvarez <b>—</b>&nbsp;
              </span>
            ))}
          </div>
        </h1>
      </section>

      {/* ── About ── */}
      <section className="fo-about" data-bg={BASE.bg} data-ink={BASE.ink}>
        <p className="fo-reveal">
          Llevo tres años haciendo software. Empecé con BeatList y hoy tengo apps funcionando en
          <em>restaurantes, tiendas</em> y en el móvil de quien usa Ponme. Trabajo con Claude Code y Codex como
          compañeros: ellos escriben y prueban, yo decido, reviso y despliego.
        </p>
        <ul className="fo-numbers fo-reveal">
          <li><b>3</b>años haciendo software propio</li>
          <li><b>14</b>restaurantes usan MiCartaYa</li>
          <li><b>2026</b>me gradué, con especialidad en ciberseguridad</li>
        </ul>
      </section>

      {/* ── Work list with floating preview (Dennis Snellenberg-style) ── */}
      <section id="proyectos" className="fo-work" data-bg={BASE.bg} data-ink={BASE.ink}>
        <div className="fo-work-head">
          <span>Proyectos</span>
          <span className="fo-work-cols" aria-hidden="true">
            <span>Dónde</span>
            <span>Estado</span>
          </span>
        </div>
        <ul className="fo-list" onPointerLeave={() => setHovered(null)}>
          {WORK.map((j) => (
            <WorkRow
              key={j.id}
              job={j}
              open={open === j.id}
              dim={hovered !== null && hovered !== j.id}
              onHover={() => setHovered(j.id)}
              onToggle={() => setOpen((o) => (o === j.id ? null : j.id))}
            />
          ))}
        </ul>
      </section>

      {/* ── Pauta, featured on its own ── */}
      <section ref={pautaRef} className="fo-pauta" data-bg="#FF5B26" data-ink="#111111">
        <div className="fo-pauta-head">
          <p className="fo-kicker">Herramienta interna</p>
          <h2 className="fo-pauta-name">Pauta</h2>
          <p className="fo-pauta-tag">
            mi fábrica de <em>vídeos y carruseles.</em>
          </p>
        </div>
        <div className="fo-pauta-body">
          <p className="fo-pauta-lead">
            La uso para el contenido de Ponme y YaSolutions. Una IA escribe el guion siguiendo mis guías, Pauta le
            pone voz y subtítulos y monta la pieza con Remotion. Yo elijo el gancho y publico.
          </p>
        </div>
        <ol className="fo-steps">
          {PAUTA_STEPS.map(([t, d], i) => (
            <li key={t} className="fo-step">
              <span className="fo-step-n">{String(i + 1).padStart(2, '0')}</span>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <p className="fo-stack">Remotion · TypeScript · Node.js · Claude Code / Codex · Fish Audio · ElevenLabs</p>
      </section>

      {/* ── Behind the scenes: pinned, scrolls sideways ── */}
      <section ref={pinRef} className="fo-behind" data-bg={DARK.bg} data-ink={DARK.ink}>
        <div className="fo-behind-sticky">
          <div ref={railRef} className="fo-behind-rail">
            <div className="fo-behind-intro">
              <p className="fo-kicker">Lo que no se ve</p>
              <h2>
                Lo que hay <em>detrás.</em>
              </h2>
              <p className="fo-behind-hint">Sigue bajando →</p>
            </div>
            {BEHIND.map((j, i) => (
              <article key={j.id} className={`fo-tile ${CARD_TONES[i % CARD_TONES.length]}`}>
                <header>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{WORLD_LABEL[j.world]} · {STATUS_LABEL[j.status]}</span>
                </header>
                <p className="fo-tile-big">{HOOK[j.id]?.[0] ?? '—'}</p>
                <p className="fo-tile-lead">{HOOK[j.id]?.[1]}</p>
                <div className="fo-tile-foot">
                  <h3>{j.name ?? j.title}</h3>
                  <p>{j.detail[0]}</p>
                  <p className="fo-tile-stack">{j.stack.slice(0, 4).join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contacto" className="fo-contact" data-bg={DARK.bg} data-ink={DARK.ink}>
        <p className="fo-kicker fo-reveal">Contacto</p>
        <p className="fo-contact-line fo-reveal">Si quieres hablar de trabajo o de alguno de estos proyectos, escríbeme.</p>
        <a className="fo-mail fo-reveal" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <div className="fo-contact-links fo-reveal">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={PROFILE.cvEs} target="_blank" rel="noreferrer">CV ↗</a>
        </div>
        <footer className="fo-foot">
          <span>© {new Date().getFullYear()} Nico Álvarez</span>
          <span>Jerez · {clock}</span>
        </footer>
      </section>

      {/* Floating preview: one strip with every screenshot, slid to the hovered one. */}
      <div ref={cardRef} className={`fo-card${showPreview ? ' is-on' : ''}`} aria-hidden="true">
        <div className="fo-card-strip" style={{ transform: `translateY(${-Math.max(previewIndex, 0) * 100}%)` }}>
          {WITH_SHOT.map((j) => (
            <div key={j.id} className="fo-card-slide" style={{ background: PREVIEW_BG[j.id] ?? '#ddd' }}>
              <img src={j.shot ?? j.logo} alt="" className={j.shot ? undefined : 'fo-card-logo'} />
            </div>
          ))}
        </div>
      </div>
      <div ref={viewRef} className={`fo-view${showPreview ? ' is-on' : ''}`} aria-hidden="true">
        Ver
      </div>
    </div>
  );
};

const WorkRow: React.FC<{ job: Job; open: boolean; dim: boolean; onHover: () => void; onToggle: () => void }> = ({
  job,
  open,
  dim,
  onHover,
  onToggle,
}) => (
  <li className={`fo-row${open ? ' is-open' : ''}${dim ? ' is-dim' : ''}`} onPointerEnter={onHover}>
    <button type="button" onClick={onToggle} aria-expanded={open}>
      <span className="fo-row-title">{job.name ?? job.title}</span>
      <span className="fo-row-where">{WORLD_LABEL[job.world]}</span>
      <span className="fo-row-status">{STATUS_LABEL[job.status]}</span>
    </button>
    <div className="fo-row-body">
      <div>
        <div className="fo-row-inner">
          <div>
            <ul>
              {job.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="fo-stack">{job.stack.join('  ·  ')}</p>
            {job.link && (
              <a className="fo-visit" href={job.link.href} target="_blank" rel="noreferrer">
                <span>Visitar {job.link.label}</span>
              </a>
            )}
          </div>
          {job.shot && (
            <a className="fo-row-shot" href={job.link?.href} target="_blank" rel="noreferrer" tabIndex={-1}>
              <img src={job.shot} alt={`Captura de ${job.name}`} loading="lazy" />
            </a>
          )}
        </div>
      </div>
    </div>
  </li>
);
