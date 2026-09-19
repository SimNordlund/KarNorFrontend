import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import MaterialCover from './MaterialCover';
import { useCatalog } from './CatalogContext';

export default function ShopTeaser() {
  const { catalog } = useCatalog();
  const materials = catalog.products.slice(0, 2);
  return <section className="shop-home-teaser shop-ui" aria-labelledby="shop-teaser-title">
    <div className="shop-home-teaser-inner">
      <div><span className="shop-eyebrow">KARNOR MATERIALBUTIK</span><h2 id="shop-teaser-title">Fler idéer för ett<br />meningsfullt fritids.</h2><p>Upptäck lekfulla material för gemenskap, skapande och nyfikna eftermiddagar. Hitta något som passar just er.</p><Link to="/butik" className="shop-button shop-button--primary">Utforska fritidsmaterial <ArrowRightIcon aria-hidden="true" /></Link></div>
      <div className="shop-home-teaser-art" aria-hidden="true">{materials.map(material => <MaterialCover key={material.id} material={material} />)}</div>
    </div>
  </section>;
}
