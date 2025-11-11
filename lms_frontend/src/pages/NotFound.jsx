import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="center">
      <h1>404</h1>
      <p className="muted">The page you are looking for was not found.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
