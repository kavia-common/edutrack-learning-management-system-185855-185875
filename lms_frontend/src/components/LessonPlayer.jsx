import React from 'react';

// PUBLIC_INTERFACE
export default function LessonPlayer({ lesson }) {
  if (!lesson) return null;
  const { type, videoUrl, pdfUrl, title } = lesson;

  return (
    <div className="lesson-player card">
      <div className="card-body">
        <h3>{title}</h3>
        {type === 'video' && videoUrl && (
          <video controls width="100%" style={{ borderRadius: 10 }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        )}
        {type === 'pdf' && pdfUrl && (
          <iframe
            title="lesson-pdf"
            src={pdfUrl}
            style={{ width: '100%', height: 600, border: '1px solid var(--ocn-border)', borderRadius: 10 }}
          />
        )}
        {!type && <div className="muted">Unsupported lesson type.</div>}
      </div>
    </div>
  );
}
