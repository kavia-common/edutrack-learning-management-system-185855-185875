import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL || '';

/**
// PUBLIC_INTERFACE
 * getApiClient returns a configured axios instance.
 * - Reads baseURL from environment variables
 * - Attaches Authorization header if token is present in localStorage
 * - Handles 401 globally to emit 'auth:logout' event for centralized logout
 */
export function getApiClient() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        window.dispatchEvent(new CustomEvent('auth:logout', { detail: { reason: 'unauthorized' } }));
      }
      return Promise.reject(err);
    }
  );

  return instance;
}

// PUBLIC_INTERFACE
export const api = {
  client: getApiClient(),
  // Auth
  async login(email, password) {
    const { data } = await this.client.post('/auth/login', { email, password });
    return data;
  },
  async register(payload) {
    const { data } = await this.client.post('/auth/register', payload);
    return data;
  },
  async me() {
    const { data } = await this.client.get('/auth/me');
    return data;
  },

  // Courses
  async listCourses(params = {}) {
    const { data } = await this.client.get('/courses', { params });
    return data;
  },
  async getCourse(id) {
    const { data } = await this.client.get(`/courses/${id}`);
    return data;
  },
  async getLesson(courseId, lessonId) {
    const { data } = await this.client.get(`/courses/${courseId}/lessons/${lessonId}`);
    return data;
  },
  async enroll(courseId) {
    const { data } = await this.client.post(`/courses/${courseId}/enroll`);
    return data;
  },

  // Quizzes
  async startQuiz(lessonId) {
    const { data } = await this.client.post(`/quizzes/${lessonId}/start`);
    return data;
  },
  async submitQuiz(lessonId, answers) {
    const { data } = await this.client.post(`/quizzes/${lessonId}/submit`, { answers });
    return data;
  },

  // Uploads (multipart)
  async uploadResource(formData, onUploadProgress) {
    const { data } = await this.client.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
    return data;
  },

  // Admin
  async adminUsers() {
    const { data } = await this.client.get('/admin/users');
    return data;
  },
  async adminCourses() {
    const { data } = await this.client.get('/admin/courses');
    return data;
  },
  async adminAnalytics() {
    const { data } = await this.client.get('/admin/analytics');
    return data;
  },

  // Payments
  async createCheckoutSession(courseId) {
    const { data } = await this.client.post(`/payments/checkout`, { courseId });
    return data;
  },

  // Certificates
  async certificate(courseId) {
    const { data } = await this.client.get(`/certificates/${courseId}`);
    return data;
  },
};
