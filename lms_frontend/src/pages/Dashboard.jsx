import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { api } from '../api/client';
import CourseCard from '../components/CourseCard';

// PUBLIC_INTERFACE
export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.listCourses({ limit: 6 }).then((d) => setCourses(d?.items || d || []))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Welcome {user?.name ? user.name.split(' ')[0] : 'Learner'}</h1>
        <p className="muted">Continue your learning journey</p>
      </div>

      <div className="grid">
        {courses.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>

      {user?.role === 'admin' && (
        <div className="admin-panels">
          <div className="card">
            <div className="card-body">
              <h3>Admin Overview</h3>
              <ul className="muted">
                <li>Manage users and permissions</li>
                <li>Monitor platform analytics</li>
                <li>Review courses and approvals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
