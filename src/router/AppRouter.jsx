import { Navigate, Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { authStore } from '../store/authStore';

export default function AppRouter() {
  const { isAuth } = authStore();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={isAuth ? <p>Welcome</p> : <Navigate to="/login" />} />
    </Routes>
  );
}
