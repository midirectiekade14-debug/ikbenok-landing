// Phone.jsx (sv) — phone-mockup screens for the Swedish locale.
// The iPhone frame and Wordmark live in /components/shared.jsx;
// SV-specific defaults (coral mark, "jag är" text) are applied via the
// PhoneWordmark wrapper below so JSX call-sites stay terse.

const { Phone, Wordmark: SvSharedWordmark } = window;
const PhoneWordmark = (p) => <SvSharedWordmark text="jag är" markColor="var(--coral)" {...p} />;


// ─────────────────────────────────────────────────────
// Home screen — the canonical breathing Jag är OK
// ─────────────────────────────────────────────────────
const PhoneHome = ({ name = 'Astrid', progress = 0.62, intensity = 1, state = 'ok' }) => {
  const breathDur = intensity < 0.2 ? '0s' : intensity < 0.6 ? '8s' : '5s';
  const isAlarm = state === 'alarm';
  const ringFg = isAlarm ? 'var(--clay)' : 'var(--coral)';
  const buttonBg = isAlarm ? 'var(--clay)' : 'var(--coral)';
  const buttonShadow = isAlarm
    ? '0 24px 60px -14px rgba(165,74,58,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)'
    : '0 24px 60px -14px rgba(255,107,71,0.55), inset 0 -8px 20px rgba(0,0,0,0.12)';
  const pingBg = isAlarm ? 'rgba(165,74,58,0.45)' : 'rgba(255,107,71,0.45)';
  return (
    <div style={{ padding: '8px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      <div style={{ display: 'grid', placeItems: 'center', margin: '104px auto 16px', position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
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
        {/* outward ping — only at higher intensity. top/left = (200-170)/2 to center inside the
            grid wrapper; absolute children don't honour `placeItems: center` reliably. */}
        {intensity > 0.6 &&
        <div style={{
          position: 'absolute', top: 15, left: 15, width: 170, height: 170, borderRadius: '50%',
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
// Caregiver confirmation (what the anhörigvårdare sees)
// Mirrors the app's CaregiverDashboard + CaregiverPeerCard:
// section-label "Vem du följer", peer-card with eyebrow + big italic-
// coral peerName, subtitle and next-check body line, history collapsed
// by default behind a "+ Denna vecka" toggle.
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
      }}>Vem du följer</span>
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
      }}>Incheckad</span>
      </div>
      {/* peer name solo, big italic coral display */}
      <div style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 19, lineHeight: 1.15, letterSpacing: '-0.015em',
      color: 'var(--coral)', fontWeight: 400
    }}>Astrid</div>
      {/* subtitle in display font */}
      <div style={{
      fontFamily: 'var(--font-display)', fontSize: 13, lineHeight: 1.2,
      letterSpacing: '-0.01em', color: 'var(--navy)', marginTop: 2
    }}>checkade in · idag 2 maj · 14:32</div>
      {/* next-check body */}
      <p style={{
      fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.45,
      color: 'var(--fg-default)', margin: '8px 0 0'
    }}>Nästa incheckning idag 2 maj kl 16:00.</p>
      {/* week toggle (collapsed by default — app default) */}
      <div style={{
      fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.05em',
      color: 'var(--fg-muted)', fontWeight: 500, marginTop: 10
    }}>+ Denna vecka</div>
    </div>
  </div>;


// ─────────────────────────────────────────────────────
// Schedule (set your own check-in times) — mirrors the
// IntervalForm in the Checkin app: mode tabs + clock-icon
// time rows + tag, no day picker.
// ─────────────────────────────────────────────────────
const PhoneSchedule = () => {
  const times = [
  { value: '09:00', tag: 'MORGON' },
  { value: '13:00', tag: 'EFTERMIDDAG' },
  { value: '20:00', tag: 'KVÄLL' }];

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
      }}>När checkar vi <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>in</em>?</div>

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
        }}>Intervall</span>
        <span style={{
          flex: 1, textAlign: 'center', padding: '7px 8px',
          borderRadius: 999,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
          background: 'var(--navy)', color: '#e8d59c', letterSpacing: '0.01em'
        }}>Fasta tider</span>
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

      {/* + tid toevoegen */}
      <div style={{
        marginTop: 8,
        padding: '10px 12px',
        border: '1.5px dashed var(--line)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-default)',
        fontWeight: 500
      }}>+ Lägg till tid</div>

      {/* hint */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 10.5, lineHeight: 1.5,
        color: 'var(--fg-muted)', margin: '12px 0 0'
      }}>Du får en fråga vid <span style={{ color: 'var(--navy)', fontWeight: 600 }}>3 tillfällen</span> per dag: <span style={{ color: 'var(--navy)', fontWeight: 600 }}>09:00 · 13:00 · 20:00</span>.</p>

      <div style={{ flex: 1 }} />
    </div>);

};

Object.assign(window, { Phone, PhoneHome, PhoneCaregiver, PhoneSchedule });
