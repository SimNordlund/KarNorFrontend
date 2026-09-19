import { Link } from 'react-router-dom';
import { ArrowRightIcon, BookOpenIcon, CalendarDaysIcon, HeartIcon } from '@heroicons/react/24/outline';
import ShopTeaser from './shop/ShopTeaser';
import { SiteCta } from './site/SiteComponents';

export default function Home() {
  return <main id="main-content">
    <section className="site-home-hero site-container">
      <div><span className="shop-eyebrow">MED OMTANKE OM FRITIDSHEMMET</span><h1>Mer utrymme för<br /><em>det som gör skillnad.</em></h1><p>Material, inspiration och verktyg som gör det enklare att skapa meningsfulla eftermiddagar. För nyfikenheten, gemenskapen och glädjen i att lära tillsammans.</p><div className="site-actions"><Link to="/butik" className="shop-button shop-button--primary">Upptäck våra material <ArrowRightIcon aria-hidden="true" /></Link><Link to="/planering" className="shop-text-button">Utforska verktygen</Link></div><span className="site-hero-caption"><HeartIcon aria-hidden="true" /> För fritidshemmets alla möjligheter.</span></div>
      <div className="site-home-art"><img src="/tarahjul.png" alt="Karnors årshjul med årets årstider" /><div className="site-home-art-label"><span>HELA ÅRET</span><strong>Plats för lärande.<br />Tid för upptäckter.</strong></div><span className="site-home-spark" aria-hidden="true">✳</span></div>
    </section>
    <div className="site-container"><section className="site-home-paths" aria-label="Utforska Karnor">
      <Link to="/butik" className="site-card"><BookOpenIcon aria-hidden="true" /><h2>Material att inspireras av</h2><p>Bildstöd, samtalsunderlag och aktiviteter för vardagen på fritids.</p><span>Besök butiken <ArrowRightIcon aria-hidden="true" /></span></Link>
      <Link to="/wheel" className="site-card"><CalendarDaysIcon aria-hidden="true" /><h2>En röd tråd genom året</h2><p>Få överblick och hitta idéer för varje säsong med vårt årshjul.</p><span>Utforska årshjulet <ArrowRightIcon aria-hidden="true" /></span></Link>
      <Link to="/struktur&regler" className="site-card"><HeartIcon aria-hidden="true" /><h2>En trygg vardag tillsammans</h2><p>Ge plats för gemenskap med tydliga rutiner och gemensamma ramar.</p><span>Läs om struktur <ArrowRightIcon aria-hidden="true" /></span></Link>
    </section></div>
    <ShopTeaser />
    <div className="site-container"><section className="site-editorial"><span className="shop-eyebrow">FRÅN LÄROPLAN TILL VARDAG</span><h2>Små steg.<br /><em>Meningsfullt lärande.</em></h2><div><p>Det ska finnas plats för både genomtänkta planer och de idéer som väcks i stunden. Karnor samlar stöd som hjälper dig att knyta ihop fritidshemmets uppdrag med det ni gör tillsammans.</p><Link to="/about" className="shop-text-button">Lär känna Karnor <ArrowRightIcon aria-hidden="true" /></Link></div></section><SiteCta /></div>
  </main>;
}
