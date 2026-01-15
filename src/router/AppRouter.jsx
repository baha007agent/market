import { Navigate, Route, Routes } from 'react-router-dom';
import { authStore } from '../store/authStore';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';

export default function AppRouter() {
  const { isAuth } = authStore();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile   />} />
      <Route path="/" element={isAuth ? <p>Welcome</p> : <Navigate to="/login" />} />
    </Routes>
  );
}
