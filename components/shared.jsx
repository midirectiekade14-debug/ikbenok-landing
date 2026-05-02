// shared.jsx — atoms shared between NL and SV variants
// Loaded BEFORE Phone.jsx and Landing.jsx; exposes via window so other
// <script type="text/babel"> blocks can reference these by bare name.

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
// Brand mark — the ik-ben-ok / jag-är-ok ring-gap "ok" button (breathing)
// ─────────────────────────────────────────────────────
// Exact replica of the design-system V5 favicon variant
// (Claude Design bundle: ui_kits/allesok/ikbenok-logo-variants.jsx, IBOK_FaviconPreview v5).
// All ratios are em-based against the wrapper's own fontSize, so the mark
// scales identically at any size without pixel-rounding drift.
//
// The `color` prop drives both the ring and the inner disc — NL uses
// sage-deep, SV uses coral.
const IkBenOkMark = ({ size = 40, breathe = true, shadow = true, color = 'var(--sage-deep)' }) => {
  const isEm = typeof size === 'string';
  // Best-effort shadow tint that tracks the active color. Sage-deep gets
  // the original olive shadow; coral gets a coral shadow; anything else
  // falls back to a generic dark shadow.
  const shadowRgba =
    color === 'var(--coral)' ? 'rgba(255,107,71,0.5)' :
    color === 'var(--sage-deep)' ? 'rgba(79,106,76,0.5)' :
    'rgba(11,27,43,0.4)';
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
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      <span style={{ position: 'absolute', inset: '0.09em', borderRadius: '50%', background: 'var(--cream)' }} />
      <span style={{
        position: 'absolute', inset: '0.18em', borderRadius: '50%',
        background: color,
        boxShadow: shadow ? `0 6px 14px -4px ${shadowRgba}` : 'none',
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
    </span>
  );
};

// Wordmark — used in Nav and inside phone mockups.
// `text` is the prefix before the mark ('ik ben' or 'jag är').
// `markColor` controls the IkBenOkMark color (defaults to sage-deep).
const Wordmark = ({ size = 24, color = 'var(--navy)', text = 'ik ben', markColor }) =>
  <span style={{
    fontFamily: 'var(--font-display)', fontSize: size, lineHeight: 1,
    letterSpacing: '-0.015em', color, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: '0.12em',
    whiteSpace: 'nowrap'
  }}>
    {text} <IkBenOkMark size="1.9em" breathe={false} shadow={false} color={markColor} />
  </span>;

// Brand — inline italic brand in body copy.
const Brand = ({ italic = false, text = 'ik ben', markColor }) =>
  <span style={{
    fontFamily: 'var(--font-display)',
    fontStyle: italic ? 'italic' : undefined,
    fontWeight: 600,
    letterSpacing: '-0.015em',
    display: 'inline-flex', alignItems: 'center', gap: '0.12em',
    whiteSpace: 'nowrap', verticalAlign: 'baseline'
  }}>
    {text} <IkBenOkMark size="1.9em" breathe={false} shadow={false} color={markColor} />
  </span>;

// Pure iPhone frame — identical between NL and SV.
const Phone = ({ children, width = 300, height = 620, tilt = 0, scale = 1, lift = true }) =>
  <div style={{
    width, height, borderRadius: 44, overflow: 'hidden',
    position: 'relative', background: 'var(--paper)',
    boxShadow: lift ?
      '0 60px 120px -40px rgba(11,27,43,0.42), 0 20px 40px -20px rgba(11,27,43,0.22), 0 0 0 1.5px rgba(11,27,43,0.85), inset 0 0 0 4px #000, inset 0 0 0 5px rgba(255,255,255,0.08)' :
      '0 14px 30px -18px rgba(11,27,43,0.22), 0 0 0 1px rgba(11,27,43,0.85), inset 0 0 0 3px #000',
    transform: `rotate(${tilt}deg) scale(${scale})`,
    transformOrigin: 'center'
  }}>
    {/* dynamic island */}
    <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      width: 108, height: 30, borderRadius: 18, background: '#000', zIndex: 50
    }} />
    {/* status bar text */}
    <div style={{
      position: 'absolute', top: 14, left: 28, zIndex: 40,
      fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 600,
      fontSize: 13, color: 'var(--navy)'
    }}>9:41</div>
    <div style={{
      position: 'absolute', top: 15, right: 26, zIndex: 40,
      display: 'flex', gap: 5, alignItems: 'center'
    }}>
      <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="6" width="2.6" height="4" rx="0.6" fill="var(--navy)" /><rect x="4" y="4" width="2.6" height="6" rx="0.6" fill="var(--navy)" /><rect x="8" y="2" width="2.6" height="8" rx="0.6" fill="var(--navy)" /><rect x="12" y="0" width="2.6" height="10" rx="0.6" fill="var(--navy)" /></svg>
      <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0.5" y="0.5" width="19" height="10" rx="3" stroke="var(--navy)" strokeOpacity="0.45" fill="none" /><rect x="2" y="2" width="15" height="7" rx="1.5" fill="var(--navy)" /></svg>
    </div>
    {/* home indicator */}
    <div style={{
      position: 'absolute', bottom: 7, left: 0, right: 0, zIndex: 60,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none'
    }}>
      <div style={{ width: 110, height: 4, borderRadius: 100, background: 'rgba(11,27,43,0.28)' }} />
    </div>
    {/* content */}
    <div style={{
      position: 'absolute', inset: 0, paddingTop: 52, paddingBottom: 24,
      overflow: 'hidden'
    }}>{children}</div>
  </div>;

Object.assign(window, { useIsMobile, IkBenOkMark, Wordmark, Brand, Phone });
