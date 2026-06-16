import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SobreNosotros } from './pages/SobreNosotros';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
