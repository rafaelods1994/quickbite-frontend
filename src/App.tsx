import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dishes from './pages/Dishes';
import Orders from './pages/Orders';
import Users from './pages/Users';
import OrderItem from './pages/OrderItem';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/dishes">Dishes</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/users">Users</Link>
        <Link to="/order-items">Order Items</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/order-items" element={<OrderItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
