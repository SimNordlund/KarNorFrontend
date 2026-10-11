import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { PageIntro, SiteCta } from './site/SiteComponents';
import './site/wheel.css';

const months = [
  ['Januari', 'En ny början', 'Samla gruppens tankar om terminen. Vad vill barnen prova, lära och göra tillsammans?', 'Gör en gemensam önskevägg och välj något att börja med.'],
  ['Februari', 'Värme i gemenskapen', 'Ge plats för samtal om vänskap, omtanke och hur det känns att vara en del av gruppen.', 'Prova samtalsbilder och små samarbetsuppdrag.'],
  ['Mars', 'Upptäck det som förändras', 'Följ naturens små förändringar och låt barnens frågor leda vidare.', 'Besök samma plats flera gånger och dokumentera tillsammans.'],
  ['April', 'Skapa med nya ögon', 'Utforska färg, form och material i skapande där det finns många möjliga lösningar.', 'Bygg något nytt av material som får ett andra liv.'],
  ['Maj', 'Lärande under bar himmel', 'Flytta ut en aktivitet och upptäck vad den nya miljön tillför.', 'Planera naturspaning, rörelse eller en gemensam byggutmaning.'],
  ['Juni', 'Samla det vi har upptäckt', 'Låt barnen välja minnen och erfarenheter att dela med varandra.', 'Skapa en liten utställning över terminens upptäckter.'],
  ['Juli', 'Plats för sommarens idéer', 'Anpassa aktiviteter till gruppen, vädret och sommarens lugnare rytm.', 'Erbjud enkla val mellan skapande, rörelse och återhämtning.'],
  ['Augusti', 'Hitta varandra', 'Ge tid för nya möten och utforska miljön tillsammans.', 'Prova namnlekar och skapa gemensamma överenskommelser.'],
  ['September', 'Nyfiken på närmiljön', 'Utforska platsen runt fritids och ta vara på barnens frågor.', 'Skapa en karta över platser gruppen vill undersöka.'],
  ['Oktober', 'Höstens färger och former', 'Kombinera uteliv och skapande med det som händer i naturen.', 'Jämför löv, färger och former och skapa tillsammans.'],
  ['November', 'Berättelser att dela', 'Låt fantasi och samtal få utrymme i mörkare eftermiddagar.', 'Skapa gemensamma berättelser med bilder, drama eller byggande.'],
  ['December', 'Reflektera och blicka framåt', 'Samla gruppens tankar om vad som har känts roligt, tryggt och lärorikt.', 'Låt barnen välja något att ta med in i nästa termin.'],
];

const seasons = [
  { key: 'winter', name: 'Vinter', firstMonth: 0, accent: '#69618f', soft: '#eae7f4', ink: '#554975', glow: '#e9e3f4', caption: 'Tid för närhet och nya tankar.' },
  { key: 'spring', name: 'Vår', firstMonth: 2, accent: '#52735b', soft: '#e7eedf', ink: '#3e5e48', glow: '#e6eee3', caption: 'Låt nyfikenheten slå rot.' },
  { key: 'summer', name: 'Sommar', firstMonth: 5, accent: '#8a682e', soft: '#f5e9c9', ink: '#745423', glow: '#f7edcf', caption: 'Ge upptäckterna plats att växa.' },
  { key: 'autumn', name: 'Höst', firstMonth: 8, accent: '#a36049', soft: '#f4e2d5', ink: '#854936', glow: '#f5e1d1', caption: 'Samla färger, frågor och idéer.' },
] as const;

type SeasonKey = typeof seasons[number]['key'];

function seasonForMonth(index: number) {
  return seasons[index === 11 || index < 2 ? 0 : index < 5 ? 1 : index < 8 ? 2 : 3];
}

function pointOnWheel(angle: number, radius: number) {
  const radians = angle * Math.PI / 180;
  return [260 + radius * Math.cos(radians), 260 + radius * Math.sin(radians)];
}

function monthSegment(index: number) {
  const start = index * 30 - 103.5;
  const end = start + 27;
  const outerStart = pointOnWheel(start, 216);
  const outerEnd = pointOnWheel(end, 216);
  const innerEnd = pointOnWheel(end, 160);
  const innerStart = pointOnWheel(start, 160);
  return `M ${outerStart.join(' ')} A 216 216 0 0 1 ${outerEnd.join(' ')} L ${innerEnd.join(' ')} A 160 160 0 0 0 ${innerStart.join(' ')} Z`;
}

function SeasonIcon({ season }: { season: SeasonKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {season === 'winter' && <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9 5l3 3 3-3M9 19l3-3 3 3M4.5 11l4-1-1-4M19.5 13l-4 1 1 4M7.5 18l1-4-4-1M16.5 6l-1 4 4 1" />}
      {season === 'spring' && <><path d="M12 21v-7m0 5c-4 0-6-2-6-4 4 0 6 2 6 4m0-2c4 0 6-2 6-4-4 0-6 2-6 4" /><path d="M12 5c-3-5-7 0-4 3-5 1-2 7 2 5 1 4 6 3 5-1 5 0 5-6 1-6 0-4-4-5-4-1Z" /><circle cx="12" cy="9" r="2" /></>}
      {season === 'summer' && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
      {season === 'autumn' && <><path d="M5 18C-1 8 10 3 20 4c1 10-4 20-15 14ZM4 21 16 9m-7 7v-5m3 2h5" /></>}
    </svg>
  );
}

function SeasonScene({ season }: { season: SeasonKey }) {
  const winter = season === 'winter';
  const autumn = season === 'autumn';
  return (
    <svg className="year-season-scene" viewBox="0 0 220 150" fill="none" aria-hidden="true">
      <circle cx="110" cy="77" r="68" fill="var(--year-glow)" />
      <circle className="year-scene-sun" cx="157" cy="40" r={season === 'summer' ? 19 : 13} fill={winter ? '#fffdf8' : '#e4be70'} />
      <path d="M38 115c28-24 50-15 76-3 24-25 47-24 72 3v12H38Z" fill={winter ? '#f5f3fb' : '#c8d3b8'} />
      <path d="M29 126c35-18 54-8 79-1 33-12 55-10 82 1" stroke="var(--year-accent)" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
      {!winter && <g className="year-scene-canopy" fill={autumn ? '#c48555' : season === 'spring' ? '#a8bd8b' : '#789b74'}>
        <ellipse cx="96" cy="75" rx="27" ry="28" />
        <ellipse cx="121" cy="67" rx="31" ry="34" />
        <ellipse cx="141" cy="86" rx="24" ry="25" />
        <ellipse cx="110" cy="93" rx="29" ry="22" fill={autumn ? '#dba668' : '#9eb88b'} />
      </g>}
      <g stroke="#796b60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M116 123V68m0 38L94 84m22 9 21-17m-21 7-10-16" />
        {winter && <path d="m94 84-9-3m9 3-2-13m45 5 9-3m-9 3 1-12m-22 4 8-12m-18 11-8-4" />}
      </g>
      {season === 'spring' && <g fill="#f0d0cc"><circle cx="86" cy="76" r="4" /><circle cx="118" cy="48" r="4" /><circle cx="143" cy="85" r="4" /><circle cx="109" cy="97" r="4" /><circle cx="130" cy="65" r="3" /></g>}
      {autumn && <g fill="#be8054"><path className="year-scene-leaf" d="M64 87c9 1 11 8 4 12-6-2-7-7-4-12Z" /><path d="M148 117c8-3 13-1 14 4-7 4-11 3-14-4Zm-56 5c-5-6-11-5-13-1 5 5 9 4 13 1Z" /></g>}
      {winter && <g className="year-scene-snow" fill="#fffdf8"><circle cx="73" cy="51" r="3" /><circle cx="144" cy="98" r="3" /><circle cx="93" cy="104" r="2" /><circle cx="132" cy="39" r="2" /><circle cx="63" cy="86" r="2" /></g>}
      <path d="M56 121v-10m0 5-5-4m5 7 5-5m103 9v-10m0 5 4-4" stroke="var(--year-accent)" strokeWidth="1.5" strokeLinecap="round" />
      {season === 'spring' && <circle cx="56" cy="109" r="3" fill="#d6a4a0" />}
    </svg>
  );
}

export default function Hjul() {
  const currentMonth = new Date().getMonth();
  const [selected, setSelected] = useState(currentMonth);
  const [rotation, setRotation] = useState(currentMonth * 30);
  const monthButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const month = months[selected];
  const season = seasonForMonth(selected);
  const seasonStyle = {
    '--year-accent': season.accent,
    '--year-soft': season.soft,
    '--year-ink': season.ink,
    '--year-glow': season.glow,
    '--wheel-rotation': `${rotation}deg`,
  } as CSSProperties;

  function selectMonth(index: number) {
    const next = (index + months.length) % months.length;
    setSelected(next);
    setRotation(previous => previous + ((next * 30 - previous + 540) % 360 + 360) % 360 - 180);
  }

  function handleMonthKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % months.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + months.length - 1) % months.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = months.length - 1;
    else return;
    event.preventDefault();
    selectMonth(next);
    monthButtons.current[next]?.focus();
  }

  return (
    <main id="main-content" className="site-container year-page" style={seasonStyle}>
      <PageIntro eyebrow="Årshjulet" title="Ett år av små, stora upptäckter." description="Från vinterns berättelser till sommarens äventyr. Välj en månad och låt årstiderna inspirera er planering, med barnens nyfikenhet som kompass." />

      <section className="year-experience" aria-label="Utforska årshjulet">
        <header className="year-experience-header">
          <div>
            <span className="shop-eyebrow">12 månader av möjligheter</span>
            <h2>Följ årets rytm.</h2>
          </div>
          <button type="button" className="year-surprise" onClick={() => selectMonth(selected + 1 + Math.floor(Math.random() * (months.length - 1)))}>
            <SparklesIcon aria-hidden="true" /> Överraska mig
          </button>
        </header>

        <div className="year-experience-layout">
          <div className="year-wheel-column">
            <div className="year-season-list" role="group" aria-label="Hoppa till en årstid">
              {seasons.map(item => (
                <button key={item.key} type="button" aria-pressed={season.key === item.key} aria-controls="month-ideas" onClick={() => selectMonth(item.firstMonth)}>
                  <SeasonIcon season={item.key} /> {item.name}
                </button>
              ))}
            </div>

            <div className="year-wheel" role="group" aria-label="Välj månad. Använd piltangenterna för att flytta mellan månader.">
              <svg className="year-wheel-art" viewBox="0 0 520 520" aria-hidden="true">
                <circle cx="260" cy="260" r="237" className="year-wheel-orbit" />
                <circle cx="260" cy="260" r="148" className="year-wheel-inner-ring" />
                {months.map(([name], index) => {
                  const monthSeason = seasonForMonth(index);
                  return <path key={name} d={monthSegment(index)} className={`year-wheel-segment${selected === index ? ' is-selected' : ''}`} style={{ '--month-accent': monthSeason.accent, '--month-soft': monthSeason.soft } as CSSProperties} />;
                })}
              </svg>

              <div className="year-wheel-pointer" aria-hidden="true" />
              <div className="year-wheel-center" aria-hidden="true">
                <div key={season.key} className="year-center-content">
                  <span className="year-center-eyebrow">Årets alla möjligheter</span>
                  <SeasonScene season={season.key} />
                  <span className="year-center-title">{season.name}</span>
                  <span className="year-center-caption">{season.caption}</span>
                </div>
              </div>

              {months.map(([name], index) => {
                const [x, y] = pointOnWheel(index * 30 - 90, 188);
                const monthSeason = seasonForMonth(index);
                return (
                  <button key={name} ref={button => { monthButtons.current[index] = button; }} type="button" className="year-month-button" aria-pressed={selected === index} aria-controls="month-ideas" aria-label={`${name}${index === currentMonth ? ', innevarande månad' : ''}`} onClick={() => selectMonth(index)} onKeyDown={event => handleMonthKey(event, index)} style={{ left: `${x / 520 * 100}%`, top: `${y / 520 * 100}%`, '--month-ink': monthSeason.ink } as CSSProperties}>
                    <span>{name.slice(0, 3)}</span>
                    <small>{index === currentMonth ? 'Nu' : String(index + 1).padStart(2, '0')}</small>
                  </button>
                );
              })}
            </div>

            <div className="year-wheel-controls">
              <button type="button" onClick={() => selectMonth(selected - 1)} aria-label={`Visa ${months[(selected + 11) % 12][0].toLowerCase()}`}><ArrowLeftIcon aria-hidden="true" /></button>
              <span><strong>{month[0]}</strong><small>{String(selected + 1).padStart(2, '0')} / 12</small></span>
              <button type="button" onClick={() => selectMonth(selected + 1)} aria-label={`Visa ${months[(selected + 1) % 12][0].toLowerCase()}`}><ArrowRightIcon aria-hidden="true" /></button>
            </div>
            <button type="button" className="year-current-month" onClick={() => selectMonth(currentMonth)}>Till den här månaden · {months[currentMonth][0].toLowerCase()}</button>
          </div>

          <article id="month-ideas" className="year-month-card" aria-live="polite" aria-atomic="true">
            <div key={selected} className="year-month-content">
              <div className="year-month-meta">
                <span className="year-season-tag"><SeasonIcon season={season.key} /> {season.name}</span>
                <span className="year-month-number" aria-hidden="true">{String(selected + 1).padStart(2, '0')}</span>
              </div>
              <span className="shop-eyebrow">Inspiration för {month[0].toLowerCase()}</span>
              <h2>{month[1]}</h2>
              <p className="year-month-description">{month[2]}</p>

              <section className="year-starting-idea" aria-labelledby="starting-idea-title">
                <span className="year-idea-icon"><SparklesIcon aria-hidden="true" /></span>
                <div><h3 id="starting-idea-title">En idé att börja med</h3><p>{month[3]}</p></div>
              </section>

              <div className="year-reflection">
                <h3>Prata om tillsammans</h3>
                <p>Hur kan barnen vara med och påverka? Vad vill vi vara nyfikna på och följa upp?</p>
              </div>
              <Link to="/planering" className="shop-button year-planning-link">Till planeringsstödet <ArrowRightIcon aria-hidden="true" /></Link>
              <p className="year-month-footnote">En utgångspunkt att forma efter just er grupp.</p>
            </div>
          </article>
        </div>
      </section>
      <SiteCta />
    </main>
  );
}
