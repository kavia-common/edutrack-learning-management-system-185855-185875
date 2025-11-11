import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import UploadDropzone from '../components/UploadDropzone';

// PUBLIC_INTERFACE
export default function AdminCourses() {
  const [rows, setRows] = useState([]);

  const load = () => api.adminCourses().then((d) => setRows(d?.items || d || [])).catch(() => setRows([]));

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Manage Courses</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <h3>Upload Course Resource</h3>
          <UploadDropzone extra={{ scope: 'course' }} onUploaded={() => load()} />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Title</th><th>Category</th><th>Price</th></tr></thead>
            <tbody>
              {rows.map((c) => <tr key={c.id}><td>{c.title}</td><td>{c.category}</td><td>{c.price || 'Free'}</td></tr>)}
              {rows.length === 0 && <tr><td colSpan="3" className="muted">No courses</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
