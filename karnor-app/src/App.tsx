import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import StrukturRegler from './StrukturRegler'
import MenuBarComponent from './components/MenuBarComponent';
import NotFound from './NotFound';

function App() {

  return (
    <>
    <MenuBarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/struktur&regler" element={<StrukturRegler />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
