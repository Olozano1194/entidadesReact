import { render, screen, fireEvent } from '@testing-library/react';
import SearchSection from './SearchSection';

describe('SearchSection', () => {
  it('renders search input with placeholder', () => {
    render(
      <SearchSection
        searchTerm=""
        onSearchChange={() => {}}
        placeholder="Buscar por nombre"
        onClear={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Buscar por nombre')).toBeInTheDocument();
  });

  it('renders dynamic filters and calls onClear', () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    render(
      <SearchSection
        searchTerm=""
        onSearchChange={() => {}}
        filters={[{ key: 'dep', label: 'Departamento', value: '', onChange, options: [{ value: 'A', label: 'A' }] }]}
        onClear={onClear}
      />
    );
    expect(screen.getByText('Departamento: Todos')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClear).toHaveBeenCalled();
  });
});
