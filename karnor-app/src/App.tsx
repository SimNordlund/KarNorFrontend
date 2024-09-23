import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import StrukturRegler from './StrukturRegler'
import MenuBarComponent from './components/MenuBarComponent';

function App() {

  return (
    <>
    <MenuBarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/struktur&regler" element={<StrukturRegler />} />
      </Routes>
    </>
  );
}

export default App;
