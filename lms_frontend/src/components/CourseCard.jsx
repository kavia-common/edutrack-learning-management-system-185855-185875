import React from 'react';
import { Link } from 'react-router-dom';
import { cls } from '../utils/theme';

// PUBLIC_INTERFACE
export default function CourseCard({ course }) {
  return (
    <div className="card course-card">
      <div className="card-media">
        <div className="course-banner" />
      </div>
      <div className="card-body">
        <div className="course-title">{course.title}</div>
        <div className="course-desc">{course.description}</div>
        <div className="course-meta">
          <span className={cls('pill')}>{course.level || 'All levels'}</span>
          <span className={cls('pill', 'secondary')}>{course.category || 'General'}</span>
        </div>
        <div className="card-actions">
          <Link className="btn-primary" to={`/courses/${course.id}`}>View</Link>
          {course.price ? (
            <Link className="btn-secondary" to={`/checkout/${course.id}`}>Buy ${course.price}</Link>
          ) : (
            <Link className="btn-secondary" to={`/courses/${course.id}`}>Enroll</Link>
          )}
        </div>
      </div>
    </div>
  );
}
