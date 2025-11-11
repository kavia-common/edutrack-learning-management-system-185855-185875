import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export default function CourseDetail() {
  const { courseId } = useParams();
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.getCourse(courseId).then(setCourse).catch(() => setCourse(null));
  }, [courseId]);

  const enroll = async () => {
    if (!isAuthenticated) return nav('/login');
    setBusy(true);
    try {
      await api.enroll(courseId);
      nav(`/courses/${courseId}`);
    } finally {
      setBusy(false);
    }
  };

  if (!course) return <div className="muted">Loading course...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>{course.title}</h1>
        <p className="muted">{course.description}</p>
        <div className="actions">
          {course.price ? (
            <Link className="btn-primary" to={`/checkout/${courseId}`}>Buy for ${course.price}</Link>
          ) : (
            <button className="btn-primary" disabled={busy} onClick={enroll}>{busy ? 'Enrolling...' : 'Enroll'}</button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3>Lessons</h3>
          <ul className="list">
            {course.lessons?.map((l) => (
              <li key={l.id}>
                <Link to={`/courses/${courseId}/lessons/${l.id}`}>{l.title}</Link>
              </li>
            ))}
            {!course.lessons?.length && <li className="muted">No lessons yet</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
