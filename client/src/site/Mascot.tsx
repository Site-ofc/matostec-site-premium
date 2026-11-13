import { useId } from "react";

type MascotProps = {
  className?: string;
  title?: string;
};

/**
 * "Sol" — mascote da Matos Tec.
 * Um sol com capacete de obra e placa fotovoltaica, nas cores da marca.
 */
export default function Mascot({ className, title = "Sol, mascote da Matos Tec" }: MascotProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${uid}`;

  const rays = Array.from({ length: 12 }, (_, i) => {
    const long = i % 2 === 0;
    return (
      <rect
        key={i}
        x={210 - 11}
        y={long ? 34 : 44}
        width={22}
        height={long ? 58 : 46}
        rx={11}
        fill={`url(#${id("ray")})`}
        transform={`rotate(${i * 30} 210 215)`}
        opacity={long ? 1 : 0.92}
      />
    );
  });

  return (
    <svg
      className={className}
      viewBox="0 0 420 430"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD75A" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#FFC93C" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFC93C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("ray")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE38A" />
          <stop offset="100%" stopColor="#F2A91E" />
        </linearGradient>
        <radialGradient id={id("body")} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FFEAA0" />
          <stop offset="45%" stopColor="#FFCE45" />
          <stop offset="82%" stopColor="#F5B01F" />
          <stop offset="100%" stopColor="#E89A12" />
        </radialGradient>
        <linearGradient id={id("helmet")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A4468" />
          <stop offset="100%" stopColor="#181D31" />
        </linearGradient>
        <linearGradient id={id("panel")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3C6BC4" />
          <stop offset="55%" stopColor="#254A93" />
          <stop offset="100%" stopColor="#1A3168" />
        </linearGradient>
        <linearGradient id={id("shine")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={id("soft")} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0B0F1E" floodOpacity="0.28" />
        </filter>
      </defs>

      <circle cx="210" cy="215" r="205" fill={`url(#${id("glow")})`} />

      <g className="mascot-rays">{rays}</g>

      <g filter={`url(#${id("soft")})`}>
        <circle cx="210" cy="215" r="112" fill={`url(#${id("body")})`} />
        <ellipse cx="170" cy="160" rx="62" ry="34" fill={`url(#${id("shine")})`} transform="rotate(-24 170 160)" />
        <circle cx="210" cy="215" r="112" fill="none" stroke="#E8A017" strokeOpacity="0.35" strokeWidth="2" />
      </g>

      {/* rosto */}
      <g>
        <ellipse cx="174" cy="214" rx="11" ry="14.5" fill="#1B2136" />
        <ellipse cx="246" cy="214" rx="11" ry="14.5" fill="#1B2136" />
        <circle cx="178" cy="209" r="4" fill="#FFFFFF" />
        <circle cx="250" cy="209" r="4" fill="#FFFFFF" />
        <path d="M162 191 Q174 183 187 190" stroke="#1B2136" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M233 190 Q246 183 258 191" stroke="#1B2136" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75" />
        <ellipse cx="152" cy="240" rx="14" ry="8.5" fill="#E8674A" opacity="0.38" />
        <ellipse cx="268" cy="240" rx="14" ry="8.5" fill="#E8674A" opacity="0.38" />
        <path d="M184 247 Q210 270 236 247" stroke="#1B2136" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M196 261 Q210 268 224 261" stroke="#F7A2A2" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.55" />
      </g>

      {/* capacete */}
      <g>
        <path d="M120 180 A90 90 0 0 1 300 180 Z" fill={`url(#${id("helmet")})`} />
        <path d="M120 180 A90 90 0 0 1 300 180" fill="none" stroke="#4A557F" strokeOpacity="0.6" strokeWidth="2" />
        <rect x="128" y="128" width="164" height="12" rx="6" fill="#C41E2E" opacity="0.9" />
        <rect x="104" y="172" width="212" height="22" rx="11" fill="#252C47" />
        <rect x="104" y="172" width="212" height="8" rx="4" fill="#4A557F" opacity="0.55" />
        <rect x="150" y="140" width="30" height="8" rx="4" fill="#FFFFFF" opacity="0.18" />
      </g>

      {/* placa solar na mão esquerda */}
      <g transform="rotate(-14 92 300)">
        <rect x="34" y="268" width="112" height="70" rx="9" fill={`url(#${id("panel")})`} stroke="#181D31" strokeWidth="5" />
        <g stroke="#8FB6F5" strokeOpacity="0.55" strokeWidth="2">
          <line x1="34" y1="291" x2="146" y2="291" />
          <line x1="34" y1="315" x2="146" y2="315" />
          <line x1="72" y1="268" x2="72" y2="338" />
          <line x1="108" y1="268" x2="108" y2="338" />
        </g>
        <rect x="34" y="268" width="112" height="18" rx="9" fill="#FFFFFF" opacity="0.12" />
      </g>
      <circle cx="140" cy="296" r="17" fill={`url(#${id("body")})`} />
      <circle cx="140" cy="296" r="17" fill="none" stroke="#E8A017" strokeOpacity="0.45" strokeWidth="2" />

      {/* brilhos */}
      <g fill="#FFF3C4">
        <path d="M332 150 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 z" opacity="0.9" />
        <path d="M82 132 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" opacity="0.7" />
        <path d="M318 330 l3.5 9 9 3.5 -9 3.5 -3.5 9 -3.5 -9 -9 -3.5 9 -3.5 z" opacity="0.65" />
      </g>
    </svg>
  );
}
