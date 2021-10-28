import { render } from '@testing-library/react';
import DummyPage from '.';

describe('Dummy test', () => {
  it('should render the page', () => {
    const { getByText } = render(<DummyPage />);

    expect(getByText(/Dummy Page/i)).toBeInTheDocument();
  });
});
