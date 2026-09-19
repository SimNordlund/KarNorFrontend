import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main id="main-content" className="site-container site-not-found"><span className="shop-eyebrow">404 · EN LITEN OMVÄG</span><h1>Här tog stigen slut.</h1><p>Sidan du letar efter finns inte. Det finns fler idéer att upptäcka i materialbutiken.</p><div className="site-actions"><Link to="/butik" className="shop-button shop-button--primary">Till materialbutiken</Link><Link to="/" className="shop-button shop-button--secondary">Till startsidan</Link></div></main>;
}
