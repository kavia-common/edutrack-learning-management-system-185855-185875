import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.adminAnalytics().then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="muted">Platform overview</p>
      </div>

      <div className="grid grid-3">
        <div className="card stat">
          <div className="card-body">
            <div className="stat-label">Users</div>
            <div className="stat-value">{stats?.users || 0}</div>
          </div>
        </div>
        <div className="card stat">
          <div className="card-body">
            <div className="stat-label">Enrollments</div>
            <div className="stat-value">{stats?.enrollments || 0}</div>
          </div>
        </div>
        <div className="card stat">
          <div className="card-body">
            <div className="stat-label">Revenue</div>
            <div className="stat-value">${stats?.revenue || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
