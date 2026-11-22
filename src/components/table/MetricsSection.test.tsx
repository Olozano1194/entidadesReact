import { render, screen } from '@testing-library/react';
import MetricsSection from './MetricsSection';

describe('MetricsSection', () => {
  it('renders metric titles and values', () => {
    render(
      <MetricsSection
        metrics={[
          { id: 'a', title: 'Docentes', value: 5, icon: <span>icon</span> },
        ]}
      />
    );
    expect(screen.getByText('Docentes')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <MetricsSection
        metrics={[
          { id: 'b', title: 'X', value: 1, icon: <span>i</span>, footer: <span>footer text</span> },
        ]}
      />
    );
    expect(screen.getByText('footer text')).toBeInTheDocument();
  });
});
