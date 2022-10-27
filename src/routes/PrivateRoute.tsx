import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../redux/app/hooks';

export default function PrivateRoute() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login-register/" />;
}
