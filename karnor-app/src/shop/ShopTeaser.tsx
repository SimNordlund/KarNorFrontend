import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import MaterialCover from './MaterialCover';
import { materials } from './materials';

export default function ShopTeaser() {
  return <section className="shop-home-teaser shop-ui" aria-labelledby="shop-teaser-title">
    <div className="shop-home-teaser-inner">
      <div><span className="shop-eyebrow">NYTT HOS KARNOR · MATERIALBUTIK</span><h2 id="shop-teaser-title">Fler idéer för ett<br />meningsfullt fritids.</h2><p>Upptäck lekfulla material för gemenskap, skapande och nyfikna eftermiddagar. Ta en förhandstitt i vår kommande butik.</p><Link to="/butik" className="shop-button shop-button--primary">Utforska fritidsmaterial <ArrowRightIcon aria-hidden="true" /></Link></div>
      <div className="shop-home-teaser-art" aria-hidden="true"><MaterialCover material={materials[1]} /><MaterialCover material={materials[0]} /></div>
    </div>
  </section>;
}
