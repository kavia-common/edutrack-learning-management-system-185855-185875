import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export default function AdminUsers() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.adminUsers().then((d) => setRows(d?.items || d || [])).catch(() => setRows([]));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Users</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
              ))}
              {rows.length === 0 && <tr><td colSpan="3" className="muted">No users</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
