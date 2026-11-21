import { render, screen } from '@testing-library/react';
import Table from './Table';
import type { ColumnDef } from '@tanstack/react-table';

interface Row { name: string }

describe('Table', () => {
  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Name' },
  ];

  it('renders "No hay datos para mostrar" when data is empty', () => {
    render(<Table data={[]} columns={columns} />);
    expect(screen.getByText('No hay datos para mostrar')).toBeInTheDocument();
  });

  it('renders rows when data is provided', () => {
    render(<Table data={[{ name: 'Alice' }, { name: 'Bob' }]} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
