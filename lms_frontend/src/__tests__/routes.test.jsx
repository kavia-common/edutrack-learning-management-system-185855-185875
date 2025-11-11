import { render } from '@testing-library/react';
import App from '../App';

test('redirects protected route to login when not authenticated', () => {
  window.history.pushState({}, '', '/learning');
  const { container } = render(<App />);
  expect(container.innerHTML.toLowerCase()).toContain('login');
});
