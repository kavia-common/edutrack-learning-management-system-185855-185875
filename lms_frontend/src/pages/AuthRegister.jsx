import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function AuthRegister() {
  const { register, login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await register(form);
      await login({ email: form.email, password: form.password });
      nav('/');
    } catch (e2) {
      setErr('Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={onSubmit}>
        <div className="card-body">
          <h2>Create account</h2>
          {err && <div className="error">{err}</div>}
          <label>Name
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </label>
          <label>Email
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
          </label>
          <label>Password
            <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
          </label>
          <label>Role
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </label>
          <button className="btn-primary" disabled={busy} type="submit">
            {busy ? 'Creating...' : 'Register'}
          </button>
          <div className="muted small">
            Have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
