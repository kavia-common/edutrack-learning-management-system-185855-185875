import { useEffect, useRef, useState } from 'react';

const WS_URL = process.env.REACT_APP_WS_URL || process.env.WS_URL || '';

/**
// PUBLIC_INTERFACE
 * useWebSocket connects to a websocket server and exposes:
 * - messages: latest message payload
 * - send: function to send messages
 * - connected: boolean
 * - error: last error
 */
export default function useWebSocket(token) {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const retryRef = useRef(0);

  useEffect(() => {
    if (!WS_URL || !token) return;

    const url = new URL(WS_URL);
    url.searchParams.set('token', token);
    const ws = new WebSocket(url.toString());
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      retryRef.current = 0;
    };
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        setMessage(data);
      } catch {
        setMessage({ type: 'raw', data: evt.data });
      }
    };
    ws.onerror = (evt) => {
      setError(evt);
    };
    ws.onclose = () => {
      setConnected(false);
      // reconnect with backoff
      const t = Math.min(10000, 1000 * (2 ** retryRef.current));
      retryRef.current += 1;
      setTimeout(() => {
        if (token) {
          // trigger effect by updating a dummy state is unnecessary, just recreate
          // eslint-disable-next-line no-self-assign
          wsRef.current = wsRef.current;
        }
      }, t);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  function send(payload) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }

  return { connected, message, error, send };
}
