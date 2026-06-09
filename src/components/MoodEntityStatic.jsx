function Pearl() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_pearlGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f8f6f2" />
          <stop offset="50%" stopColor="#c8cdd4" />
          <stop offset="100%" stopColor="#afc4d4" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="52" fill="url(#s_pearlGrad)" />
      <circle cx="90" cy="90" r="52" fill="none" stroke="rgba(175,196,212,0.3)" strokeWidth="0.5" />
    </svg>
  )
}

function Moon() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_moonGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#b8b0c8" />
          <stop offset="100%" stopColor="#1a2035" />
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="55" fill="url(#s_moonGrad)" />
      <circle cx="112" cy="68" r="55" fill="#080810" />
    </svg>
  )
}

function Chrome() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <linearGradient id="s_chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8c0c8" />
          <stop offset="50%" stopColor="#4060d4" />
          <stop offset="100%" stopColor="#1a1a24" />
        </linearGradient>
      </defs>
      <polygon
        points="90,30 140,62.5 140,117.5 90,150 40,117.5 40,62.5"
        fill="url(#s_chromeGrad)"
        stroke="rgba(184,192,200,0.4)"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function Forest() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_forestGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b8f66" />
          <stop offset="100%" stopColor="#2a3d28" />
        </radialGradient>
      </defs>
      <ellipse cx="90" cy="90" rx="62" ry="55" fill="url(#s_forestGrad)" />
      <ellipse cx="90" cy="90" rx="62" ry="55" fill="none" stroke="rgba(74,103,65,0.3)" strokeWidth="0.5" />
    </svg>
  )
}

function Velvet() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_velvetGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#6b1f2a" />
          <stop offset="55%" stopColor="#3d1a5c" />
          <stop offset="100%" stopColor="#1a1410" />
        </radialGradient>
      </defs>
      <ellipse cx="90" cy="90" rx="58" ry="48" fill="url(#s_velvetGrad)" />
    </svg>
  )
}

function Rose() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_roseGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0e8d8" />
          <stop offset="60%" stopColor="#e8a0a8" />
          <stop offset="100%" stopColor="#8b2040" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <g>
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.7" />
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.7" transform="rotate(60 90 90)" />
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.7" transform="rotate(120 90 90)" />
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.6" transform="rotate(180 90 90)" />
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.6" transform="rotate(240 90 90)" />
        <ellipse cx="90" cy="62" rx="22" ry="36" fill="url(#s_roseGrad)" opacity="0.6" transform="rotate(300 90 90)" />
      </g>
      <circle cx="90" cy="90" r="10" fill="#f0e8d8" opacity="0.85" />
    </svg>
  )
}

function Flame() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <defs>
        <radialGradient id="s_flameGrad1" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#d45020" />
          <stop offset="100%" stopColor="#c01818" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="s_flameGrad2" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor="#f0a020" />
          <stop offset="100%" stopColor="#d45020" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M90 145 C55 130 38 105 45 78 C52 52 68 45 72 30 C76 15 82 8 90 8 C98 8 102 20 100 38 C108 28 110 15 118 20 C130 30 132 58 120 78 C132 68 138 55 142 62 C148 75 142 105 110 125 C105 128 98 135 90 145Z"
        fill="url(#s_flameGrad1)"
      />
      <path
        d="M90 130 C72 118 65 100 70 82 C74 66 82 60 84 48 C86 40 88 36 90 36 C92 36 94 42 92 54 C96 48 98 40 102 44 C108 52 108 72 100 86 C106 80 110 72 112 76 C116 84 112 102 100 114 C97 117 94 123 90 130Z"
        fill="url(#s_flameGrad2)"
      />
    </svg>
  )
}

function Mist() {
  return (
    <svg viewBox="0 0 180 180" width="120" height="120">
      <ellipse cx="90" cy="90" rx="68" ry="40" fill="rgba(154,164,160,0.18)" />
      <ellipse cx="82" cy="88" rx="55" ry="32" fill="rgba(136,152,176,0.2)" />
      <ellipse cx="98" cy="94" rx="50" ry="28" fill="rgba(138,150,128,0.18)" />
      <ellipse cx="90" cy="90" rx="38" ry="22" fill="rgba(154,164,160,0.25)" />
    </svg>
  )
}

const ENTITIES = { Pearl, Moon, Chrome, Forest, Velvet, Rose, Flame, Mist }

export default function MoodEntityStatic({ type }) {
  const Entity = ENTITIES[type]
  if (!Entity) return null
  return <Entity />
}
