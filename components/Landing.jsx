// Landing.jsx — ik ben ok landing page sections
// Uses: Phone, PhoneHome, PhonePing, PhoneCaregiver (from Phone.jsx)

const { useState, useEffect } = React;

// Responsive breakpoint hook — phone-portrait threshold.
const useIsMobile = (bp = 768) => {
  const q = `(max-width: ${bp}px)`;
  const get = () => typeof window !== 'undefined' && window.matchMedia(q).matches;
  const [m, setM] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const onChange = (e) => setM(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [q]);
  return m;
};

// ─────────────────────────────────────────────────────
// Brand mark — the ik-ben-ok ring-gap "ok" button (breathing)
// ─────────────────────────────────────────────────────
// Exact replica of the design-system V5 favicon variant
// (Claude Design bundle: ui_kits/allesok/ikbenok-logo-variants.jsx, IBOK_FaviconPreview v5).
// All ratios are em-based against the wrapper's own fontSize, so the mark
// scales identically at any size without pixel-rounding drift.
const IkBenOkMark = ({ size = 40, breathe = true, shadow = true }) => {
  const isEm = typeof size === 'string';
  return (
    <span style={{
      position: 'relative',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size,
      fontSize: isEm ? undefined : size / 1.9,
      flexShrink: 0, lineHeight: 1,
      verticalAlign: isEm ? '-0.32em' : 'baseline'
    }}>
    <style>{`
      @keyframes ibok-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.035); } }
    `}</style>
    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--coral)' }} />
    <span style={{ position: 'absolute', inset: '0.09em', borderRadius: '50%', background: 'var(--cream)' }} />
    <span style={{
        position: 'absolute', inset: '0.18em', borderRadius: '50%',
        background: 'var(--coral)',
        boxShadow: shadow ? '0 6px 14px -4px rgba(255,107,71,0.5)' : 'none',
        animation: breathe ? 'ibok-breathe 5s ease-in-out infinite' : 'none'
      }} />
    <span style={{
        position: 'relative',
        color: 'var(--cream)',
        fontFamily: 'Dosis, system-ui, sans-serif',
        fontWeight: 700, fontSize: '1em', letterSpacing: '-0.01em',
        lineHeight: 1,
        transform: 'translateY(-0.04em)'
      }}>ok</span>
  </span>);

};

// ─────────────────────────────────────────────────────
// Reusable atoms
// ─────────────────────────────────────────────────────
const Brand = ({ italic = false }) =>
<span style={{
  fontFamily: 'var(--font-display)',
  fontStyle: italic ? 'italic' : undefined,
  fontWeight: 600,
  letterSpacing: '-0.015em',
  display: 'inline-flex', alignItems: 'center', gap: '0.12em',
  whiteSpace: 'nowrap', verticalAlign: 'baseline'
}}>
    ik ben <IkBenOkMark size="1.9em" breathe={false} shadow={false} />
  </span>;


const Wordmark = ({ size = 24, color = 'var(--navy)' }) =>
<span style={{
  fontFamily: 'var(--font-display)', fontSize: size, lineHeight: 1,
  letterSpacing: '-0.015em', color, fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', gap: '0.12em',
  whiteSpace: 'nowrap'
}}>
    ik ben <IkBenOkMark size="1.9em" breathe={false} shadow={false} />
  </span>;


const SectionLabel = ({ children, align = 'left' }) =>
<div style={{
  display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22,
  justifyContent: align === 'center' ? 'center' : 'flex-start'
}}>
    <span style={{ width: 28, height: 2, background: 'var(--coral)', display: 'inline-block' }} />
    <span style={{
    fontFamily: 'var(--font-body)', fontSize: 11.5,
    letterSpacing: '0.28em', textTransform: 'uppercase',
    color: 'var(--fg-muted)', fontWeight: 500
  }}>{children}</span>
  </div>;


const Eyebrow = ({ children }) =>
<span style={{
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '8px 14px',
  background: 'rgba(110,150,128,0.12)',
  border: '1px solid rgba(110,150,128,0.28)',
  borderRadius: 999,
  fontFamily: 'var(--font-body)', fontSize: 12.5,
  color: 'var(--navy)', letterSpacing: '0.01em'
}}>
    <span style={{
    position: 'relative', width: 8, height: 8, borderRadius: '50%', background: 'var(--sage)'
  }}>
      <span style={{
      position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--sage)',
      animation: 'ci-ping 2.4s ease-out infinite', opacity: 0.6
    }} />
    </span>
    {children}
  </span>;


// ─────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────
const Nav = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: isMobile ? '20px 20px 0' : '28px 40px 0',
    maxWidth: 1260, margin: '0 auto',
    position: 'relative', zIndex: 3, gap: 12
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
      <Wordmark size={isMobile ? 22 : 26} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 36 }}>
      {!isMobile && [
        { label: 'Zo werkt het', href: '#zo-werkt-het' },
        { label: 'Voor wie', href: '#zo-werkt-het' },
        { label: 'Prijs', href: '#prijs' }
      ].map((l) =>
        <a key={l.label} href={l.href} style={{
          fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-default)',
          textDecoration: 'none', letterSpacing: '0.01em'
        }}>{l.label}</a>
      )}
      <a href="#download" style={{
        padding: isMobile ? '9px 14px' : '11px 18px', borderRadius: 999,
        background: 'var(--sage-deep)', color: 'var(--cream)',
        fontFamily: 'var(--font-body)', fontSize: isMobile ? 13 : 14, fontWeight: 500,
        textDecoration: 'none', letterSpacing: '0.01em',
        display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
        boxShadow: '0 8px 18px -6px rgba(79,106,76,0.55), 0 2px 4px rgba(11,27,43,0.12), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 4px rgba(0,0,0,0.14)',
        transition: 'all 180ms var(--ease-out)'
      }}
      onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--coral)';e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 14px 26px -8px rgba(255,107,71,0.55), 0 3px 6px rgba(11,27,43,0.15), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -2px 4px rgba(0,0,0,0.14)';}}
      onMouseLeave={(e) => {e.currentTarget.style.background = 'var(--sage-deep)';e.currentTarget.style.transform = 'translateY(0)';e.currentTarget.style.boxShadow = '0 8px 18px -6px rgba(79,106,76,0.55), 0 2px 4px rgba(11,27,43,0.12), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 4px rgba(0,0,0,0.14)';}}>
        {isMobile ? 'Download' : 'Download de app'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </a>
    </div>
  </div>);
};


// Micro tripartite bar
const MicroBar = () =>
<div style={{
  maxWidth: 1260, margin: '22px auto 0', padding: '0 40px',
  position: 'relative', zIndex: 2
}}>
    <div style={{
    borderTop: '1px solid var(--line)',
    borderBottom: '1px solid var(--line)',
    padding: '14px 0',
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24,
    fontFamily: 'var(--font-body)', fontSize: 11,
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'var(--fg-muted)', fontWeight: 500
  }}>
      <span>Dagelijks<span style={{ color: 'var(--coral)', margin: '0 10px' }}>·</span>Bij stilte</span>
      <span style={{ textAlign: 'center' }}>Altijd verbonden</span>
      <span style={{ textAlign: 'right' }}>Beschikbaar voor iOS <span style={{ color: 'var(--coral)', margin: '0 10px' }}>·</span> Android</span>
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────
const Hero = ({ intensity }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{
    maxWidth: 1260, margin: '0 auto',
    padding: isMobile ? '40px 20px 60px' : '80px 40px 120px',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
    gap: isMobile ? 48 : 80, alignItems: 'center',
    position: 'relative', zIndex: 2
  }}>
    <div style={{ position: 'relative', zIndex: 2 }}>
      <h1 style={{
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: isMobile ? 'clamp(40px, 11vw, 56px)' : 'clamp(56px, 7vw, 104px)',
      lineHeight: 0.98,
      letterSpacing: '-0.025em', color: 'var(--navy)',
      margin: '0 0 26px', textWrap: 'balance'
    }}>
        Een alarm dat afgaat als er <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>níet</em> gereageerd wordt.
      </h1>
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: isMobile ? 17 : 19, lineHeight: 1.55,
      color: 'var(--fg-default)', maxWidth: 520, margin: '0 0 36px'
    }}>
        <Wordmark size={isMobile ? 19 : 22} /> brengt dagelijkse gemoedsrust aan alleenwonende ouderen en hun mantelzorgers — geen paniekknop, geen halsketting om te vergeten — alleen een bevestiging dat alles goed is.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
        <StoreButton kind="apple" />
        <StoreButton kind="google" />
      </div>

    </div>

    {/* Phone */}
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {/* soft glow behind phone */}
      <div style={{
      position: 'absolute', width: 440, height: 440, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,107,71,0.14), rgba(110,150,128,0.10) 50%, transparent 72%)',
      filter: 'blur(30px)', zIndex: 0, top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    }} />
      <Phone width={isMobile ? 268 : 304} height={isMobile ? 552 : 620} tilt={-1.2}>
        <PhoneHome intensity={intensity} />
      </Phone>
      {/* floating caregiver notification — desktop only (overflows on mobile) */}
      {!isMobile && <div style={{
      position: 'absolute', right: -20, top: 140,
      padding: '14px 16px 14px 14px',
      background: 'var(--bg-raised)',
      border: '1px solid var(--line-soft)',
      borderRadius: 18,
      boxShadow: 'var(--shadow-lift)',
      display: 'flex', alignItems: 'center', gap: 12,
      width: 240, zIndex: 10
    }}>
        <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(110,150,128,0.18)',
        display: 'grid', placeItems: 'center',
        border: '1px solid rgba(110,150,128,0.35)'
      }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sage-deep)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
          fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--sage-deep)', fontWeight: 600, marginBottom: 3
        }}>Ingecheckt</div>
          <div style={{
          fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1.1,
          color: 'var(--navy)'
        }}><em style={{ fontStyle: 'italic', color: 'var(--sage-deep)' }}>Margriet</em> · 16:00</div>
        </div>
      </div>}
      {/* small corner badge — missed reply (desktop only) */}
      {!isMobile && <div style={{
      position: 'absolute', left: -30, bottom: 90,
      padding: '12px 14px',
      background: 'var(--navy)', color: 'var(--cream)',
      borderRadius: 14,
      boxShadow: 'var(--shadow-card)',
      width: 200, zIndex: 10,
      fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.45
    }}>
        <div style={{
        fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--coral)', fontWeight: 600, marginBottom: 4
      }}>Alarmering contactpersoon</div>
        Na 10 minuten zonder reactie<br />— wanneer de knop niet wordt ingedrukt —
      </div>}
    </div>
  </section>);
};


const StoreButton = ({ kind }) => {
  const isApple = kind === 'apple';
  const [hover, setHover] = useState(false);
  return (
    <a href="#download" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '14px 22px',
      background: isApple ? 'var(--sage-deep)' : 'var(--coral)',
      color: '#fff',
      borderRadius: 999, textDecoration: 'none',
      boxShadow: isApple ?
      '0 14px 28px -10px rgba(79,106,76,0.55), 0 4px 8px rgba(11,27,43,0.15), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.18)' :
      '0 14px 28px -10px rgba(255,107,71,0.55), 0 4px 8px rgba(11,27,43,0.12), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -3px 6px rgba(0,0,0,0.14)',
      transition: 'all 200ms var(--ease-out)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)'
    }}>
      {isApple ?
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg> :

      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 3.52c-.27.31-.42.77-.42 1.35v14.27c0 .58.15 1.04.44 1.36l.08.07 7.98-7.98v-.17L3.26 3.44l-.08.08z" /><path d="M13.82 15.85l-2.56-2.56v-.18l2.56-2.56.06.04 3.03 1.72c.86.49.86 1.29 0 1.78l-3.03 1.72-.06.04z" fillOpacity="0.85" /><path d="M13.88 15.81l-2.62-2.62L3.18 21.5c.29.3.75.33 1.29.04l9.41-5.35" fillOpacity="0.7" /><path d="M13.88 10.58L4.47 5.24c-.54-.31-1-.28-1.29.03l8.08 8.08 2.62-2.61.0-.16z" fillOpacity="0.95" /></svg>
      }
      <div style={{ textAlign: 'left', lineHeight: 1 }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          opacity: 0.75, marginBottom: 3, fontWeight: 500
        }}>{isApple ? 'Download in de' : 'Nu in'}</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 20,
          letterSpacing: '-0.01em'
        }}>{isApple ? 'App Store' : 'Play Store'}</div>
      </div>
    </a>);

};

// ─────────────────────────────────────────────────────
// How it works — 3 steps with roman numerals
// ─────────────────────────────────────────────────────
const HowItWorks = ({ intensity }) => {
  const isMobile = useIsMobile();
  const steps = [
  {
    label: 'Op vaste tijden',
    title: 'Check-in wanneer jij <em>wilt</em>.',
    body: <>Zo vaak als je wilt stuurt <Brand /> een bericht. Je drukt één keer om aan te geven dat alles oké is.</>,
    phone: <PhoneSchedule />
  },
  {
    label: 'Bij stilte',
    title: 'Geen reactie?<br/>Dan <em>alarmeren</em> wij!',
    body: 'Reageert de ander niet binnen 10 minuten, dan ontvangt de mantelzorger een bericht — met de laatst bekende locatie en contactopties voor directe hulp. Reageert je eerste contact niet, dan wordt de melding meteen doorgezet naar je tweede contact.',
    phone: <PhoneHome intensity={intensity} progress={1} state="alarm" />
  },
  {
    label: 'Voor de mantelzorger',
    title: 'Altijd <em>verbonden</em>,<br/>nooit opdringerig.',
    body: 'Mantelzorgers zien in één oogopslag wanneer er is ingecheckt.',
    phone: <PhoneCaregiver />
  }];


  return (
    <section id="zo-werkt-het" style={{
      maxWidth: 1260, margin: '0 auto',
      padding: isMobile ? '60px 20px' : '120px 40px',
      position: 'relative', zIndex: 2
    }}>
      <SectionLabel>Zo werkt het</SectionLabel>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 400,
        fontSize: isMobile ? 'clamp(32px, 8vw, 44px)' : 64,
        lineHeight: 1.04,
        letterSpacing: '-0.02em', color: 'var(--navy)',
        margin: isMobile ? '0 0 48px' : '0 0 80px',
        maxWidth: 780, textWrap: 'balance'
      }}>
        Je bepaalt zelf het moment, voegt een <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>contactpersoon</em> toe en <Brand /> doet de rest.
      </h2>

      <div style={{ display: 'grid', gap: isMobile ? 56 : 80 }}>
        {steps.map((step, i) =>
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (i % 2 === 0 ? '1fr 340px' : '340px 1fr'),
          gap: isMobile ? 32 : 80, alignItems: 'center'
        }}>
            <div style={{ order: isMobile ? 1 : (i % 2 === 0 ? 1 : 2) }}>
              <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20
            }}>
                <span style={{ width: 28, height: 2, background: 'var(--coral)', display: 'inline-block' }} />
                <span style={{
                fontFamily: 'var(--font-body)', fontSize: 11,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--fg-muted)', fontWeight: 500
              }}>{step.label}</span>
              </div>
              <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 46,
              lineHeight: 1.05,
              letterSpacing: '-0.02em', color: 'var(--navy)',
              margin: '0 0 22px', textWrap: 'balance'
            }} dangerouslySetInnerHTML={{ __html: step.title.replace(/<em>/g, '<em style="font-style:italic;color:var(--coral)">').replace(/ik ben ok/g, 'ik ben <em style="color:var(--coral);font-weight:600;font-style:normal">ok</em>') }} />
              <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? 16 : 17, lineHeight: 1.55,
              color: 'var(--fg-default)', maxWidth: 520, margin: 0
            }}>{step.body}</p>
            </div>
            <div style={{
            order: isMobile ? 2 : (i % 2 === 0 ? 2 : 1),
            display: 'flex', justifyContent: 'center', position: 'relative'
          }}>
              <div style={{
              position: 'absolute', width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(110,150,128,0.16), transparent 65%)',
              filter: 'blur(20px)', zIndex: 0, top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
              <div style={{ position: 'relative' }}>
                <Phone
                  width={isMobile ? 268 : 260}
                  height={isMobile ? 552 : 540}
                  tilt={isMobile ? 0 : (i % 2 === 0 ? 1.5 : -1.5)}>
                  {step.phone}
                </Phone>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

};

// ─────────────────────────────────────────────────────
// Quote block — navy inverse
// ─────────────────────────────────────────────────────
const QuoteBlock = () => {
  const isMobile = useIsMobile();
  return (
<section style={{
  maxWidth: 1260, margin: '0 auto',
  padding: isMobile ? '0 16px 60px' : '0 40px 120px',
  position: 'relative', zIndex: 2
}}>
    <div style={{
    position: 'relative', overflow: 'hidden',
    background: 'var(--navy)',
    borderRadius: isMobile ? 22 : 32,
    padding: isMobile ? '56px 28px' : '100px 80px',
    color: 'var(--cream)'
  }}>
      {/* radial glows */}
      <div style={{
      position: 'absolute', top: -120, right: -80, width: 460, height: 460, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,107,71,0.35), transparent 65%)',
      filter: 'blur(40px)', pointerEvents: 'none'
    }} />
      <div style={{
      position: 'absolute', bottom: -140, left: -100, width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(110,150,128,0.30), transparent 65%)',
      filter: 'blur(40px)', pointerEvents: 'none'
    }} />

      <div style={{ position: 'relative', maxWidth: 860 }}>
        <div style={{
        fontFamily: 'var(--font-body)', fontSize: 11.5,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'var(--coral)', fontWeight: 500, marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 16
      }}>
          <span style={{ width: 28, height: 2, background: 'var(--coral)', display: 'inline-block' }} />
          Een mantelzorger vertelt
        </div>

        <blockquote style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.18,
        letterSpacing: '-0.015em', color: 'var(--cream)',
        margin: '0 0 40px', fontWeight: 400, textWrap: 'balance'
      }}>
          "Mijn moeder woont alleen sinds vorig jaar. Ik belde haar drie keer per dag — uit zorg, niet uit gewoonte. Nu zie ik <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>elke middag</span> dat ze heeft ingecheckt. Ik bel nu <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>omdat ik haar wil spreken</span>, niet omdat ik bang ben."
        </blockquote>

        <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: isMobile ? 28 : 36,
        borderTop: '1px solid rgba(245,239,227,0.14)',
        flexWrap: 'wrap'
      }}>
          <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--coral)', color: 'var(--navy)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 22, letterSpacing: '-0.02em', flexShrink: 0
        }}>M</div>
          <div style={{ minWidth: 0 }}>
            <div style={{
            fontFamily: 'var(--font-display)', fontSize: 20,
            letterSpacing: '-0.01em', color: 'var(--cream)'
          }}>Mira, 48 jaar</div>
            <div style={{
            fontFamily: 'var(--font-body)', fontSize: 13,
            color: 'rgba(245,239,227,0.65)', letterSpacing: '0.01em',
            marginTop: 2
          }}>Mantelzorger · moeder Margriet (82) · Haarlem</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 13, color: 'rgba(245,239,227,0.55)'
        }}>dinsdag · 14:32</div>
        </div>
      </div>
    </div>
  </section>);
};


// ─────────────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────────────
const Pricing = () => {
  const isMobile = useIsMobile();
  return (
<section id="prijs" style={{
  maxWidth: 1260, margin: '0 auto',
  padding: isMobile ? '40px 20px 60px' : '60px 40px 120px',
  position: 'relative', zIndex: 2
}}>
    <SectionLabel align="center">Abonnement</SectionLabel>
    <h2 style={{
    fontFamily: 'var(--font-display)', fontWeight: 400,
    fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.04,
    letterSpacing: '-0.02em', color: 'var(--navy)',
    margin: '0 auto 20px', maxWidth: 780, textWrap: 'balance',
    textAlign: 'center'
  }}>
      Eén prijs. <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Geen zorgen.</em>
    </h2>
    <p style={{
    fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.55,
    color: 'var(--fg-default)', margin: '0 auto 64px', maxWidth: 580,
    textAlign: 'center'
  }}>
      Een abonnement op <Brand /> proberen we zo betaalbaar mogelijk te houden.<br />
      Opzegbaar per maand — zonder vragen. Je kunt 5 contacten toevoegen.
    </p>

    <div style={{
    maxWidth: 520, margin: '0 auto',
    background: 'var(--bg-raised)',
    border: '1px solid var(--line-soft)',
    borderRadius: isMobile ? 22 : 32,
    padding: isMobile ? '32px 24px 28px' : '44px 44px 40px',
    boxShadow: 'var(--shadow-lift)',
    position: 'relative', overflow: 'hidden'
  }}>
      <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8,
      margin: '12px 0 6px', flexWrap: 'wrap'
    }}>
        <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: isMobile ? 68 : 92,
        letterSpacing: '-0.035em', color: 'var(--navy)', lineHeight: 1
      }}>€2</span>
        <span style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: isMobile ? 26 : 32, color: 'var(--coral)'
      }}>,75</span>
        <span style={{
        fontFamily: 'var(--font-body)', fontSize: 14,
        color: 'var(--fg-muted)', marginLeft: 12, letterSpacing: '0.01em'
      }}>per maand</span>
      </div>
      <div style={{
      fontFamily: 'var(--font-body)', fontSize: 13,
      color: 'var(--fg-muted)', letterSpacing: '0.01em',
      marginBottom: 32
    }}>Tot 5 contactpersonen toevoegen · onbeperkte check-ins</div>

      <div style={{
      borderTop: '1px solid var(--line-soft)',
      paddingTop: 24, marginBottom: 28
    }}>
        {[
      'Onbeperkte check-ins per dag — ritme zelf instelbaar',
      'Automatisch bericht bij stilte — met GPS locatie',
      'Weekoverzicht voor mantelzorgers',
      'Opzegbaar per maand · probeer het 14 dagen gratis'].
      map((f, i) =>
      <div key={i} style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '10px 0'
      }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M5 12l5 5L20 7" /></svg>
            <span style={{
          fontFamily: 'var(--font-body)', fontSize: 15,
          color: 'var(--fg-default)', lineHeight: 1.5
        }}>{f}</span>
          </div>
      )}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <StoreButton kind="apple" />
        <StoreButton kind="google" />
      </div>
    </div>

    <p style={{
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 15, color: 'var(--fg-muted)',
    textAlign: 'center', marginTop: 28
  }}>
      Voor zorgorganisaties — <a href="mailto:hallo@ikbenok.nl?subject=Zorgorganisatie%20-%20volumetarieven" style={{ color: 'var(--coral)', textDecoration: 'underline', textUnderlineOffset: 4 }}>neem contact op</a> voor volumetarieven.
    </p>
  </section>);
};


// ─────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────
const Footer = ({ intensity }) => {
  const isMobile = useIsMobile();
  return (
<footer style={{
  position: 'relative', zIndex: 2,
  borderTop: '1px solid var(--line)',
  marginTop: 40
}}>
    <div style={{
    maxWidth: 1260, margin: '0 auto',
    padding: isMobile ? '48px 20px 32px' : '80px 40px 60px',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
    gap: isMobile ? 32 : 60, alignItems: 'start'
  }}>
      <div>
        <Wordmark size={26} />
      </div>

      {[
    { title: 'Product', items: [
      { label: 'Zo werkt het', href: '#zo-werkt-het' },
      { label: 'Voor wie', href: '#zo-werkt-het' },
      { label: 'Prijs', href: '#prijs' },
      { label: 'Veelgestelde vragen', href: null }
    ]},
    { title: 'Contact', items: [
      { label: 'hallo@ikbenok.nl', href: 'mailto:hallo@ikbenok.nl' },
      { label: '+31 20 123 4567', href: 'tel:+31201234567' },
      { label: 'Voor zorgorganisaties', href: 'mailto:hallo@ikbenok.nl?subject=Zorgorganisatie' },
      { label: 'Pers & partners', href: 'mailto:hallo@ikbenok.nl?subject=Pers' }
    ]},
    { title: 'Juridisch', items: [
      { label: 'Privacybeleid', href: null },
      { label: 'Algemene voorwaarden', href: null },
      { label: 'Verwerkingsovereenkomst', href: null },
      { label: 'Cookies', href: null }
    ]}].
    map((col) =>
    <div key={col.title}>
          <div style={{
        fontFamily: 'var(--font-body)', fontSize: 11,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'var(--fg-muted)', fontWeight: 500, marginBottom: 16
      }}>{col.title}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {col.items.map((it) => {
              const disabled = !it.href;
              return (
        <li key={it.label} style={{ padding: '6px 0' }}>
                <a
                  href={it.href || '#'}
                  onClick={disabled ? (e) => e.preventDefault() : undefined}
                  aria-disabled={disabled || undefined}
                  title={disabled ? 'Volgt — momenteel nog niet beschikbaar' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    color: disabled ? 'var(--fg-muted)' : 'var(--fg-default)',
                    textDecoration: 'none',
                    cursor: disabled ? 'default' : 'pointer',
                    opacity: disabled ? 0.55 : 1
                  }}>{it.label}</a>
              </li>);
            })}
          </ul>
        </div>
    )}
    </div>

    {/* Seal strip */}
    <div style={{
    borderTop: '1px solid var(--line-soft)',
    padding: isMobile ? '20px 20px' : '28px 40px',
    maxWidth: 1260, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 24, flexWrap: 'wrap'
  }}>
      <div style={{
      fontFamily: 'var(--font-body)', fontSize: 12,
      color: 'var(--fg-muted)', letterSpacing: '0.01em'
    }}>© 2026 <Brand />. Nederland</div>

      <img src="assets/checkin-seal.svg" width="58" height="58" alt="" style={{ display: 'none' }} />

      <div style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 14, color: 'var(--fg-muted)'
    }}>{'\n'}</div>
    </div>
  </footer>);
};


Object.assign(window, { Nav, MicroBar, Hero, HowItWorks, QuoteBlock, Pricing, Footer });