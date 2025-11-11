import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useWebSocket from '../hooks/useWebSocket';

// PUBLIC_INTERFACE
export default function NotificationsBell() {
  const { token } = useAuth();
  const { connected, message } = useWebSocket(token);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (message) {
      setItems((prev) => [message, ...prev].slice(0, 20));
      setCount((c) => c + 1);
    }
  }, [message]);

  return (
    <div className="notif-bell" title={connected ? 'Connected' : 'Disconnected'}>
      <span className="bell">🔔</span>
      {count > 0 && <span className="badge">{count}</span>}
      <div className="notif-dropdown">
        <div className="notif-header">
          <strong>Notifications</strong>
          <button type="button" className="link" onClick={() => setCount(0)}>Mark as read</button>
        </div>
        <ul className="notif-list">
          {items.length === 0 && <li className="muted">No notifications yet</li>}
          {items.map((n, i) => (
            <li key={i}>
              <div className="notif-title">{n?.title || n?.type || 'Update'}</div>
              <div className="notif-body">{n?.message || JSON.stringify(n)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
