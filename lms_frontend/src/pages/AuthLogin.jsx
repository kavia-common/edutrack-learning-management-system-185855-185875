import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function AuthLogin() {
  const { login, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(form);
      nav('/');
    } catch (e2) {
      setErr('Invalid credentials');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={onSubmit}>
        <div className="card-body">
          <h2>Welcome Back</h2>
          <p className="muted">Log in to continue learning</p>
          {err && <div className="error">{err}</div>}
          <label>Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </label>
          <label>Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
          </label>
          <button className="btn-primary" disabled={busy} type="submit">
            {busy ? 'Signing in...' : 'Login'}
          </button>
          <div className="muted small">
            No account? <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
