import './index.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import StrukturRegler from './StrukturRegler'
import MenuBarComponent from './components/MenuBarComponent';
import NotFound from './NotFound';
import Planering from './Planering';
import About from './About';
import Hjul from './Hjul';
import Spsm from './Spsm';
import Shop from './Shop';
import ShopProvider from './shop/ShopProvider';
import CatalogProvider from './shop/CatalogProvider';
import OrderPage from './shop/OrderPage';
import Admin from './admin/Admin';
import IdeaPage from './site/IdeaPage';
import FooterComponent from './components/FooterComponent';
import { ContactPage, PrivacyPage, TermsPage } from './legal/LegalPages';
import './site/site.css';

function RouteState() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = { '/': 'För fritidshemmets alla möjligheter', '/butik': 'Materialbutik', '/about': 'Om Karnor', '/planering': 'Pedagogisk planering', '/wheel': 'Årshjulet', '/struktur&regler': 'Struktur & regler', '/spsm': 'SPSM', '/admin': 'Administration', '/butik/tack': 'Din beställning', '/kopvillkor': 'Köpvillkor', '/integritet': 'Integritet', '/kontakt': 'Kontakt & reklamation' };
    document.title = `${titles[pathname] || 'Inspiration för fritids'} | Karnor`;
  }, [pathname]);
  return null;
}

function App() {

  return (
    <CatalogProvider>
    <ShopProvider>
    <div className="site-app shop-ui">
    <MenuBarComponent/>
    <RouteState />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/butik" element={<Shop />} />
        <Route path="/butik/tack" element={<OrderPage />} />
        <Route path="/kopvillkor" element={<TermsPage />} />
        <Route path="/integritet" element={<PrivacyPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/inspiration/:topic" element={<IdeaPage />} />
        <Route path="/struktur&regler" element={<StrukturRegler />} />
        <Route path="/planering" element={<Planering />} />
        <Route path="/about" element={<About />} />
        <Route path="/wheel" element= {<Hjul />} />
        <Route path="/404" element={<NotFound />} />
        <Route path= "/spsm" element={<Spsm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </div>
    </ShopProvider>
    </CatalogProvider>
  );
}

export default App;
