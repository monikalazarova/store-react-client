import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

//mock react-router-dom - prevent jest from braking on router internals
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useParams: () => ({ id: '1' }),
}));

test.skip('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
