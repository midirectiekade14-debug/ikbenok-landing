// Phone.jsx — phone-mockup screens (Home, Ping, Caregiver, Schedule).
// The iPhone frame, IkBenOkMark, and Wordmark live in shared.jsx and
// are pulled off window so JSX can reference them by bare name.

const { Phone, Wordmark: PhoneWordmark } = window;


// ─────────────────────────────────────────────────────
// Home screen — the canonical breathing Ik ben OK
// ─────────────────────────────────────────────────────
const PhoneHome = ({ name = 'Margriet', progress = 0.62, intensity = 1, state = 'ok' }) => {
  const breathDur = intensity < 0.2 ? '0s' : intensity < 0.6 ? '8s' : '5s';
  // Color tokens — sage-deep for normal "ok" state, clay (#a54a3a) for alarm/missed-checkin state.
  // Matches the Checkin app: src/theme.ts → colors.clay, used in CheckInStatus.tsx as `isOverdue ? colors.clay : colors.sage`.
  const isAlarm = state === 'alarm';
  const ringFg = isAlarm ? 'var(--clay)' : 'var(--sage-deep)';
  const buttonBg = isAlarm ? 'var(--clay)' : 'var(--sage-deep)';
  const buttonShadow = isAlarm
    ? '0 24px 60px -14px rgba(165,74,58,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)'
    : '0 24px 60px -14px rgba(79,106,76,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)';
  const pingBg = isAlarm ? 'rgba(165,74,58,0.45)' : 'rgba(79,106,76,0.45)';
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
          veilig gekoppeld
        </span>
      </div>

      {/* greeting */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.02,
        letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: 4
      }}>
        Goedemiddag,<br />
        <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>{name}</em>
      </div>

      {/* the breathing button */}
      <div style={{ display: 'grid', placeItems: 'center', margin: '4px auto 16px', position: 'relative', width: 200, height: 200 }}>
        {/* progress ring — translateY offsets the visual weight of the button's drop-shadow,
            so the ring reads as centered around the button rather than sitting too high */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: `conic-gradient(${ringFg} ${progress * 360}deg, var(--cream-warm) ${progress * 360}deg)`,
          transform: 'translateY(3px)'
        }} />
        <div style={{
          position: 'absolute', width: 182, height: 182, borderRadius: '50%',
          background: 'var(--paper)',
          transform: 'translateY(3px)'
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
          }}>tik om te bevestigen</span>
          <span style={{
            fontFamily: 'var(--font-display)', lineHeight: 1,
            letterSpacing: '-0.015em', fontWeight: 500,
            whiteSpace: 'nowrap', color: 'var(--cream)', fontSize: "41px", margin: "2px 0px 20px"
          }}>
            ik ben ok
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
          <div style={{ fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap' }}>vorige check</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--sage-deep)', whiteSpace: 'nowrap' }}>gisteren · 14:32</div>
        </div>
        <div style={{
          flex: 1, minWidth: 0, padding: '9px 10px',
          background: 'var(--paper-raised)',
          border: '1px solid var(--line-soft)',
          borderRadius: 14
        }}>
          <div style={{ fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap' }}>volgende check</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--navy)', whiteSpace: 'nowrap' }}>vandaag · 16:00</div>
        </div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────
// Ping (morning prompt)
// ─────────────────────────────────────────────────────
const PhonePing = ({ name = 'Margriet' }) =>
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
  }}>· Check-in moment ·</div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8
    }}>dinsdag · 14:32</div>
      <div style={{
      fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.0,
      letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 20px'
    }}>
        Hoe gaat het,<br />
        <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>{name}</em>?
      </div>
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.55,
      color: 'var(--fg-default)', margin: '0 auto 26px', maxWidth: 210
    }}>Tik ja, dan weten Mira en Hans dat alles goed is.</p>

      <button style={{
      background: 'var(--sage)', color: '#fff', border: 'none',
      padding: '15px 18px', borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: 'default',
      boxShadow: '0 14px 26px -8px rgba(110,150,128,0.6), 0 3px 6px rgba(11,27,43,0.15), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -3px 6px rgba(0,0,0,0.16)'
    }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        Ja, alles goed
      </button>
      <div style={{
      marginTop: 12, color: 'var(--fg-muted)', fontSize: 11.5,
      fontFamily: 'var(--font-body)', textDecoration: 'underline', textUnderlineOffset: 3
    }}>Vraag me over 10 minuten opnieuw</div>
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Caregiver confirmation (what the mantelzorger sees)
// Mirrors the app's CaregiverDashboard + CaregiverPeerCard:
// section-label "Wie volg je" (sentence-case display, with coral bar),
// peer-card with eyebrow + big italic-coral peerName, subtitle and
// next-check body line, history collapsed by default behind a toggle.
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

    {/* section-label: bar + sentence-case display, app SectionLabel transform="none" */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <span style={{ width: 18, height: 1.5, background: 'var(--coral)', display: 'inline-block' }} />
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: 0,
        color: 'var(--fg-default)', fontWeight: 500
      }}>Wie volg je</span>
    </div>

    {/* peer card — sage tinted */}
    <div style={{
    padding: '14px 14px 12px',
    background: 'rgba(110,150,128,0.12)',
    border: '1px solid rgba(110,150,128,0.28)',
    borderRadius: 14
  }}>
      {/* eyebrow */}
      <div style={{
      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8
    }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }} />
        <span style={{
        fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--sage-deep)', fontWeight: 600
      }}>Ingecheckt</span>
      </div>
      {/* peer name solo, big italic coral display */}
      <div style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 19, lineHeight: 1.15, letterSpacing: '-0.015em',
      color: 'var(--coral)', fontWeight: 400
    }}>Margriet</div>
      {/* subtitle in display font */}
      <div style={{
      fontFamily: 'var(--font-display)', fontSize: 13, lineHeight: 1.2,
      letterSpacing: '-0.01em', color: 'var(--navy)', marginTop: 2
    }}>heeft ingecheckt · vandaag 2 mei · 14:32</div>
      {/* next-check body */}
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.45,
      color: 'var(--fg-default)', margin: '8px 0 0'
    }}>Volgende check-in vandaag 2 mei om 16:00.</p>
      {/* week toggle (collapsed by default — app default) */}
      <div style={{
      fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.05em',
      color: 'var(--fg-muted)', fontWeight: 500, marginTop: 10
    }}>+ Deze week</div>
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Schedule (set your own check-in times) — mirrors the
// IntervalForm in the ik ben ok app: mode tabs (Interval /
// Vaste momenten) + clock-icon time rows + tag, no day picker.
// ─────────────────────────────────────────────────────
const PhoneSchedule = () => {
  const times = [
  { value: '09:00', tag: 'OCHTEND' },
  { value: '13:00', tag: 'MIDDAG' },
  { value: '20:00', tag: 'AVOND' }];

  return (
    <div style={{ padding: '10px 20px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* wordmark row — matches app: only the wordmark in the topbar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 18
      }}>
        <PhoneWordmark size={20} />
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.1,
        letterSpacing: '-0.015em', color: 'var(--navy)', marginBottom: 12
      }}>Wanneer checken we <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>in</em>?</div>

      {/* mode tabs — pill with 2 segments, active = navy */}
      <div style={{
        display: 'flex', padding: 3, gap: 3,
        background: 'var(--paper-raised)',
        border: '1px solid var(--line)',
        borderRadius: 999,
        marginBottom: 14
      }}>
        <span style={{
          flex: 1, textAlign: 'center', padding: '7px 8px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
          color: 'var(--fg-default)', letterSpacing: '0.01em'
        }}>Interval</span>
        <span style={{
          flex: 1, textAlign: 'center', padding: '7px 8px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
          background: 'var(--navy)', color: '#e8d59c', letterSpacing: '0.01em'
        }}>Vaste momenten</span>
      </div>

      {/* time rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {times.map((t) =>
        <div key={t.value} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 12px',
          background: 'var(--paper-raised)',
          border: '1px solid var(--line-soft)',
          borderRadius: 12
        }}>
            {/* clock icon */}
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'var(--cream-warm)',
              border: '1px solid var(--line-soft)',
              display: 'grid', placeItems: 'center', flexShrink: 0,
              fontSize: 14, color: 'var(--navy)', lineHeight: 1
            }}>◷</div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1,
              letterSpacing: '0.04em', color: 'var(--navy)', fontWeight: 500,
              flex: 1
            }}>{t.value}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 9,
              letterSpacing: '0.18em', color: 'var(--fg-muted)',
              fontWeight: 600
            }}>{t.tag}</span>
            <span style={{
              fontSize: 16, color: 'var(--fg-muted)', lineHeight: 1,
              padding: '0 2px'
            }}>×</span>
          </div>
        )}
      </div>

      {/* + tijd toevoegen */}
      <div style={{
        marginTop: 8,
        padding: '10px 12px',
        border: '1.5px dashed var(--line)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-default)',
        fontWeight: 500
      }}>+ Tijd toevoegen</div>

      {/* hint */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 10.5, lineHeight: 1.5,
        color: 'var(--fg-muted)', margin: '12px 0 0'
      }}>Je krijgt op <span style={{ color: 'var(--navy)', fontWeight: 600 }}>3 momenten</span> per dag een vraag: <span style={{ color: 'var(--navy)', fontWeight: 600 }}>09:00 · 13:00 · 20:00</span>.</p>

      <div style={{ flex: 1 }} />
    </div>);

};

Object.assign(window, { Phone, PhoneHome, PhonePing, PhoneCaregiver, PhoneSchedule });