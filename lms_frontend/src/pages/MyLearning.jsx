import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import CourseCard from '../components/CourseCard';

// PUBLIC_INTERFACE
export default function MyLearning() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.listCourses({ enrolled: true }).then((d) => setCourses(d?.items || d || [])).catch(() => setCourses([]));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>My Learning</h1>
        <p className="muted">Keep up your progress</p>
      </div>
      <div className="grid">
        {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        {courses.length === 0 && <div className="muted">You have not enrolled in any courses yet.</div>}
      </div>
    </div>
  );
}
