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
// SVG path-data — finalized geometrie 1:1 uit ikbenok Expo-app
// (src/components/ui/wordmarkPaths.ts). Dosis-Medium "ik ben" en
// Dosis-Bold "ok" gegenereerd op fontSize=100 via opentype.js.
// Geen runtime font-dependency en pixel-identiek met de native app.
// ─────────────────────────────────────────────────────
const IK_BEN_PATH =
  'M10-60.400Q7.900-60.400 6.350-61.850Q4.800-63.300 4.800-65.200Q4.800-67.100 6.350-68.500Q7.900-69.900 10-69.900Q12.200-69.900 13.650-68.500Q15.100-67.100 15.100-65.200Q15.100-63.300 13.650-61.850Q12.200-60.400 10-60.400M10 0Q8.200 0 7.050-0.950Q5.900-1.900 5.900-3L5.900-44.500Q5.900-45.800 7.050-46.600Q8.200-47.400 10-47.400Q11.700-47.400 12.950-46.600Q14.200-45.800 14.200-44.500L14.200-3Q14.200-1.900 12.950-0.950Q11.700 0 10 0M30 0Q28.300 0 27.150-0.950Q26-1.900 26-3L26-73.100Q26-74.400 27.150-75.200Q28.300-76 30-76Q31.800-76 33.050-75.200Q34.300-74.400 34.300-73.100L34.300-26.300L57.100-46.900Q58-47.600 58.900-47.600Q59.900-47.600 60.850-47.050Q61.800-46.500 62.450-45.600Q63.100-44.700 63.100-43.700Q63.100-43.200 62.900-42.650Q62.700-42.100 62.200-41.700L48.300-29.400L64.900-5.300Q65.400-4.600 65.400-3.800Q65.400-2.800 64.700-1.800Q64-0.800 62.950-0.200Q61.900 0.400 60.800 0.400Q59.400 0.400 58.500-0.900L42.600-24.200L34.300-16.800L34.300-3Q34.300-1.900 33.050-0.950Q31.800 0 30 0M114.200 0.800Q109.600 0.800 105.850-1.550Q102.100-3.900 100.500-7L100.500-3Q100.500-1.900 99.400-0.950Q98.300 0 96.600 0Q94.900 0 93.750-0.950Q92.600-1.900 92.600-3L92.600-73.100Q92.600-74.400 93.750-75.200Q94.900-76 96.600-76Q98.400-76 99.650-75.200Q100.900-74.400 100.900-73.100L100.900-40.400Q102.500-43.300 105.850-45.650Q109.200-48 114-48Q118.900-48 122.950-45.350Q127-42.700 129.450-38.400Q131.900-34.100 131.900-28.800L131.900-18.600Q131.900-13.600 129.450-9.150Q127-4.700 123-1.950Q119 0.800 114.200 0.800M112.200-6.700Q115.300-6.700 117.900-8.400Q120.500-10.100 122.050-12.900Q123.600-15.700 123.600-18.600L123.600-28.800Q123.600-31.700 122.050-34.400Q120.500-37.100 117.900-38.800Q115.300-40.500 112.100-40.500Q109.400-40.500 106.800-39.050Q104.200-37.600 102.550-35.050Q100.900-32.500 100.900-28.800L100.900-15.900Q100.900-14.600 102.400-12.400Q103.900-10.200 106.500-8.450Q109.100-6.700 112.200-6.700M162.400 0.800Q155.900 0.800 150.900-1.650Q145.900-4.100 143-8.450Q140.100-12.800 140.100-18.600L140.100-29.100Q140.100-34.200 142.850-38.500Q145.600-42.800 150.100-45.400Q154.600-48 160-48Q165.200-48 169.550-45.600Q173.900-43.200 176.550-39.100Q179.200-35 179.200-29.600Q179.200-25.600 177.900-23.850Q176.600-22.100 174.600-21.700Q172.600-21.300 170.400-21.300L148.400-21.300L148.400-18.300Q148.400-12.700 152.400-9.450Q156.400-6.200 162.700-6.200Q166.400-6.200 168.600-7.200Q170.800-8.200 172.200-9.150Q173.600-10.100 174.700-10.100Q175.800-10.100 176.550-9.450Q177.300-8.800 177.700-7.900Q178.100-7 178.100-6.300Q178.100-5 176.200-3.350Q174.300-1.700 170.750-0.450Q167.200 0.800 162.400 0.800M148.400-30.500L148.400-26.900L166.900-26.900Q169.600-26.900 170.450-27.550Q171.300-28.200 171.300-30.100Q171.300-33.100 169.850-35.650Q168.400-38.200 165.800-39.800Q163.200-41.400 159.900-41.400Q156.800-41.400 154.200-39.950Q151.600-38.500 150-36Q148.400-33.500 148.400-30.500M192.500 0Q190.700 0 189.550-0.950Q188.400-1.900 188.400-3L188.400-44.500Q188.400-45.800 189.550-46.600Q190.700-47.400 192.500-47.400Q194.100-47.400 195.200-46.600Q196.300-45.800 196.300-44.500L196.300-40.400Q197.900-43.300 201.300-45.650Q204.700-48 209.700-48Q214.500-48 218.500-45.350Q222.500-42.700 224.900-38.400Q227.300-34.100 227.300-28.800L227.300-3Q227.300-1.500 226-0.750Q224.700 0 223.100 0Q221.600 0 220.300-0.750Q219-1.500 219-3L219-28.800Q219-31.700 217.450-34.400Q215.900-37.100 213.300-38.800Q210.700-40.500 207.600-40.500Q204.900-40.500 202.400-39.050Q199.900-37.600 198.300-35.050Q196.700-32.500 196.700-28.800L196.700-3Q196.700-1.900 195.450-0.950Q194.200 0 192.500 0';

const OK_PATH =
  'M24.800 0.900Q19 0.900 14.100-1.950Q9.200-4.800 6.200-9.500Q3.200-14.200 3.200-19.600L3.200-27.800Q3.200-33.200 6.100-37.850Q9-42.500 13.950-45.300Q18.900-48.100 24.800-48.100Q30.700-48.100 35.650-45.350Q40.600-42.600 43.550-38Q46.500-33.400 46.500-27.800L46.500-19.600Q46.500-14.300 43.500-9.600Q40.500-4.900 35.550-2Q30.600 0.900 24.800 0.900M24.800-10.400Q27.200-10.400 29.200-11.700Q31.200-13 32.400-15.150Q33.600-17.300 33.600-19.600L33.600-27.800Q33.600-30.100 32.400-32.100Q31.200-34.100 29.250-35.450Q27.300-36.800 24.800-36.800Q22.400-36.800 20.400-35.500Q18.400-34.200 17.250-32.150Q16.100-30.100 16.100-27.800L16.100-19.600Q16.100-17.300 17.250-15.150Q18.400-13 20.400-11.700Q22.400-10.400 24.800-10.400M61.100 0Q58.400 0 56.600-1.300Q54.800-2.600 54.800-4.100L54.800-71.200Q54.800-73 56.600-74.100Q58.400-75.200 61.100-75.200Q63.900-75.200 65.800-74.100Q67.700-73 67.700-71.200L67.700-29.300L86.600-47Q87.600-48 89.100-48Q90.600-48 92.050-47.050Q93.500-46.100 94.450-44.700Q95.400-43.300 95.400-41.800Q95.400-41.200 95.150-40.550Q94.900-39.900 94.300-39.400L82.500-28.700L97.300-7.700Q98-6.600 98-5.600Q98-4.100 96.800-2.600Q95.600-1.100 93.900-0.150Q92.200 0.800 90.600 0.800Q88.600 0.800 87.400-0.900L74-20.800L67.700-15.100L67.700-4.100Q67.700-2.600 65.800-1.300Q63.900 0 61.100 0';

const IK_BEN_METRICS = { bbox: { x1: 4.8, y1: -76, x2: 227.3, y2: 0.8 } };
const OK_METRICS = { bbox: { x1: 3.2, y1: -75.2, x2: 98, y2: 0.9 } };
const TEXT_VISUAL_OFFSET_FROM_BASELINE = 37.5;

// ─────────────────────────────────────────────────────
// Brand mark — the ik-ben-ok / jag-är-ok ring-gap "ok" button (breathing)
// ─────────────────────────────────────────────────────
// SVG-versie: 3 cirkels + Dosis-Bold "ok" path. Pixel-identiek met de
// native Expo-app via wordmarkPaths.ts. ViewBox 100×105 (circleYOffset=5).
//
// `color` prop drives outer en inner cirkel — NL = sage-deep, SV = coral.
// Middle cirkel + "ok" text = cream.
const IkBenOkMark = ({ size = 40, breathe = true, shadow = true, color = 'var(--sage-deep)' }) => {
  const isEm = typeof size === 'string';
  // Shadow-tint die de active color volgt.
  const shadowRgba =
    color === 'var(--coral)' ? 'rgba(255,107,71,0.5)' :
    color === 'var(--sage-deep)' ? 'rgba(79,106,76,0.5)' :
    'rgba(11,27,43,0.4)';

  // Mark-geometrie 1:1 uit IkBenOkMark.tsx van Expo-app:
  const circleYOffset = 5;
  const viewBoxHeight = 100 + circleYOffset; // 105
  const okScale = 1 / 1.9;
  const okBboxCenterX = (OK_METRICS.bbox.x1 + OK_METRICS.bbox.x2) / 2; // 50.6
  const okBaselineY = 50 + TEXT_VISUAL_OFFSET_FROM_BASELINE * okScale; // ≈ 69.7368
  const okTranslateX = 50 - okBboxCenterX * okScale; // ≈ 23.3684

  // Wrapper-grootte: width = size, height = size * (105/100). Voor em-size
  // (string) willen we de mark inline-aligned houden — gedrag matcht het
  // oorspronkelijke `verticalAlign:'-0.32em'`.
  const wrapperWidth = size;
  const wrapperHeight = isEm ? size : size * (viewBoxHeight / 100);

  // Shadow renderen we via een ringvormige div onder het svg, zodat de
  // box-shadow exact de cirkel-vorm volgt (border-radius:50%). Dit vervangt
  // de filter:drop-shadow op svg, die met overflow:visible op viewbox-y=105
  // niet altijd correct snijdt.
  const shadowLayer = shadow ? (
    <span style={{
      position: 'absolute',
      // De cirkel zit in viewBox op cy=55, r=50, dus loopt y=5..105 in een
      // 100×105 svg. Genormaliseerd t.o.v. wrapper: top 5/105 ≈ 4.76%,
      // height (5..105) = 100/105 ≈ 95.24% van wrapperHeight.
      left: 0,
      right: 0,
      top: `${(circleYOffset / viewBoxHeight) * 100}%`,
      height: `${(100 / viewBoxHeight) * 100}%`,
      borderRadius: '50%',
      boxShadow: `0 6px 14px -4px ${shadowRgba}`,
      pointerEvents: 'none',
      zIndex: 0,
    }} />
  ) : null;

  // Breathing zit ALLEEN op de inner-cirkel (r=40.53), zoals in de oude
  // div-versie. Outer ring + middle (cream) + "ok"-tekst pulseren niet mee.
  // Transform-origin in user-units (viewBox-coords) zodat de scale rond het
  // mark-midden gebeurt en niet rond (0,0).
  const cy = 50 + circleYOffset;
  const innerCircleStyle = breathe ? {
    transformOrigin: `50px ${cy}px`,
    animation: 'ibok-breathe 5s ease-in-out infinite',
  } : undefined;

  const svgEl = (
    <svg
      width={wrapperWidth}
      height={wrapperHeight}
      viewBox={`0 0 100 ${viewBoxHeight}`}
      style={{ overflow: 'visible', display: 'block', position: 'relative', zIndex: 1 }}
    >
      <circle cx={50} cy={cy} r={50} fill={color} />
      <circle cx={50} cy={cy} r={45.26} fill="var(--cream)" />
      <circle cx={50} cy={cy} r={40.53} fill={color} style={innerCircleStyle} />
      <g transform={`translate(${okTranslateX}, ${okBaselineY}) scale(${okScale})`}>
        <path d={OK_PATH} fill="var(--cream)" />
      </g>
    </svg>
  );

  // Vertical-align tunen zodat de "ok" baseline binnen de mark samenvalt met
  // de baseline van het omringende "ik ben". Ratio okBaselineY/viewBoxHeight
  // = 69.7368/105 ≈ 0.6642, dus de "ok" baseline zit 0.3358 × markHoogte
  // boven de markbodem. Met vertical-align = -0.638em (= -0.3358 × 1.9em)
  // landt die "ok" baseline op de parent text-baseline.
  const okBaselineFromBottom = (1 - okBaselineY / viewBoxHeight); // ≈ 0.336
  const emVerticalAlign = `-${(okBaselineFromBottom * (typeof size === 'string' ? parseFloat(size) : 1.9)).toFixed(3)}em`;
  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      width: wrapperWidth, height: wrapperHeight,
      flexShrink: 0, lineHeight: 1,
      verticalAlign: isEm ? emVerticalAlign : 'baseline',
    }}>
      {shadowLayer}
      {svgEl}
    </span>
  );
};

// ─────────────────────────────────────────────────────
// Wordmark — used in Nav, body-copy en Phone-mockups.
// `text` is de prefix vóór de mark ('ik ben' of 'jag är').
// `markColor` overschrijft de IkBenOkMark cirkelkleur (default sage-deep).
// `inline=true` laat de wordmark meeschalen met de surrounding font-size.
//
// Eén rendering-pad voor alle talen: Dosis-Medium tekst + IkBenOkMark
// (1.9em mark, flex-aligned op tekst-midden). Match SV-positionering die
// Harm op 2026-05-10 als referentie aanwees ("NL klopt geen reet van"
// vs. SV als ankerpunt).
// ─────────────────────────────────────────────────────
const Wordmark = ({ size = 24, color = 'var(--navy)', text = 'ik ben', markColor, inline = false }) => {
  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: inline ? 'inherit' : size,
      lineHeight: 1,
      letterSpacing: '-0.015em', color, fontWeight: 600,
      display: 'inline-block',
      whiteSpace: 'nowrap'
    }}>
      {text}<span style={{ display: 'inline-block', width: '0.12em' }} /><IkBenOkMark size="1.9em" breathe={false} shadow={false} color={markColor} />
    </span>
  );
};

// Brand — inline italic brand in body copy.
// Voor 'ik ben' gebruiken we de SVG-Wordmark; italic is hier moeilijk op
// een statische path toe te passen (zou een transform: skewX nodig hebben),
// dus voor italic + 'ik ben' vallen we terug op de oude span-rendering met
// Dosis-italic font. Anders renderen we de SVG-Wordmark.
const Brand = ({ italic = false, text = 'ik ben', markColor }) => {
  if (text !== 'ik ben' || italic) {
    return (
      <span style={{
        fontFamily: 'var(--font-display)',
        fontStyle: italic ? 'italic' : undefined,
        fontWeight: 600,
        letterSpacing: '-0.015em',
        display: 'inline-block',
        whiteSpace: 'nowrap', verticalAlign: 'baseline'
      }}>
        {text}<span style={{ display: 'inline-block', width: '0.12em' }} /><IkBenOkMark size="1.9em" breathe={false} shadow={false} color={markColor} />
      </span>
    );
  }
  return <Wordmark inline text={text} markColor={markColor} />;
};

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
