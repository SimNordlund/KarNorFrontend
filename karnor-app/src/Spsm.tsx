import { PageIntro, ResourceLink, SiteCta } from './site/SiteComponents';
const resources = [
  { title: 'Inkluderande fritidspedagogik', description: 'Peter Karlsudd, 2022.', filename: 'spsm2.pdf' },
  { title: 'Elevers delaktighet i fritidshem', description: 'Helene Elvstrand, 2022.', filename: 'spsm3.pdf' },
  { title: 'Extra anpassningar och särskilt stöd i fritidshemmet', description: 'Fritidshemslärarens erfarenheter. Marina Wernholm, 2022.', filename: 'spsm1.pdf' },
];
export default function Spsm() {
  return <main id="main-content" className="site-container"><PageIntro eyebrow="SPSM" title="Fler perspektiv på ett fritids för alla." description="Fördjupa det gemensamma samtalet om inkludering, delaktighet och stöd. Här hittar du de publikationer som samlats på Karnor." /><div className="site-card-grid">{resources.map(resource => <ResourceLink key={resource.filename} {...resource} />)}</div><section className="site-note"><h2>Fortsätt utforska</h2><p>På Specialpedagogiska skolmyndighetens webbplats finns fler publikationer och stöd för verksamheten.</p><a href="https://www.spsm.se/" target="_blank" rel="noopener noreferrer" className="shop-text-button">Besök SPSM (ny flik) ↗</a></section><SiteCta /></main>;
}
