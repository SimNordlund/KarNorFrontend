import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro, SiteCta } from './site/SiteComponents';
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
export default function Hjul() {
  const [selected, setSelected] = useState(new Date().getMonth());
  const month = months[selected];
  return <main id="main-content" className="site-container"><PageIntro eyebrow="Årshjulet" title="En röd tråd genom hela året." description="Välj en månad och hitta en utgångspunkt för er planering. Anpassa idéerna till barnens frågor, intressen och er vardag." /><section className="site-year-layout"><div className="site-year-wheel"><img src="/tarahjul.png" alt="Årstiderna i Karnors årshjul" />{months.map(([name], index) => {
    const angle = (index * 30 - 90) * Math.PI / 180;
    return <button key={name} type="button" aria-pressed={selected === index} aria-controls="month-ideas" aria-label={name} onClick={() => setSelected(index)} style={{ left: (50 + 42 * Math.cos(angle)) + '%', top: (50 + 42 * Math.sin(angle)) + '%' }}>{name.slice(0, 3)}</button>;
  })}</div><article id="month-ideas" className="site-month-card" aria-live="polite"><span className="shop-eyebrow">{month[0]}</span><h2>{month[1]}</h2><p>{month[2]}</p><h3>En idé att börja med</h3><p>{month[3]}</p><h3>Prata om tillsammans</h3><p>Hur kan barnen vara med och påverka? Vad vill vi vara nyfikna på och följa upp?</p><Link to="/planering" className="shop-button shop-button--secondary">Till planeringsstödet</Link></article></section><SiteCta /></main>;
}
