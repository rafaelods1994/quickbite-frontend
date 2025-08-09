import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dishes from './pages/Dishes';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/dishes">Dishes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dishes" element={<Dishes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
