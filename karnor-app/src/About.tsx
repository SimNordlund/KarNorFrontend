import { PageIntro, SiteCta } from './site/SiteComponents';
const questions = [
  ['Vad är Karnor?', 'Karnor samlar material, inspiration och strukturstöd för fritidshemmets vardag. Här finns både en materialbutik och verktyg för att planera och utveckla verksamheten.'],
  ['Vem är materialet till för?', 'Materialen riktar sig till dig som arbetar i fritidshem. I varje produktbeskrivning hittar du information om innehåll, format och åldersgrupp.'],
  ['Hur får jag mitt material?', 'Efter en bekräftad betalning visas dina filer på beställningssidan. Spara dem på din enhet så att du enkelt hittar dem igen.'],
  ['Hur använder jag årshjulet?', 'Välj en månad för att se idéer och reflektionsfrågor. Använd dem som utgångspunkt och anpassa planeringen till barnens intressen och er verksamhet.'],
];
export default function About() {
  return <main id="main-content" className="site-container"><PageIntro eyebrow="Om Karnor" title="Med hjärtat i fritidshemmets vardag." description="Vi vill ge mer utrymme för det som gör fritids meningsfullt: nyfikenhet, gemenskap och möjligheten att växa tillsammans." />
    <section className="site-about-person"><img src="/CEO.jpg" alt="Karin Nordlund" /><div><span className="shop-eyebrow">BAKOM KARNOR</span><h2>Karin Nordlund</h2><p>Karnor drivs av Karin Nordlund, med fritidshemmets vardag och utveckling i fokus. Här samlas material och verktyg som kan bli en del av det praktiska pedagogiska arbetet.</p><p>En tydlig plan, ett gemensamt samtal eller en ny aktivitet kan göra skillnad. Ambitionen är att göra det enklare att ta det där nästa steget tillsammans.</p></div></section>
    <section className="site-faq"><div><span className="shop-eyebrow">VANLIGA FRÅGOR</span><h2>Lite lättare att hitta rätt.</h2><p>Om materialen, butiken och tanken bakom.</p></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section><SiteCta /></main>;
}
