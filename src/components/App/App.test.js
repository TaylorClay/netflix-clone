import { render } from '@testing-library/react';
import App from './App';

test('renders the App', () => {
  const intersectionObserverMock = () => ({ observe: () => null })
  window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

  render(<App />);

  const appEl = document.querySelector('#App')
  expect(appEl).toBeInTheDocument();
});
