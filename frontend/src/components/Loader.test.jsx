import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Loading from './Loader'; 

describe('Loading Component', () => {
  it('renders the loading text correctly', () => {
    render(<Loading />);
    
    const loadingText = screen.getByText(/loading\.\.\./i);
    expect(loadingText).toBeInTheDocument();
  });

  it('contains the animated orbital elements', () => {
    const { container } = render(<Loading />);
    
    const spinners = container.getElementsByClassName('animate-spin');
    const pulses = container.getElementsByClassName('animate-pulse');

    expect(spinners.length).toBeGreaterThan(0);
    expect(pulses.length).toBeGreaterThan(0);
  });
});