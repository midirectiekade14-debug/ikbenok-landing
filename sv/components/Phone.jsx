// Phone.jsx — minimal iOS device frame (no nav, no status bar variants we don't need)
// Exports: Phone (an iPhone-ish shell), PhoneHome (the breathing Jag är OK preview),
// PhonePing (the morning check-in prompt), PhoneConfirmed (success toast).

// Ring-gap "ok" mark — exact replica of design-system V5 favicon variant.
// Source: Claude Design bundle ui_kits/allesok/ikbenok-logo-variants.jsx, IBOK_FaviconPreview v5.
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

// Inline wordmark used inside phone mockups — matches Nav's Wordmark.
const PhoneWordmark = ({ size = 22, color = 'var(--navy)' }) =>
<span style={{
  fontFamily: 'var(--font-display)', fontSize: size, lineHeight: 1,
  letterSpacing: '-0.015em', color, fontWeight: 500,
  display: 'inline-flex', alignItems: 'center', gap: '0.12em',
  whiteSpace: 'nowrap'
}}>
    jag är <IkBenOkMark size="1.9em" breathe={false} shadow={false} />
  </span>;


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


// ─────────────────────────────────────────────────────
// Home screen — the canonical breathing Jag är OK
// ─────────────────────────────────────────────────────
const PhoneHome = ({ name = 'Astrid', progress = 0.62, intensity = 1, state = 'ok' }) => {
  const breathDur = intensity < 0.2 ? '0s' : intensity < 0.6 ? '8s' : '5s';
  const pulseDur = intensity < 0.2 ? '0s' : '2.4s';
  const isAlarm = state === 'alarm';
  const ringFg = isAlarm ? 'var(--clay)' : 'var(--coral)';
  const buttonBg = isAlarm ? 'var(--clay)' : 'var(--coral)';
  const buttonShadow = isAlarm
    ? '0 24px 60px -14px rgba(165,74,58,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)'
    : '0 24px 60px -14px rgba(255,107,71,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)';
  const pingBg = isAlarm ? 'rgba(165,74,58,0.45)' : 'rgba(255,107,71,0.45)';
  return (
    <div style={{ padding: '8px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes phone-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.035); } }
        @keyframes phone-ring-pulse { 0% { opacity: 0.6; transform: scale(1); } 100% { opacity: 0; transform: scale(1.18); } }
      `}</style>
      {/* wordmark row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 18
      }}>
        <PhoneWordmark size={22} />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px',
          background: 'rgba(110,150,128,0.14)',
          border: '1px solid rgba(110,150,128,0.3)',
          borderRadius: 999,
          fontFamily: 'var(--font-body)', fontSize: 10.5,
          color: 'var(--navy)', fontWeight: 500, letterSpacing: '0.01em'
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--sage)' }} />
          säkert kopplad
        </span>
      </div>

      {/* greeting */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.02,
        letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: 4
      }}>
        God eftermiddag,<br />
        <em style={{ fontStyle: 'italic', color: 'var(--sage-deep)' }}>{name}</em>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5,
        color: 'var(--fg-default)', margin: '6px 0 18px'
      }}>Ett tryck för att visa att allt är bra.</p>

      {/* the breathing button */}
      <div style={{ display: 'grid', placeItems: 'center', margin: '4px auto 16px', position: 'relative', width: 200, height: 200 }}>
        {/* progress ring */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `conic-gradient(${ringFg} ${progress * 360}deg, var(--cream-warm) ${progress * 360}deg)`
        }} />
        <div style={{
          position: 'absolute', width: 182, height: 182, borderRadius: '50%',
          background: 'var(--paper)'
        }} />
        {/* outward ping — only at higher intensity */}
        {intensity > 0.6 &&
        <div style={{
          position: 'absolute', width: 170, height: 170, borderRadius: '50%',
          background: pingBg,
          animation: `phone-ring-pulse 2.6s var(--ease-out) infinite`
        }} />
        }
        {/* button */}
        <div style={{
          position: 'relative', width: 166, height: 166, borderRadius: '50%',
          background: buttonBg, color: '#fff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: buttonShadow,
          animation: intensity > 0 ? `phone-breathe ${breathDur} ease-in-out infinite` : 'none'
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 10.5, opacity: 0.82, marginBottom: 8, letterSpacing: '0.02em'
          }}>tryck för att bekräfta</span>
          <span style={{
            fontFamily: 'var(--font-display)', lineHeight: 1,
            letterSpacing: '-0.015em', fontWeight: 500,
            whiteSpace: 'nowrap', color: 'var(--cream)', fontSize: "41px", margin: "2px 0px 20px"
          }}>
            jag är ok
          </span>
        </div>
      </div>

      {/* meta cards */}
      <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
        <div style={{
          flex: 1, minWidth: 0, padding: '9px 10px',
          background: 'var(--paper-raised)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14
        }}>
          <div style={{ fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap' }}>senaste incheckning</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--sage-deep)', whiteSpace: 'nowrap' }}>igår · 14:32</div>
        </div>
        <div style={{
          flex: 1, minWidth: 0, padding: '9px 10px',
          background: 'var(--paper-raised)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14
        }}>
          <div style={{ fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap' }}>nästa incheckning</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--navy)', whiteSpace: 'nowrap' }}>idag · 16:00</div>
        </div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────
// Ping (morning prompt)
// ─────────────────────────────────────────────────────
const PhonePing = ({ name = 'Astrid' }) =>
<div style={{
  padding: '10px 22px 0', height: '100%',
  display: 'flex', flexDirection: 'column', textAlign: 'center'
}}>
    {/* wordmark row */}
    <div style={{
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    marginBottom: 22
  }}>
      <PhoneWordmark size={20} />
    </div>

    <div style={{
    fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase',
    color: 'var(--fg-muted)', marginBottom: 20, fontWeight: 500
  }}>· Incheckningstid ·</div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8
    }}>tisdag · 14:32</div>
      <div style={{
      fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.0,
      letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 20px'
    }}>
        Hur mår du,<br />
        <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>{name}</em>?
      </div>
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.55,
      color: 'var(--fg-default)', margin: '0 auto 26px', maxWidth: 210
    }}>Tryck ja, då vet Mira och Hans att allt är bra.</p>

      <button style={{
      background: 'var(--sage)', color: '#fff', border: 'none',
      padding: '15px 18px', borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: 'default',
      boxShadow: '0 14px 26px -8px rgba(110,150,128,0.6), 0 3px 6px rgba(11,27,43,0.15), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -3px 6px rgba(0,0,0,0.16)'
    }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        Ja, allt är bra
      </button>
      <div style={{
      marginTop: 12, color: 'var(--fg-muted)', fontSize: 11.5,
      fontFamily: 'var(--font-body)', textDecoration: 'underline', textUnderlineOffset: 3
    }}>Fråga mig igen om 10 minuter</div>
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Caregiver confirmation (what the anhörigvårdare sees)
// ─────────────────────────────────────────────────────
const PhoneCaregiver = () =>
<div style={{ padding: '10px 20px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 18
  }}>
      <PhoneWordmark size={20} />
      <div style={{
      fontFamily: 'var(--font-body)', fontSize: 10.5, color: 'var(--fg-muted)',
      letterSpacing: '0.08em'
    }}>MIRA</div>
    </div>

    <div style={{
    fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.28em',
    textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 10, fontWeight: 500
  }}>Idag</div>

    {/* notification card */}
    <div style={{
    padding: '16px 16px 18px',
    background: 'rgba(110,150,128,0.14)',
    border: '1px solid rgba(110,150,128,0.3)',
    borderRadius: 18,
    marginBottom: 12
  }}>
      <div style={{
      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10
    }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)' }} />
        <span style={{
        fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--sage-deep)', fontWeight: 600
      }}>Incheckad</span>
      </div>
      <div style={{
      fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.1,
      letterSpacing: '-0.015em', color: 'var(--navy)'
    }}><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Astrid</em> har<br />checkat in · 14:32</div>
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.5,
      color: 'var(--fg-default)', margin: '10px 0 0'
    }}>Skönt. Allt är bra. Nästa incheckning ikväll kl 20:00.</p>
    </div>

    {/* history rows */}
    <div style={{
    padding: '14px 16px',
    background: 'var(--paper-raised)',
    border: '1px solid var(--line-soft)',
    borderRadius: 18
  }}>
      <div style={{
      fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'var(--fg-muted)', marginBottom: 10, fontWeight: 500
    }}>Denna vecka</div>
      {[
    ['måndag', '08:14', '14:02', '20:06'],
    ['söndag', '08:30', '14:22', '20:11'],
    ['lördag', '08:05', '14:34', '20:02']].
    map(([day, ...times], idx, arr) =>
    <div key={day} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '7px 0', gap: 8, flexWrap: 'nowrap',
      borderBottom: idx === arr.length - 1 ? 'none' : '1px solid var(--line-soft)'
    }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-default)',
            flexShrink: 0
          }}>{day}</span>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4, flexShrink: 0
          }}>
            {times.map((t) =>
        <span key={t} style={{
          fontFamily: 'var(--font-body)', fontSize: 9.5, color: 'var(--sage-deep)',
          padding: '2px 0', background: 'rgba(110,150,128,0.14)',
          borderRadius: 999, whiteSpace: 'nowrap', lineHeight: 1.4,
          textAlign: 'center', minWidth: 36,
          fontVariantNumeric: 'tabular-nums'
        }}>{t}</span>
        )}
          </div>
        </div>
    )}
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Schedule (set your own check-in times)
// ─────────────────────────────────────────────────────
const PhoneSchedule = () => {
  const times = [
  { label: 'Morgon', value: '08:00', active: true, tag: 'Efter att du vaknat' },
  { label: 'Eftermiddag', value: '14:00', active: true, tag: 'Daglig check' },
  { label: 'Kväll', value: '20:00', active: true, tag: 'Före läggdags' }];

  const days = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
  return (
    <div style={{ padding: '10px 20px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* wordmark row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20
      }}>
        <PhoneWordmark size={20} />
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 500
        }}>Inställningar</span>
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.05,
        letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: 4
      }}>Dina incheckningar<br /><em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>tider</em></div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.5,
        color: 'var(--fg-muted)', margin: '4px 0 16px'
      }}>Välj själv när <Brand /> frågar hur du mår.</p>

      {/* day selector */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', gap: 4,
        marginBottom: 14
      }}>
        {days.map((d, i) =>
        <span key={i} style={{
          flex: 1, textAlign: 'center',
          padding: '8px 0',
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
          color: 'var(--cream)',
          background: 'var(--navy)',
          borderRadius: 10,
          letterSpacing: '0.02em'
        }}>{d}</span>
        )}
      </div>

      {/* time rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {times.map((t) =>
        <div key={t.label} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px',
          background: 'var(--paper-raised)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14
        }}>
            <div style={{ minWidth: 0 }}>
              <div style={{
              fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--fg-muted)', marginBottom: 3, fontWeight: 600
            }}>{t.label}</div>
              <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1,
              letterSpacing: '-0.02em', color: 'var(--navy)'
            }}>{t.value}</div>
            </div>
            <div style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 11, color: 'var(--fg-muted)',
            textAlign: 'right', maxWidth: 88, lineHeight: 1.2
          }}>{t.tag}</div>
            {/* toggle */}
            <div style={{
            width: 36, height: 20, borderRadius: 999,
            background: 'var(--coral)',
            position: 'relative', flexShrink: 0, marginLeft: 10,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)'
          }}>
              <span style={{
              position: 'absolute', top: 2, left: 18, width: 16, height: 16,
              borderRadius: '50%', background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }} />
            </div>
          </div>
        )}
      </div>

      {/* + extra moment */}
      <div style={{
        marginTop: 10,
        padding: '12px 14px',
        border: '1.5px dashed var(--line)',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        Extra tillfälle
      </div>

      <div style={{ flex: 1 }} />
    </div>);

};

Object.assign(window, { Phone, PhoneHome, PhonePing, PhoneCaregiver, PhoneSchedule });
