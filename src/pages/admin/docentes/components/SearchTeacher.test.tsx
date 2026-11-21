import { render, screen } from '@testing-library/react';
import SearchTeacher from './SearchTeacher';

describe('SearchTeacher', () => {
  it('renders search input and filters', () => {
    render(<SearchTeacher />);
    expect(screen.getByPlaceholderText('Buscar por nombre o documento')).toBeInTheDocument();
  });
});
