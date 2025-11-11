import React from 'react';

// PUBLIC_INTERFACE
export default function CertificateViewer({ certificate }) {
  if (!certificate) return null;

  const { url, type, meta } = certificate;

  return (
    <div className="card">
      <div className="card-body">
        <h3>Certificate</h3>
        {type === 'pdf' && url && (
          <iframe title="certificate" src={url} style={{ width: '100%', height: 600, border: '1px solid var(--ocn-border)', borderRadius: 10 }} />
        )}
        {type === 'image' && url && (
          <img src={url} alt="certificate" style={{ maxWidth: '100%', borderRadius: 10, boxShadow: 'var(--ocn-shadow-md)' }} />
        )}
        {!url && (
          <pre className="muted">{JSON.stringify(meta || certificate, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
