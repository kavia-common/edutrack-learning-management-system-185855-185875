import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import CourseCard from '../components/CourseCard';

// PUBLIC_INTERFACE
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    api.listCourses().then((d) => setCourses(d?.items || d || [])).catch(() => setCourses([]));
  }, []);

  const filtered = courses.filter(
    (c) => c.title?.toLowerCase().includes(q.toLowerCase()) || c.description?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Courses</h1>
        <div className="search">
          <input placeholder="Search courses..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="grid">
        {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
        {filtered.length === 0 && <div className="muted">No courses found</div>}
      </div>
    </div>
  );
}
