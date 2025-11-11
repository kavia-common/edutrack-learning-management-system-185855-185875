import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { cls } from '../utils/theme';

// PUBLIC_INTERFACE
export default function Sidebar() {
  const { user } = useAuth();
  const loc = useLocation();

  const NavItem = ({ to, children }) => (
    <Link className={cls('side-link', loc.pathname === to && 'active')} to={to}>{children}</Link>
  );

  return (
    <aside className="sidebar ocn-surface">
      <div className="section">
        <div className="section-title">Student</div>
        <NavItem to="/">Dashboard</NavItem>
        <NavItem to="/courses">Browse Courses</NavItem>
        <NavItem to="/learning">My Learning</NavItem>
      </div>
      {(user?.role === 'instructor' || user?.role === 'admin') && (
        <div className="section">
          <div className="section-title">Instructor</div>
          <NavItem to="/admin/courses">Manage Courses</NavItem>
        </div>
      )}
      {user?.role === 'admin' && (
        <div className="section">
          <div className="section-title">Admin</div>
          <NavItem to="/admin/users">Users</NavItem>
          <NavItem to="/admin/analytics">Analytics</NavItem>
        </div>
      )}
    </aside>
  );
}
