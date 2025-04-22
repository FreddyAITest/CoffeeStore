import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components to avoid testing their implementation details
jest.mock('./components/Header/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./components/Footer/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('./pages/Home/Home', () => () => <div data-testid="home-page">Home Page</div>);
jest.mock('./pages/Menu/Menu', () => () => <div data-testid="menu-page">Menu Page</div>);
jest.mock('./pages/About/About', () => () => <div data-testid="about-page">About Page</div>);
jest.mock('./pages/Calendar/Calendar', () => () => <div data-testid="calendar-page">Calendar Page</div>);

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route"></div>,
}));

test('renders app structure with header and footer', () => {
  render(<App />);
  
  // Check if header and footer are rendered
  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('footer')).toBeInTheDocument();
  
  // Check if router components are rendered
  expect(screen.getByTestId('browser-router')).toBeInTheDocument();
  expect(screen.getByTestId('routes')).toBeInTheDocument();
  expect(screen.getAllByTestId('route').length).toBe(4); // 4 routes: home, menu, about, calendar
});