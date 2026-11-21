import { render, screen } from '@testing-library/react';
import TeacherMetrics from './TeacherMetrics';

describe('TeacherMetrics', () => {
  it('shows teacher count', () => {
    render(<TeacherMetrics teacherCount={5} metrics={{}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows fallback when metrics are missing', () => {
    render(<TeacherMetrics teacherCount={0} metrics={{}} />);
    expect(screen.getByText('Acreditación pendiente')).toBeInTheDocument();
    expect(screen.getByText('— sedes')).toBeInTheDocument();
  });
});
