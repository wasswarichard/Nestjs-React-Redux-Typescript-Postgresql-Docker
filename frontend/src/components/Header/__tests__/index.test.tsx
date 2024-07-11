import { render, screen } from '@testing-library/react';
import Header from '../index.tsx';

describe('Tests for Header component', () => {
   it('should successfully render the Header', async () => {
      const { getByText } = render(<Header />);
      const element = screen.getByTestId('company-logo');
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe('Candidates');
   });
});
