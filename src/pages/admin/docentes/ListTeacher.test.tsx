import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ListTeacher from './ListTeacher';

vi.mock('../../../api/teacher.api', () => ({
  getTeacher: vi.fn().mockResolvedValue([
    { _id: '1', nombre: 'Ana', apellido: 'García', telefono: '123', especialidad: 'Matemáticas' },
  ]),
}));

vi.mock('react-hot-toast', () => ({
  toast: { error: vi.fn() },
}));

describe('ListTeacher', () => {
  it('renders teacher data after fetch', async () => {
    render(<ListTeacher />);
    await waitFor(() => {
      expect(screen.getByText('Ana García')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<ListTeacher />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});
