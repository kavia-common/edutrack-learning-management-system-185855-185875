import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsBell from './NotificationsBell';
import useAuth from '../hooks/useAuth';
import { cls } from '../utils/theme';

// PUBLIC_INTERFACE
export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar ocn-surface">
      <div className="nav-left">
        <Link to="/" className="brand"><span className="logo-dot" />EduTrack</Link>
        <nav className="nav-links">
          <Link to="/courses">Courses</Link>
          <Link to="/learning">My Learning</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </nav>
      </div>
      <div className="nav-right">
        <NotificationsBell />
        {isAuthenticated ? (
          <div className="user-chip">
            <span className={cls('role', user?.role)}>{user?.role}</span>
            <span className="name">{user?.name || user?.email}</span>
            <button type="button" className="btn-secondary" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link className="btn-primary" to="/login">Login</Link>
            <Link className="btn-secondary" to="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
