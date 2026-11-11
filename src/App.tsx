import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from './data/profile';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { JOBS, Job, Lang, STATUS_LABEL, WORLD_LABEL } from './data/work';
import './app.css';

// The page language comes from <html lang>: index.html is Spanish, en/index.html is English.
const LANG: Lang = document.documentElement.lang === 'en' ? 'en' : 'es';

const T = {
  es: {
    nav: ['Proyectos', 'Contacto'],
    other: { label: 'EN', href: '/en/', title: 'English version' },
    clockLabel: 'Hora local',
    role: (
      <>
        Ingeniero de software.
        <br />
        Construyo y mantengo <em>más de 30 proyectos,</em>
        <br />
        de la idea al servidor.
      </>
    ),
    about: (
      <>
        Llevo tres años haciendo software. Empecé con BeatList y hoy tengo apps funcionando en&nbsp;
        <em>restaurantes, tiendas</em> y en el día a día de los usuarios de Ponme. Uso agentes de IA igual que uso
        Docker: me ayudan a ir más rápido, pero las decisiones y el despliegue son míos.
      </>
    ),
    numbers: [
      ['3', 'años haciendo software propio'],
      ['14', 'restaurantes usan MiCartaYa'],
      ['2026', 'me gradué, con especialidad en ciberseguridad'],
    ],
    workHead: ['Proyectos', 'Dónde', 'Estado'],
    visit: 'Visitar',
    shotAlt: 'Captura de',
    view: 'Ver',
    pautaKicker: 'Herramienta interna',
    pautaTag: (
      <>
        mi fábrica de <em>vídeos y carruseles.</em>
      </>
    ),
    pautaLead:
      'La uso para el contenido de Ponme y YaSolutions. Escribo el brief, una IA propone el guión siguiendo mis guías y Pauta le pone voz y subtítulos y monta la pieza con Remotion. Yo elijo el gancho y publico.',
    steps: [
      ['Idea', 'brief del proyecto'],
      ['Guión', 'propuesto con mis guías'],
      ['Gancho', 'elijo yo entre varias opciones'],
      ['Voz', 'locución sintética'],
      ['Subtítulos', 'sincronizados con la voz'],
      ['Render', 'vídeo o carrusel con Remotion'],
      ['Publicar', 'Instagram y TikTok, tras revisión'],
      ['Métricas', 'lo que funciona vuelve a las guías'],
    ],
    behindKicker: 'Lo que no se ve',
    behindTitle: (
      <>
        Lo que hay <em>detrás.</em>
      </>
    ),
    behindHint: 'Sigue bajando →',
    contactKicker: 'Contacto',
    contactLine: 'Si quieres hablar de trabajo o de alguno de estos proyectos, escríbeme.',
    cv: PROFILE.cvEs,
  },
  en: {
    nav: ['Projects', 'Contact'],
    other: { label: 'ES', href: '/', title: 'Versión en español' },
    clockLabel: 'Local time',
    role: (
      <>
        Software engineer.
        <br />
        I build and run <em>30+ projects,</em>
        <br />
        from idea to server.
      </>
    ),
    about: (
      <>
        I have been building software for three years. I started with BeatList; today my apps run in&nbsp;
        <em>restaurants, shops</em> and in the daily routine of Ponme users. I use AI agents the way I use Docker:
        they help me move faster, but the decisions and the deploys are mine.
      </>
    ),
    numbers: [
      ['3', 'years building my own software'],
      ['14', 'restaurants use MiCartaYa'],
      ['2026', 'graduated, specialising in cybersecurity'],
    ],
    workHead: ['Projects', 'Where', 'Status'],
    visit: 'Visit',
    shotAlt: 'Screenshot of',
    view: 'View',
    pautaKicker: 'Internal tool',
    pautaTag: (
      <>
        my <em>video and carousel</em> factory.
      </>
    ),
    pautaLead:
      'I use it for Ponme and YaSolutions content. I write the brief, an AI drafts the script from my guidelines, and Pauta adds voice and captions and assembles the piece with Remotion. I pick the hook and publish.',
    steps: [
      ['Idea', 'project brief'],
      ['Script', 'drafted from my guidelines'],
      ['Hook', 'I pick from several options'],
      ['Voice', 'synthetic voice-over'],
      ['Captions', 'synced to the voice'],
      ['Render', 'video or carousel with Remotion'],
      ['Publish', 'Instagram and TikTok, after review'],
      ['Metrics', 'what works feeds the guidelines'],
    ],
    behindKicker: 'Behind the scenes',
    behindTitle: (
      <>
        What runs <em>underneath.</em>
      </>
    ),
    behindHint: 'Keep scrolling →',
    contactKicker: 'Contact',
    contactLine: 'If you want to talk about work or any of these projects, drop me a line.',
    cv: PROFILE.cvEn,
  },
}[LANG];

// Background of the floating preview card for each listed project.
const PREVIEW_BG: Record<string, string> = {
  ponme: '#CDD3BC',
  orbe: '#DDE3D3',
  dedica: '#E4E8DE',
  micartaya: '#1F2B3C',
  presupuestoya: '#DCC7A6',
  orderya: '#38443A',
  beatlist: '#1A1A1A',
};

const LIST_IDS = ['ponme', 'orbe', 'dedica', 'micartaya', 'presupuestoya', 'orderya', 'beatlist'];
const WORK = LIST_IDS.map((id) => JOBS.find((j) => j.id === id)!);
const BEHIND = JOBS.filter((j) => !LIST_IDS.includes(j.id) && j.id !== 'pauta');

const CARD_TONES = ['fo-tone-dark', 'fo-tone-accent', 'fo-tone-light'];
const DARK = { bg: '#121212', ink: '#EDEDE8' };
const BASE = { bg: '#E9E7E2', ink: '#121212' };
const pinnedOn = () => window.matchMedia('(min-width: 861px) and (hover: hover)').matches;
const title = (j: Job) => j.name ?? j[LANG].title ?? '';

function useJerezTime(): { text: string; h: number; m: number } {
  const read = () => {
    const parts = new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Madrid',
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
    const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    return { text: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, h, m };
  };
  const [t, setT] = useState(read);
  useEffect(() => {
    const id = window.setInterval(() => setT(read()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

// Tiny analog clock showing the real time in Jerez.
const Clock: React.FC<{ h: number; m: number }> = ({ h, m }) => (
  <svg className="fo-clock" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="18" />
    <line x1="20" y1="20" x2="20" y2="10" style={{ transform: `rotate(${(h % 12) * 30 + m * 0.5}deg)` }} />
    <line x1="20" y1="20" x2="20" y2="6" style={{ transform: `rotate(${m * 6}deg)` }} />
  </svg>
);

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
  const time = useJerezTime();

  // Inertial smooth scroll; it drives the native scroll position, so the rAF loop below still reads scrollY.
  useEffect(() => {
    if (still) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [still]);

  // One rAF loop: name marquee (direction follows scroll), hero circle, preview card + "View"
  // bubble trailing the cursor, pinned cards, Pauta steps and the page color of the middle section.
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

      // Pauta: lights the pipeline steps from when the row enters until it reaches mid-screen.
      const pauta = pautaRef.current;
      if (pauta) {
        const r = (pauta.querySelector('.fo-steps') as HTMLElement).getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.45)));
        pauta.style.setProperty('--p', String(p));
        const lit = Math.floor(p * (T.steps.length + 0.5));
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

  const previewIndex = WORK.findIndex((j) => j.id === hovered);
  const showPreview = previewIndex >= 0 && open !== hovered;

  return (
    <div
      ref={rootRef}
      className={`fo-root${still ? ' fo-still' : ''}`}
      style={{ ['--bg' as string]: BASE.bg, ['--ink' as string]: BASE.ink }}
    >
      <header className="fo-top">
        <a href={LANG === 'en' ? '/en/' : '/'} className="fo-mark">© Nico Álvarez</a>
        <nav>
          <a href="#proyectos">{T.nav[0]}</a>
          <a href="#contacto">{T.nav[1]}</a>
          <a href={T.other.href} hrefLang={LANG === 'en' ? 'es' : 'en'} title={T.other.title} className="fo-lang">
            {T.other.label}
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="fo-hero" data-bg={BASE.bg} data-ink={BASE.ink}>
        <div ref={blobRef} className="fo-blob" aria-hidden="true" />
        <div className="fo-where">
          <span>
            {T.clockLabel}
            <br />
            <b>{time.text}</b>
          </span>
          <Clock h={time.h} m={time.m} />
        </div>
        <p className="fo-role">
          <span aria-hidden="true">↘</span>
          {T.role}
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
        <p className="fo-reveal">{T.about}</p>
        <ul className="fo-numbers fo-reveal">
          {T.numbers.map(([n, l]) => (
            <li key={l}>
              <b>{n}</b>
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Project list with floating preview ── */}
      <section id="proyectos" className="fo-work" data-bg={BASE.bg} data-ink={BASE.ink}>
        <div className="fo-work-head">
          <span>{T.workHead[0]}</span>
          <span className="fo-work-cols" aria-hidden="true">
            <span>{T.workHead[1]}</span>
            <span>{T.workHead[2]}</span>
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

      {/* ── Pauta ── */}
      <section ref={pautaRef} className="fo-pauta" data-bg="#FF5B26" data-ink="#111111">
        <div className="fo-pauta-head">
          <p className="fo-kicker">{T.pautaKicker}</p>
          <h2 className="fo-pauta-name">Pauta</h2>
          <p className="fo-pauta-tag">{T.pautaTag}</p>
        </div>
        <div className="fo-pauta-body">
          <p className="fo-pauta-lead">{T.pautaLead}</p>
        </div>
        <ol className="fo-steps">
          {T.steps.map(([t, d], i) => (
            <li key={t} className="fo-step">
              <span className="fo-step-n">{String(i + 1).padStart(2, '0')}</span>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <p className="fo-stack">Remotion · TypeScript · Node.js · Fish Audio · ElevenLabs</p>
      </section>

      {/* ── Behind the scenes: pinned, scrolls sideways ── */}
      <section ref={pinRef} className="fo-behind" data-bg={DARK.bg} data-ink={DARK.ink}>
        <div className="fo-behind-sticky">
          <div ref={railRef} className="fo-behind-rail">
            <div className="fo-behind-intro">
              <p className="fo-kicker">{T.behindKicker}</p>
              <h2>{T.behindTitle}</h2>
              <p className="fo-behind-hint">{T.behindHint}</p>
            </div>
            {BEHIND.map((j, i) => {
              const c = j[LANG];
              return (
                <article key={j.id} className={`fo-tile ${CARD_TONES[i % CARD_TONES.length]}`}>
                  <header>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      {WORLD_LABEL[LANG][j.world]} · {STATUS_LABEL[LANG][j.status]}
                    </span>
                  </header>
                  <p className="fo-tile-big">{c.hook?.[0] ?? '—'}</p>
                  <p className="fo-tile-lead">{c.hook?.[1]}</p>
                  <div className="fo-tile-foot">
                    <h3>{title(j)}</h3>
                    <p>{c.detail[0]}</p>
                    <p className="fo-tile-stack">{j.stack.slice(0, 4).join(' · ')}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contacto" className="fo-contact" data-bg={DARK.bg} data-ink={DARK.ink}>
        <p className="fo-kicker fo-reveal">{T.contactKicker}</p>
        <p className="fo-contact-line fo-reveal">{T.contactLine}</p>
        <a className="fo-mail fo-reveal" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <div className="fo-contact-links fo-reveal">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={T.cv} target="_blank" rel="noreferrer">CV ↗</a>
        </div>
        <footer className="fo-foot">
          <span>© {new Date().getFullYear()} Nico Álvarez</span>
          <span>Jerez · {time.text}</span>
        </footer>
      </section>

      {/* Floating preview: one strip with every screenshot, slid to the hovered one. */}
      <div ref={cardRef} className={`fo-card${showPreview ? ' is-on' : ''}`} aria-hidden="true">
        <div className="fo-card-strip" style={{ transform: `translateY(${-Math.max(previewIndex, 0) * 100}%)` }}>
          {WORK.map((j) => (
            <div key={j.id} className="fo-card-slide" style={{ background: PREVIEW_BG[j.id] ?? '#ddd' }}>
              <img src={j.shot} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div ref={viewRef} className={`fo-view${showPreview ? ' is-on' : ''}`} aria-hidden="true">
        {T.view}
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
      <span className="fo-row-title">{title(job)}</span>
      <span className="fo-row-where">{WORLD_LABEL[LANG][job.world]}</span>
      <span className="fo-row-status">{STATUS_LABEL[LANG][job.status]}</span>
    </button>
    <div className="fo-row-body">
      <div>
        <div className="fo-row-inner">
          <div>
            <ul>
              {job[LANG].detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="fo-stack">{job.stack.join('  ·  ')}</p>
            {job.link && (
              <a className="fo-visit" href={job.link.href} target="_blank" rel="noreferrer">
                <span>
                  {T.visit} {job.link.label}
                </span>
              </a>
            )}
          </div>
          {job.shot && (
            <a className="fo-row-shot" href={job.link?.href} target="_blank" rel="noreferrer" tabIndex={-1}>
              <img src={job.shot} alt={`${T.shotAlt} ${title(job)}`} loading="lazy" />
            </a>
          )}
        </div>
      </div>
    </div>
  </li>
);
