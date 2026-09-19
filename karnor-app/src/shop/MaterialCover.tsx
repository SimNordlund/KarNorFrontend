import type { Material, MaterialMotif } from './materials';

function CoverIllustration({ motif }: { motif: MaterialMotif }) {
  return (
    <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" className="material-illustration">
      {motif === 'friends' && <>
        <path d="M38 137V98a39 39 0 0 1 78 0v39" fill="#7971ac" />
        <path d="M122 137V87a39 39 0 0 1 78 0v50" fill="#e7a06d" />
        <circle cx="77" cy="70" r="28" fill="#f6ceac" /><circle cx="161" cy="58" r="28" fill="#865b49" />
        <path d="M51 60c0-35 53-37 54 2-19-3-21-16-23-17-5 11-14 17-31 15Z" fill="#41374c" />
        <path d="M135 46c-4-29 50-36 53 5-22-7-27-11-28-18-5 9-13 12-25 13Z" fill="#3b3538" />
        <path d="m101 106 21 19 20-30" stroke="#f6ceac" strokeWidth="13" strokeLinecap="round" />
        <path d="M69 75q8 9 15 0m70-12q8 9 15 0" stroke="#453b43" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M113 24c-12-12-21 4 0 15 21-11 12-27 0-15Z" fill="#bf6471" />
      </>}
      {(motif === 'nature' || motif === 'seasons') && <>
        <circle cx="180" cy="38" r="23" fill="#eac269" />
        <path d="M20 142c26-42 73-40 103-17 37-39 70-32 99 17" fill="#b2c59a" />
        <path d="M77 136V40m0 69c-31 0-43-16-39-36 25 0 37 13 39 36Zm0-22c29-2 41-18 37-39-22 2-35 14-37 39Z" fill="#648568" stroke="#476e54" strokeWidth="4" strokeLinejoin="round" />
        <path d="M151 139v-36" stroke="#b5805e" strokeWidth="15" />
        <path d="M120 106c0-40 61-40 61 0Z" fill="#cb7958" /><circle cx="140" cy="95" r="4" fill="#fff5de" /><circle cx="161" cy="91" r="5" fill="#fff5de" />
        {motif === 'seasons' && <><path d="m207 70 5 14 14 1-11 9 3 14-11-8-12 8 4-14-12-9 15-1Z" fill="#e4b551" /><path d="M33 26c24 0 32 16 20 30C34 56 25 41 33 26Z" fill="#c38658" /></>}
      </>}
      {motif === 'craft' && <>
        <path d="m64 130 30-105 20 6-30 105-15 15Z" fill="#dc9759" /><path d="m64 130 20 6-15 15Z" fill="#4b4960" />
        <path d="m126 123 35-78 16 8-35 78Z" fill="#8b81b4" /><path d="M161 45c-7-17 1-28 24-33-1 17 7 26-8 41Z" fill="#4f725b" />
        <path d="M51 92C8 57 28 22 53 43c14-24 44-6 17 30Z" fill="#dc8079" />
        <path d="M176 116c19-28 43-3 28 17-15 19-34 12-28-17Z" fill="#7e9b80" />
        <path d="m108 72 7 9m-7 0 7-9m83-4 7 9m-7 0 7-9" stroke="#bb7754" strokeWidth="3" strokeLinecap="round" />
      </>}
      {motif === 'movement' && <>
        <circle cx="125" cy="35" r="20" fill="#b67e5b" />
        <path d="m117 58-21 48 40 9 12-53Z" fill="#8178ae" />
        <path d="m115 68-34 4-23-28m84 24 27 18 26-31" stroke="#b67e5b" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m106 111-30 31m53-25 34 17 12-11" stroke="#526f62" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m42 88-12 4m159 11 14 6M74 20l-6-10" stroke="#d2a648" strokeWidth="4" strokeLinecap="round" />
        <circle cx="205" cy="138" r="14" fill="#db9173" />
      </>}
      {motif === 'planner' && <>
        <rect x="45" y="23" width="150" height="118" rx="10" fill="#fffcf3" stroke="#7c99a3" strokeWidth="3" />
        <path d="M46 54h148" stroke="#7c99a3" strokeWidth="3" /><path d="M78 13v22m84-22v22" stroke="#566f79" strokeWidth="7" strokeLinecap="round" />
        {[0, 1, 2, 3].map(i => <g key={i}><rect x={62 + i * 31} y="69" width="22" height="21" rx="4" fill={i % 2 ? '#d3dfc6' : '#e4d9ed'} /><rect x={62 + i * 31} y="101" width="22" height="21" rx="4" fill={i % 2 ? '#f1d8ba' : '#d5e5e8'} /></g>)}
        <path d="m102 78 5 5 9-10" stroke="#7a719f" strokeWidth="3" strokeLinecap="round" />
      </>}
      {motif === 'calm' && <>
        <path d="M147 22c-44 6-65 67-14 101-57 10-97-49-62-88 18-21 45-24 76-13Z" fill="#deaf64" />
        <path d="M89 115c-11-31 25-48 40-27 12-32 59-23 60 9 38-2 37 39 8 39H91c-20 0-23-18-2-21Z" fill="#fff8ef" />
        <path d="m176 23 4 12 13 1-10 8 3 12-10-7-10 7 3-12-10-8 13-1Z" fill="#a797ba" />
        <path d="M82 69q10 10 18 0" stroke="#9d7952" strokeWidth="3" strokeLinecap="round" />
        <circle cx="205" cy="74" r="4" fill="#b7a3bd" /><circle cx="42" cy="112" r="4" fill="#b7a3bd" />
      </>}
      {motif === 'blocks' && <>
        <rect x="37" y="102" width="54" height="42" rx="5" fill="#7e9a80" /><rect x="95" y="102" width="54" height="42" rx="5" fill="#ddb35e" /><rect x="153" y="102" width="54" height="42" rx="5" fill="#9c8cba" />
        <rect x="64" y="59" width="56" height="39" rx="5" fill="#d79678" /><rect x="124" y="59" width="56" height="39" rx="5" fill="#89a9b0" />
        <path d="m122 15 31 40H91Z" fill="#82769f" /><path d="m32 58 8 8m-8 0 8-8m159-23 8 8m-8 0 8-8" stroke="#c59a55" strokeWidth="3" strokeLinecap="round" />
      </>}
    </svg>
  );
}

export default function MaterialCover({ material, compact = false }: { material: Material; compact?: boolean }) {
  if (material.image) {
    return (
      <div className={`material-cover material-cover--${material.theme} material-cover--image${compact ? ' material-cover--compact' : ''}`} aria-hidden="true">
        <img
          className="material-cover-image"
          src={material.image.src}
          alt=""
          width={material.image.width}
          height={material.image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`material-cover material-cover--${material.theme}${compact ? ' material-cover--compact' : ''}`} aria-hidden="true">
      <div className="material-cover-paper">
        <span className="material-cover-brand">KARNOR · FRITIDSMATERIAL</span>
        <strong className="material-cover-title">{material.coverTitle}</strong>
        <span className="material-cover-subtitle">{material.subtitle}</span>
        <CoverIllustration motif={material.motif} />
        <span className="material-cover-bottom">NYFIKENHET · GEMENSKAP · GLÄDJE</span>
      </div>
    </div>
  );
}
