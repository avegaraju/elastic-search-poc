import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search heading', () => {
  render(<App />);
  const heading = screen.getByText(/Elastic Search POC/i);
  expect(heading).toBeInTheDocument();
});
