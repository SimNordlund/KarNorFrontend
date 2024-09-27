import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import StrukturRegler from './StrukturRegler'
import MenuBarComponent from './components/MenuBarComponent';
import NotFound from './NotFound';
import Planering from './Planering';
import About from './About';
import Hjul from './Hjul';
import Spsm from './Spsm';

function App() {

  return (
    <>
    <MenuBarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/struktur&regler" element={<StrukturRegler />} />
        <Route path="/planering" element={<Planering />} />
        <Route path="/about" element={<About />} />
        <Route path="/wheel" element= {<Hjul />} />
        <Route path="/404" element={<NotFound />} />
        <Route path= "/spsm" element={<Spsm />} />
      </Routes>
    </>
  );
}

export default App;
