import { Navigate, Route, Routes } from 'react-router-dom';
import { authStore } from '../store/authStore';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Cart from '../pages/Cart/Cart';
import Products from '../pages/Products/Products';
import DeteilProduct from '../pages/DeteilProduct/DeteilProduct';

export default function AppRouter() {
  const { isAuth } = authStore();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:id" element={<DeteilProduct />} />
      <Route path="/" element={isAuth ? <Products /> : <Navigate to="/login" />} />
    </Routes>
  );
}
