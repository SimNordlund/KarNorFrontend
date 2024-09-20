import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import MenuComponent from './components/MenuBarComponent';
import FooterComponent from './components/FooterComponent';
import HeroComponent from './components/HeroComponent';
import FeatureComponent from './components/FeatureComponent';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MenuComponent />
    <HeroComponent />
    <FeatureComponent />
    <FooterComponent />
    <App />
  </BrowserRouter>
);
