import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonDetail from './pages/LessonDetail';
import MyLearning from './pages/MyLearning';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminAnalytics from './pages/AdminAnalytics';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function Shell() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function RequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RequireRole({ roles }) {
  const { isAuthenticated, loading, hasAnyRole } = useAuth();
  if (loading) return <div className="center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasAnyRole(roles)) return <Navigate to="/" replace />;
  return <Outlet />;
}

// PUBLIC_INTERFACE
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="courses/:courseId/lessons/:lessonId" element={<LessonDetail />} />
        <Route path="learning" element={<RequireAuth />}>
          <Route index element={<MyLearning />} />
        </Route>
        <Route path="checkout/:courseId" element={<RequireAuth />}>
          <Route index element={<Checkout />} />
        </Route>
        <Route path="admin" element={<RequireRole roles={['admin']} />}>
          <Route index element={<AdminAnalytics />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
