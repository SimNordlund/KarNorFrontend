import { PageIntro, SiteCta } from './site/SiteComponents';
const items = [
  ['En tydlig struktur', 'Gör dagen lätt att följa med återkommande hållpunkter, bildstöd och tydliga övergångar. Berätta vad som händer nu och vad som kommer sedan.'],
  ['Trygghet i gruppen', 'Skapa gemensamma rutiner för att välkomna, lyssna och be om hjälp. Låt barnen vara med och beskriva hur en trygg plats känns.'],
  ['Gemensamma ramar inne', 'Prata om hur ni tar hand om rum och material tillsammans. Använd få och konkreta överenskommelser som går att förstå och komma ihåg.'],
  ['Gemensamma ramar ute', 'Gå igenom områden, samlingsplatser och hur man hittar en vuxen. Visa i den miljö där reglerna ska användas och följ upp tillsammans.'],
];
export default function StrukturRegler() {
  return <main id="main-content" className="site-container"><PageIntro eyebrow="Struktur & regler" title="Tydliga ramar. Mer utrymme att växa." description="En förutsägbar vardag gör det lättare att hitta sin plats. Bygg strukturen tillsammans med barnen och låt den hjälpa er i de små stunderna." /><div className="site-card-grid site-card-grid--two">{items.map(([title, text], index) => <article className="site-card" key={title}><span className="site-step">0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</div><SiteCta /></main>;
}
