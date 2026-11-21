import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationSection } from './PaginationSection';

describe('PaginationSection', () => {
  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(
      <PaginationSection currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders pagination controls when totalPages > 1', () => {
    render(<PaginationSection currentPage={2} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange when a page button is clicked', () => {
    const onPageChange = vi.fn();
    render(<PaginationSection currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
