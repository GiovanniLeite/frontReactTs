import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Contact from '../pages/Contact';
import Files from '../pages/Files';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login-register/" element={<Login />} />
      <Route path="/profile/" element={<PrivateRoute />}>
        <Route path="/profile/" element={<Profile />} />
      </Route>
      <Route path="/new-contact/:newC" element={<PrivateRoute />}>
        <Route path="/new-contact/:newC" element={<Contact />} />
      </Route>
      <Route path="/edit-contact/:id" element={<PrivateRoute />}>
        <Route path="/edit-contact/:id" element={<Contact />} />
      </Route>
      <Route path="/edit-file/:id" element={<PrivateRoute />}>
        <Route path="/edit-file/:id" element={<Files />} />
      </Route>
      <Route path="/login-register/" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
