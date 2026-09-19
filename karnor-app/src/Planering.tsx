import { PageIntro, ResourceLink, SiteCta } from './site/SiteComponents';
const resources = [
  { title: 'Språk och kommunikation', description: 'Ge utrymme för berättelser, samtal och att uttrycka tankar på olika sätt. Utgå från barnens frågor och erfarenheter.', filename: 'sprakochkommunikation.pdf' },
  { title: 'Skapande och estetiska uttrycksformer', description: 'Planera för fantasi, utforskande och eget skapande med bild, form, musik och andra uttryck.', filename: 'skapandeOchEstetiska.pdf' },
  { title: 'Natur och samhälle', description: 'Upptäck närmiljön tillsammans. Ta vara på nyfikenheten på naturen och hur vi lever med varandra.', filename: 'naturochsamhalle.pdf' },
  { title: 'Lek, rörelse och utevistelse', description: 'Skapa förutsättningar för varierad rörelse, gemensamma lekar och tid att utforska utomhus.', filename: 'lekar.pdf' },
];
export default function Planering() {
  return <main id="main-content" className="site-container"><PageIntro eyebrow="Pedagogisk planering" title="En plan som ger plats för möjligheter." description="Knyt ihop barnens intressen med fritidshemmets uppdrag. Här samlas planeringsstöd för olika delar av det centrala innehållet." /><div className="site-card-grid site-card-grid--two">{resources.map(resource => <ResourceLink key={resource.filename} {...resource} />)}</div><section className="site-note"><span className="shop-eyebrow">ATT TA MED TILL ARBETSLAGET</span><h2>Börja med en gemensam fråga.</h2><p>Vad visar barnen intresse för just nu – och vilka möjligheter vill vi ge dem att upptäcka mer?</p></section><SiteCta /></main>;
}
