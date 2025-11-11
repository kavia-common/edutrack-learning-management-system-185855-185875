import { render, screen } from '@testing-library/react';
import CourseCard from '../components/CourseCard';

test('course card shows title', () => {
  render(<CourseCard course={{ id: 1, title: 'Intro to React', description: 'Basics' }} />);
  expect(screen.getByText(/intro to react/i)).toBeInTheDocument();
});
