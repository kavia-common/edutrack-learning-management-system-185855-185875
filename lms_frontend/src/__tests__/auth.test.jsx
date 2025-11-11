import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders login link in navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const loginLinks = screen.getAllByText(/login/i);
  expect(loginLinks.length).toBeGreaterThan(0);
});

test('login form renders', () => {
  render(<App />);
  // navigate to login
  window.history.pushState({}, '', '/login');
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
